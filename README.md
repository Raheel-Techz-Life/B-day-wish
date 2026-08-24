# A birthday keepsake for `[HER_NAME]`

A scroll-driven, mobile-first love letter built with React + Vite + Tailwind.
Everything you need to change lives in **one file**: `src/content.js`.

---

## 1. Run it

```bash
npm install
npm run dev        # → http://localhost:5173
```

When you're done editing:

```bash
npm run build      # produces dist/
npm run preview    # check the production build locally
```

---

## 2. Make it yours (the 10-minute version)

Open `src/content.js`. Everything below is in that file, in order, with `✏️`
marks on the lines that matter.

| Step | What to do |
| --- | --- |
| 1 | Set `people.me` and `people.her`. Two lines — every `[MY_NAME]` / `[HER_NAME]` on the site updates automatically. |
| 2 | Rewrite `letter.body`. This is the centrepiece. Blank line = new paragraph. |
| 3 | Drop your photos into `public/media/photos/` and point the `memories` array at them. |
| 4 | Record voice notes on your phone, put them in `public/media/voice/`, list them in `voiceNotes`. |
| 5 | Paste Spotify share links into `songs`, YouTube links into `videos`. |
| 6 | Fill in the `timeline` dates and the six `openWhen` letters. |
| 7 | Rewrite `comfort.message` and `finale.message` in your own words. |

**Delete anything you don't want.** Empty an array (`export const songs = []`)
and that whole section disappears from the page. Nothing breaks.

The drafted text in there is a starting point so the site never looks like an
empty template. It is written in my voice, not yours. Replace it — she will know
the difference.

---

## 3. Adding media

Files go in `public/media/`, and you reference them with a path starting at
`/media/`:

```
public/media/photos/us-in-june.jpg   →   '/media/photos/us-in-june.jpg'
public/media/videos/call.mp4         →   '/media/videos/call.mp4'
public/media/posters/call.jpg        →   '/media/posters/call.jpg'
public/media/voice/note-1.mp3        →   '/media/voice/note-1.mp3'
public/media/music/ambient.mp3       →   '/media/music/ambient.mp3'
```

### Photos

```js
{
  src:   '/media/photos/us-in-june.jpg',
  small: '/media/photos/us-in-june-sm.jpg',  // optional; used on phones
  width: 1400, height: 1750,                 // stops the layout jumping
  alt:   'Us on the terrace, squinting',     // read aloud by screen readers
  kicker:  'That day…',
  caption: 'You made me retake this eleven times.',
  date:    'June 2024',
  note:    '',                               // shows on the enlarged view
}
```

Compress before you add them — a 6MB photo straight off a phone will make the
page crawl on mobile data:

```bash
# one image, resized to 1400px wide + a 700px phone copy
npx sharp-cli -i in.jpg -o out.webp resize 1400 -- --quality 78
```

or use [squoosh.app](https://squoosh.app) if you'd rather click than type.
Aim for **under 250KB per photo**.

### Videos

`type: 'file'` for something you recorded, `type: 'youtube'` for a link.
Local videos need a `poster` — a still frame — because the video file itself is
never downloaded until she presses play. Keep them under ~15MB:

```bash
ffmpeg -i in.mov -vcodec libx264 -crf 28 -preset slow -movflags +faststart out.mp4
```

`-movflags +faststart` matters: without it the video won't start playing until
the whole file has downloaded.

### Voice notes

Any `.mp3` / `.m4a`. Record in Voice Memos or WhatsApp, export, drop in
`public/media/voice/`. Nothing autoplays — she taps to listen.

### Spotify & YouTube

Paste the ordinary share link. Both are handled by their official embeds, so
nothing is copied or re-hosted, and neither loads until it scrolls into view.

```js
{ url: 'https://open.spotify.com/track/xxxxxxxxxxxxxxxxxxxxxx', title: 'Ours', why: '…' }
{ type: 'youtube', id: 'https://youtu.be/xxxxxxxxxxx', title: '…', caption: '…' }
```

> The three Spotify links and the YouTube link that ship with this are
> examples. Replace them — if an ID is wrong, the embed shows an error card.

### Background music

`ambient` in `content.js`. It's a small button in the corner, off by default,
and never autoplays. Set `enabled: false` to remove it entirely. Use something
you own or an instrumental you're comfortable hosting.

---

## 4. Changing the look

All colours are CSS variables at the top of `src/index.css`, under `@theme`.
Change a hex value there and it updates everywhere:

```css
--color-cream:    #fdf6f2;   /* page base */
--color-blush:    #faeae3;   /* alternating sections */
--color-petal:    #f5d9d0;   /* cards, borders */
--color-rose:     #ebc4bc;
--color-rosegold: #c4808a;   /* accents */
--color-wine:     #8f5560;   /* deep accent */
--color-ink:      #3f322f;   /* text */
```

Fonts are in the same file: Cormorant Garamond (display), Inter (body),
Caveat (handwriting). They're self-hosted from `src/assets/fonts/` — no Google
Fonts request, no tracking, no render-blocking.

Section order is `sectionOrder` in `content.js` and the JSX in `src/App.jsx`.

---

## 5. Putting it online

Build first (`npm run build`), then pick one:

**Netlify Drop** — easiest. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
and drag the `dist` folder onto the page. You get a URL in about ten seconds.

**Vercel** — `npx vercel` in this folder, follow the prompts.

**Cloudflare Pages / GitHub Pages** — point them at this repo; build command
`npm run build`, output directory `dist`. `base: './'` is already set in
`vite.config.js` so sub-path hosting works.

A custom domain (`something-for-her.com`) is about $10/year and makes the whole
thing feel considerably less like a school project.

### Keeping it private

The page has `noindex, nofollow` so search engines skip it, but the URL is
public to anyone who has it. If that bothers you, Netlify and Vercel both
support password protection on a site (Netlify: Site settings → Access control;
Vercel: Deployment Protection). Nothing here uploads anywhere on its own — the
photos and voice notes only exist wherever you deploy them.

---

## 6. What's inside

```
src/
├── content.js              ← the only file you need
├── App.jsx                 ← section order
├── index.css               ← colours, fonts, animation system
├── hooks/
│   ├── useReveal.js        ← one shared IntersectionObserver for the page
│   └── useMotion.js        ← parallax, scroll progress, reduced-motion
├── lib/
│   ├── bus.js              ← lets the Comfort buttons reach other sections
│   └── media.js            ← parses Spotify / YouTube links
└── components/
    ├── Loader.jsx          Hero.jsx        Letter.jsx
    ├── Gallery.jsx         Lightbox.jsx    Videos.jsx
    ├── LazyYouTube.jsx     VoiceNotes.jsx  Music.jsx
    ├── Timeline.jsx        Comfort.jsx     OpenWhen.jsx
    ├── Finale.jsx          AmbientPlayer.jsx
    └── Reveal.jsx  Section.jsx             ← shared primitives
```

**Performance notes** (why it's fast, so you don't undo it by accident):

- No animation library. Scroll reveals are CSS transitions toggled by a single
  shared `IntersectionObserver`; parallax writes a CSS variable inside
  `requestAnimationFrame` and never re-renders React.
- Videos use `preload="none"` + a poster, and only get a `src` when they're
  near the viewport — a phone never opens a connection for a video she hasn't
  reached.
- YouTube embeds are a thumbnail and a play button until clicked. The real
  iframe (~1MB) is only created on tap.
- Spotify embeds are created when the card is ~350px from the viewport.
- Fonts are latin-subset, variable, self-hosted, `font-display: swap`.
- Only the first two photos load eagerly; the rest are lazy.
- Everything collapses to no motion under `prefers-reduced-motion`.

**Accessibility**: semantic landmarks, a skip link, alt text on every image,
keyboard support in both dialogs (Esc / arrows / focus return), visible focus
rings, touch targets ≥44px, real `<audio>`/`<video>` controls, and a labelled
range slider behind the voice-note waveform.

---

Made to be opened on a birthday, and again on a Tuesday in November at 1am.
