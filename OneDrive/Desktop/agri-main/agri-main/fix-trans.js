const fs = require('fs');
const https = require('https');

const TRANSLATIONS_FILE = 'lib/translations.ts';

async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return text;
  return new Promise((resolve) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = '';
          if (parsed && parsed[0]) {
            parsed[0].forEach(p => { if (p[0]) translated += p[0]; });
          }
          resolve(translated || text);
        } catch (e) {
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function fixTranslations() {
  const content = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
  
  // Extract translation dict
  const extracted = content.replace(/export type[\s\S]*?\;/g, '')
                 .replace(/export interface[\s\S]*?\}\;/g, '')
                 .replace(/export const translations: TranslationDict = /, 'module.exports = ')
                 .split('export function t(')[0];
    
  fs.writeFileSync('temp_trans.js', extracted);
  
  const translations = require('./temp_trans.js');
  const enKeys = Object.keys(translations.en);
  const langs = ['hi', 'te', 'ta', 'kn', 'mr'];

  let anythingTranslated = false;

  for (const lang of langs) {
    if (!translations[lang]) translations[lang] = {};
    const missingKeys = enKeys.filter(k => !translations[lang][k]);
    
    console.log(`Translating ${missingKeys.length} missing keys for ${lang}...`);
    let count = 0;
    for (const key of missingKeys) {
      const enText = translations.en[key];
      const tl = await translateText(enText, lang);
      translations[lang][key] = tl;
      anythingTranslated = true;
      count++;
      if (count % 10 === 0) console.log(`  ... ${count} translated in ${lang}`);
      // Sleep slightly to avoid rate limits
      await new Promise(r => setTimeout(r, 50));
    }
  }

  if (anythingTranslated) {
    // We need to inject the newly populated translation dict back into the file.
    let newContent = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
    const startIdx = newContent.indexOf('export const translations: TranslationDict = {');
    const endStr = '};';
    // Instead of regex, just replace the whole text safely
    
    // Stringify but ensure its formatted nicely
    const stringified = JSON.stringify(translations, null, 2);
    // Replace export const translations... until export function t
    const newTranslationsStr = `export const translations: TranslationDict = ${stringified};\n\n`;
    
    // Find where the old dict starts and ends.
    // The dictionary starts at `export const translations: TranslationDict = {`
    // and ends before `export function t(`
    
    const parts = newContent.split('export function t(');
    let topPart = parts[0];
    topPart = topPart.replace(/export const translations: TranslationDict = \{[\s\S]*\}\;\s*$/, newTranslationsStr);
    
    let finalCode = topPart + 'export function t(' + parts[1];
    
    fs.writeFileSync(TRANSLATIONS_FILE, finalCode, 'utf8');
    console.log("Translations successfully updated and written!");
  } else {
    console.log("No missing translations found.");
  }
}

fixTranslations();
