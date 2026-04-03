const fs = require('fs');
const path = require('path');
const https = require('https');

const TRANSLATIONS_FILE = 'lib/translations.ts';

// 1. Helper to fetch from Google Translate
async function translateText(text, targetLang) {
  if (!text || text.trim() === '') return text;
  return new Promise((resolve) => {
    // For small bursts, the free gtx endpoint works.
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
    }).on('error', () => resolve(text)); // fallback to english on error
  });
}

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(getFiles(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

// 2. Read the current translations.ts 
let transContent = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');

// Extract the translation dict object block (hacky but works for this structure)
let scriptCode = transContent.replace(/export type[\s\S]*?\;/g, '')
                 .replace(/export interface[\s\S]*?\}\;/g, '')
                 .replace(/export const translations: TranslationDict = /, 'module.exports = ')
                 .split('export function t(')[0];

fs.writeFileSync('temp_trans.js', scriptCode);

const currentTranslations = require('./temp_trans.js');

// 3. Find and replace hardcoded strings in app/dashboard/**/*.tsx
const files = getFiles('app/dashboard');
let newEnglishKeysAdded = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // We want to match text between > and < that has letters and doesn't contain { or }
  // We'll use a conservative regex.
  const regex = />([^<>{]+)</g;
  
  content = content.replace(regex, (match, p1) => {
    const text = p1.trim();
    // Skip if it's just numbers, symbols, spaces, or if it looks like code / very short / 'Loading'
    if (!text || text.length < 3 || /^[0-9₹%\.,\s\-\+\/\*]+$/.test(text) || text === 'Loading...') {
      return match;
    }
    
    // Generate a key based on text (e.g. "Recent Transactions" -> "auto.recentTransactions")
    const keyBase = text.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/).map((w,i) => i===0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('').substring(0, 30);
    const key = 'auto.' + (keyBase || 'key' + Math.floor(Math.random()*10000));
    
    if (!currentTranslations.en[key]) {
      currentTranslations.en[key] = text;
      newEnglishKeysAdded++;
    }

    changed = true;
    return `>{t('${key}', language)}<`;
  });

  if (changed) {
    // Ensure the file imports t and useLanguage
    if (!content.includes("import { t }")) {
      content = "import { t } from '@/lib/translations';\n" + content;
    }
    if (!content.includes("useLanguage")) {
      content = "import { useLanguage } from '@/components/language-provider';\n" + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

console.log(`Added ${newEnglishKeysAdded} new auto-extracted English keys.`);

// 4. Backfill translations for all languages
const langs = ['hi', 'te', 'ta', 'kn', 'mr'];
const enKeys = Object.keys(currentTranslations.en);

async function runTranslations() {
  for (const lang of langs) {
    if (!currentTranslations[lang]) currentTranslations[lang] = {};
    const missingKeys = enKeys.filter(k => !currentTranslations[lang][k]);
    console.log(`Translating ${missingKeys.length} missing keys for ${lang}...`);
    
    let count = 0;
    for (const key of missingKeys) {
      const enText = currentTranslations.en[key];
      // translate text
      const tl = await translateText(enText, lang);
      currentTranslations[lang][key] = tl;
      count++;
      if (count % 10 === 0) console.log(`  ... ${count} translated in ${lang}`);
      // small delay to avoid 429
      await new Promise(r => setTimeout(r, 100));
    }
  }
  
  console.log("Translations completed. Rebuilding lib/translations.ts...");
  
  // Re-serialize the object and write back to lib/translations.ts
  const newDictString = JSON.stringify(currentTranslations, null, 2);
  
  let finalContent = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
  const parts = finalContent.split('export function t(');
  let topPart = parts[0];
  topPart = topPart.replace(/export const translations: TranslationDict = \{[\s\S]*\}\;\s*$/, `export const translations: TranslationDict = ${newDictString};\n\n`);
  
  fs.writeFileSync(TRANSLATIONS_FILE, topPart + 'export function t(' + parts[1], 'utf8');
  console.log("Done!");
}

runTranslations();
