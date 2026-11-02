/* ═══════════════════════════════════════════════════════════════════════════
 *
 *   ❤️  THIS IS THE ONLY FILE YOU NEED TO EDIT.  ❤️
 *
 *   Everything on the site — every word, photo, video, voice note, song and
 *   date — comes from this file. You never have to open a component.
 *
 *   HOW TO USE IT
 *   ─────────────
 *   1. Replace [MY_NAME] and [HER_NAME] just below (two lines, done).
 *   2. Drop your files into the folders in `public/media/`:
 *        public/media/photos/   →  referenced as '/media/photos/name.jpg'
 *        public/media/videos/   →  '/media/videos/name.mp4'
 *        public/media/posters/  →  '/media/posters/name.jpg'  (video thumbnails)
 *        public/media/voice/    →  '/media/voice/name.mp3'
 *        public/media/music/    →  '/media/music/name.mp3'
 *   3. Rewrite the text below in your own words. The drafts are there so the
 *      site never looks empty — but they are mine, not yours. Replace them.
 *   4. Delete any entry you don't want. Delete a whole array and that section
 *      quietly disappears from the site. Nothing breaks.
 *
 *   Look for the ✏️ marks — those are the spots that matter most.
 *
 * ═══════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────────────────
 *  1. NAMES
 * ─────────────────────────────────────────────────────────────────────────── */

export const people = {
  me: 'Raheel', // ✏️ your name
  her: 'Zainab', // ✏️ her name
}

/* ───────────────────────────────────────────────────────────────────────────
 *  2. LOADING SCREEN
 *  Shown for a moment before the site opens. Keep it short and quiet.
 * ─────────────────────────────────────────────────────────────────────────── */

export const loader = {
  whisper: 'A little something I made for you…', // ✏️
  name: people.her,
  minDurationMs: 3000, // how long it shows at minimum — long enough to watch the flowers
  maxDurationMs: 4800, // hard cap, even on slow connections
}

/* ───────────────────────────────────────────────────────────────────────────
 *  3. HERO — the first thing she sees
 * ─────────────────────────────────────────────────────────────────────────── */

export const hero = {
  eyebrow: 'Happy 19!!', // ✏️
  title: people.her,
  subtitle: 'To the girl who makes the distance feel a little smaller.', // ✏️
  note: 'A little birthday world for you. Scroll slowly — there’s no rush.', // ✏️
  scrollHint: 'Begin',
}

/* ───────────────────────────────────────────────────────────────────────────
 *  4. THE LETTER
 *  Blank line = new paragraph. Write it the way you'd actually talk to her.
 * ─────────────────────────────────────────────────────────────────────────── */

export const letter = {
  label: 'A letter',
  heading: 'There are some things I’d rather write than say',
  dateline: '', // ✏️ optional, e.g. 'Written at 2:14am, the night before your birthday'

  // The sealed envelope she taps to open the letter.
  sealTitle: 'A letter for you',
  sealHint: 'Tap to open',
  closeLabel: 'Fold it back up',


  // ✏️ [INSERT PERSONAL LETTER HERE] — replace everything between the backticks.
  body: `My Zainab,

I’ve started writing this about 4-5 times.

Every version felt too small.

Because how am I supposed to fit everything you’ve meant to me into a few paragraphs? How do I explain that somewhere along the way, you stopped being just a person I loved and became a part of the way I experience my life?

Before you, my days were just days. I had things to do, places to be, people to talk to. Everything was fine.

Then you came along, and somehow “fine” stopped being enough.

It’s funny, because when I think about us, I don’t think about the grand things first. I think about the little things. The stupid conversations that somehow lasted for hours. The late-night talks when neither of us wanted to sleep. Hearing your voice when you were tired. The way we could sit in silence and somehow still feel close.

Those are the things I miss the most.

Distance has never been kind to us. There have been nights when I wished I could simply be beside you instead of staring at a screen, waiting for a message, counting hours and wondering when I’d get to hear your voice again.

And we haven't always had perfect days.

We've misunderstood each other. We've hurt each other. We've had moments where everything felt heavier than it should have. But somehow, underneath all of that, there has always been something worth holding onto.

Us.

And that's what I want you to remember whenever you come back to this.

You don't have to be having a perfect day to be loved by me.

You don't have to be happy.

You don't have to pretend you're okay.

If there's ever a night when you feel lonely, overwhelmed, or you simply wish I were there, come here.

Listen to my voice. Look at our pictures. Play our songs. Read this again.

I built this little corner of the internet for exactly that reason.

Because I can't always be there physically.

But I wanted to leave pieces of myself somewhere you could reach whenever you needed them.

Every photo here is a memory I never want us to forget. Every voice note is a little piece of me. Every song carries something I couldn't put into words. And this letter is me trying, once again, to put into words something that is much bigger than words.

You are one of the greatest things that has ever happened to me.

And loving you has given me some of the happiest memories of my life.

So today, on your birthday, I don't just want to wish you happiness.

I want you to know that somewhere in this world, there is a person who thinks about you more than you probably realise, misses you more than he admits, and is ridiculously grateful that his life somehow crossed paths with yours.

Happy birthday, my love.

I hope you keep this little place forever.

Come back to it when you miss me.

Come back when you're happy.

Come back when you're sad.

Come back when you just want to feel close to me.

Because until distance finally stops being a part of our story, this is the closest thing I can give you to having me beside you.

And one day, I won't have to make websites for you to feel close to me.

I'll just be there.

Until then, keep a little piece of me here.

I love you.

Happy birthday. ❤️

Stay blessed, stay happy, and stay you.

And yes—

I'll see you soon.

I mean it this time.`,

  signature: people.me,
  ps: '', // ✏️ optional handwritten P.S. — e.g. 'P.S. I still have the receipt from that day.'
  illustration: {
    src: '/media/photos/cartoon.jpg',
    alt: 'A sweet cartoon mouse holding a heart',
    caption: 'a little piece of us',
  },
}

/* ───────────────────────────────────────────────────────────────────────────
 *  5. PHOTO MEMORIES
 *  Each one is a moment, not just an image. `small` is optional — if you add
 *  a smaller copy the browser will use it on phones and save her data.
 *  Aspect ratios can be anything; the layout adapts.
 * ─────────────────────────────────────────────────────────────────────────── */

export const memoriesIntro = {
  label: 'Memories',
  heading: 'Moments I keep going back to', // ✏️
  blurb: 'Tap any memory and stay awhile.', // ✏️
}

// ⏳ PENDING: photos in public/ are downloadable by anyone with the link (incl. the open-hair one).
// Ask her if that's okay, or add a passphrase gate — need the question + answer from you.
export const memories = [
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.19 PM (1).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.19 PM (1).jpeg',
    width: 1400,
    height: 1400,
    alt: 'A photo of us', // ✏️ describe it — this is read aloud by screen readers
    kicker: 'That day…', // ✏️ small line above the caption
    caption: 'The first time I saw you and fell in love', // ✏️ what was happening
    date: '', // ✏️ optional, e.g. 'March 2024'
    note: '', // ✏️ optional handwritten note shown on the enlarged view
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.20 PM (1).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.20 PM (1).jpeg',
    width: 1400,
    height: 1867,
    alt: 'A photo of us',
    kicker: 'The one where…',
    caption: 'The first time we met. We held hands for so long, and I felt like I was home',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.20 PM.jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.20 PM.jpeg',
    width: 1400,
    height: 1400,
    alt: 'A photo of us',
    kicker: 'I never told you this, but…',
    caption: 'I miss your sweetcheeks and your smile and your voice and your everything',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.21 PM (1).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.21 PM (1).jpeg',
    width: 1400,
    height: 1750,
    alt: 'A photo of us',
    kicker: 'My favourite version of you',
    caption: 'You look stunning in hijab. Your smile, your eyes, your everything',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.21 PM (2).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.21 PM (2).jpeg',
    width: 1400,
    height: 1867,
    alt: 'A photo of us',
    kicker: 'This was the night…',
    caption: 'When it all became official. I was so happy, so in love with you, and I still am',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.23 PM (1).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.23 PM (1).jpeg',
    width: 1400,
    height: 1400,
    alt: 'A photo of us',
    kicker: 'Still makes me giggle',
    caption: 'You almost hurt your leg sending me Eid pics. I feel guilty, I still giggle every time, and I love you for it',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.24 PM.jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.24 PM.jpeg',
    width: 1400,
    height: 1750,
    alt: 'A photo of us',
    kicker: 'Nothing special happened here',
    caption: 'The first time I saw you with your hair open, and I loved it',
    date: '',
    note: '',
  },
  {
    src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.24 PM (1).jpeg',
    small: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.24 PM (1).jpeg',
    width: 1400,
    height: 1867,
    alt: 'A photo of us',
    kicker: 'One day this will be a very old photo',
    caption: 'Those cat eyes, that fish face, those cute spectacles and that smile',
    date: '',
    note: '',
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  6. VIDEO MEMORIES
 *  type: 'file'    → a video you recorded. Put it in public/media/videos/.
 *  type: 'youtube' → paste any YouTube link or just the 11-character ID.
 *  Nothing downloads until she presses play.
 *
 *  TIP: keep phone videos under ~15MB or the page gets heavy. Compress with:
 *    ffmpeg -i in.mov -vcodec libx264 -crf 28 -preset slow -movflags +faststart out.mp4
 * ─────────────────────────────────────────────────────────────────────────── */

export const videosIntro = {
  label: 'Video',
  heading: 'Things a photo couldn’t hold', // ✏️
  blurb: 'Turn your sound on for these.', // ✏️
}

export const videos = [
  {
    type: 'file',
    src: '/media/videos/nvm.mp4', // ✏️ your video file
    poster: '/media/posters/WhatsApp Image 2026-08-18 at 7.53.06 PM.jpeg', // ✏️ a still frame — keeps the page light
    title: 'Your cuteness', // ✏️
    caption: 'The cutest video of you', // ✏️
    aspect: '9/16',
    date: '',
  },
  {
    type: 'youtube',
    id: 'https://youtu.be/a71xD6RyOok',
    title: 'A video that reminds me of you', // ✏️
    caption: 'Your fav song from back then', // ✏️
    date: '',
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  7. VOICE NOTES
 *  Record on your phone, drop the file into public/media/voice/.
 *  Nothing ever autoplays.
 * ─────────────────────────────────────────────────────────────────────────── */

export const voiceIntro = {
  label: 'My voice',
  heading: 'Listen whenever you miss me', // ✏️
  blurb: 'It’s just me talking. No editing, no second takes.', // ✏️
}

export const voiceNotes = [
  {
    src: '/media/voice/birthday-message.m4a', // ✏️
    title: 'Happy birthday, Zainuu...', // ✏️
    hint: 'Play this one first.', // ✏️
  },
  {
    src: '/media/voice/loud-nights.m4a', // ✏️
    title: 'For the nights it gets loud in your head', // ✏️
    hint: 'Headphones. Lights off.', // ✏️
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  8. SONGS (Spotify)
 *  Paste the normal Spotify share link — the site works out what to embed.
 *  Track, album and playlist links all work. Embeds load only when scrolled to.
 * ─────────────────────────────────────────────────────────────────────────── */

export const musicIntro = {
  label: 'Music',
  heading: 'Songs that turned into you', // ✏️
  blurb: 'Some of these I can’t hear anymore without thinking of a specific night.', // ✏️
}

export const songs = [
  {
    url: 'https://open.spotify.com/track/7wrYBASu0OoxoDErd4Edxd?si=b77b591af48c42d6', // ✏️
    title: 'Our song', // ✏️ your label for it
    why: 'Because you loved it and i fell in love with it because of you', // ✏️
  },
  {
    url: 'https://open.spotify.com/track/4M513o3dSYspKeT6UNJpcx?si=4d7ed1d040d24c4a', // ✏️
    title: 'The one song I listen to when I miss you', // ✏️
    why: 'I close my eyes and keep seeing you everywhere around me', // ✏️
  },
  
]

/* ───────────────────────────────────────────────────────────────────────────
 *  9. OUR STORY — the timeline
 *  `media` is optional: { type: 'image', src, alt } or { type: 'youtube', id }
 * ─────────────────────────────────────────────────────────────────────────── */

export const timelineIntro = {
  label: 'Our story',
  heading: 'How we got here', // ✏️
  blurb: '', // ✏️
}

export const timeline = [
  {
    date: '18 Oct 2023', // ✏️ e.g. '14 Feb 2023'
    title: 'The first message', // ✏️
    body: 'I reached out to you', // ✏️
    media: { type: 'image', src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.19 PM.jpeg', alt: 'The beginning' },
  },
  {
    date: '4 Dec 2023',
    title: 'The day I confessed my feelings', // ✏️
    // ⏳ PENDING: body doesn't match the title. What happened when you confessed?
    body: 'We started talking regularly and realized we had a lot in common', // ✏️
    media: null,
  },
  {
    date: '23 Dec 2023',
    title: 'The day we became a couple', // ✏️
    body: 'We decided to give our relationship a shot', // ✏️
    media: { type: 'image', src: '/media/photos/WhatsApp Image 2026-08-18 at 7.52.23 PM.jpeg', alt: 'Meeting you' },
  },
  {
    date: '7 Sept 2024',
    title: 'The hard month', // ✏️
    body: 'We broke up for a while, but we realized we couldn’t stay apart', // ✏️
    media: null,
  },
  {
    date: 'unknown', // ⏳ PENDING: shows literally on the site. Use an approx month, e.g. 'Oct 2024'
    title: 'You tried fixing things', // ✏️
    // ⏳ PENDING: heavy for a birthday/safe-place site. Soften to one line or move to a real conversation.
    body: 'I chose to say bad things unfortunately and I regret it every day ever since', // ✏️
    media: { type: 'image', src: '/media/photos/WhatsApp Image 2026-08-18 at 7.53.06 PM (1).jpeg', alt: 'Certain' },
  },
  {
    date: 'Today',
    title: 'Happy 19!!', // ✏️
    // ⏳ PENDING: 'not allowed to attend' clashes with 'I'll see you soon' in the letter. Make the story consistent.
    body: 'Many many happy returns of the day, I sadly cannot attend your party but I will always be the well wisher of you even if I am not allowed to attend', // ✏️
    media: null,
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  10. THE COMFORT SECTION
 *  The part she'll come back to months from now.
 * ─────────────────────────────────────────────────────────────────────────── */

export const comfort = {
  label: 'For later',
  heading: 'If you’re feeling alone…', // ✏️

  // ⏳ PENDING: still the template draft. Rewrite in your own voice.
  // ✏️ [COMFORT_MESSAGE]
  message: `Hey. If you’re here, it’s probably late. Or it’s probably been one of those days.

First — nothing is wrong with you. You’re allowed to miss someone. That ache is only love with nowhere to go for a minute.

Second — I’m still here. Not in a poetic way. Literally. Whoever wrote this is somewhere out there thinking about you more often than he’d ever admit out loud.

So put the phone down for a second. Breathe out slower than you breathe in. Four times, properly.

Then pick one of these. Hear my voice, or open a memory, or just read something. Stay as long as you need to. This place isn’t going anywhere, and neither am I.`,

  // The buttons underneath. Remove any you don't want.
  actions: [
    { label: 'Play my voice', kind: 'voice' },
    { label: 'Open a random memory', kind: 'randomMemory' },
    { label: 'Read this when you miss me', kind: 'openWhen', key: 'miss' },
    { label: 'Listen to our song', kind: 'music' },
    { label: 'Read the letter again', kind: 'letter' },
  ],
}

/* ───────────────────────────────────────────────────────────────────────────
 *  11. "OPEN WHEN…" LETTERS
 *  Sealed cards she taps to open. Add as many as you like.
 * ─────────────────────────────────────────────────────────────────────────── */

export const openWhenIntro = {
  label: 'Open when',
  heading: 'Sealed, until you need them', // ✏️
  blurb: 'Only open the one you actually need. They’ll keep.', // ✏️
}

export const openWhen = [
  {
    key: 'miss',
    title: 'Open when you miss me',
    // ⏳ PENDING: 'I always pick up' — keep only if true. Rewrite in your voice.
    // ✏️ [MISS_YOU_MESSAGE]
    body: `Then close your eyes for a second.

I’m doing exactly the same thing right now, wherever I am. That isn’t a guess. There hasn’t been a day it didn’t happen.

Missing me means it’s real. If it didn’t hurt a little, it wouldn’t have been worth anything. So let it hurt for a minute — then come and find me. I always pick up.`,
  },
  {
    key: 'sad',
    title: 'Open when you’re sad',
    // ⏳ PENDING: template draft. Rewrite in your voice.
    // ✏️ [SAD_MESSAGE]
    body: `You don’t have to explain it to me. Not the reason, not the timeline, not why it’s “silly”. It isn’t silly.

Just tell me. Type it out badly at 2am. Send the voice note where you’re crying and can’t finish a sentence. I would rather have that than a version of you performing okay.

And if you can’t say it out loud yet — that’s fine too. I’ll wait. I’m good at waiting for you.`,
  },
  {
    key: 'sleep',
    title: 'Open when you can’t sleep',
    // ⏳ PENDING: fill [A PLACE WE'VE BEEN] — it shows literally on screen. 'wake me up' — keep only if true.
    // ✏️ [CANT_SLEEP_MESSAGE]
    body: `Okay. Here’s what we’re doing.

Lights off. Brightness all the way down. And stop trying to fall asleep, because the trying is the whole problem.

Instead, go back to [A PLACE WE'VE BEEN] with me. Start at the beginning. All the small details, slowly, in order — what it smelled like, what I was wearing, what you said that made me go quiet.

If that doesn’t work, wake me up. I mean it. I’d rather lose the sleep than have you lying there on your own.`,
  },
  {
    key: 'reassurance',
    title: 'Open when you need reassurance',
    // ⏳ PENDING: template draft. Rewrite in your voice.
    // ✏️ [REASSURANCE_MESSAGE]
    body: `Yes. Still. All of it.

I’m not going anywhere. Not when it’s hard, not when we’re bad at texting for a week, not when the distance makes us short with each other, not when you’ve decided you’re too much.

You’re not too much. You have never once been too much. You’re exactly the right amount of a person who feels things properly, and I chose that on purpose.

Whatever tonight’s doubt is — the answer is you. It’s been you for a long time now.`,
  },
  {
    key: 'smile',
    title: 'Open when you want to smile',
    // ⏳ PENDING: fill [INSIDE JOKE] and [THAT SILLY THING SHE DOES] — they show literally on screen.
    // ✏️ [SMILE_MESSAGE]
    body: `Remember [INSIDE JOKE].

Yeah. That.

And the face you make when you’re pretending not to laugh — the one where your mouth goes tight and it has never, ever worked.

And how you [THAT SILLY THING SHE DOES] and think nobody’s noticed, and everybody has noticed, and it’s my favourite thing about you.

There it is. Told you.`,
  },
  {
    key: 'us',
    title: 'Open when you want to remember us',
    // ⏳ PENDING: fill [HOW WE MET] and [THE NIGHT YOU KNEW]; 'a few hundred kilometres' — fix to your real distance.
    // ✏️ [MEMORY_MESSAGE]
    body: `Us: two people who found each other at an extremely inconvenient distance and decided the map was wrong.

[HOW WE MET]. [THE NIGHT YOU KNEW]. The morning we both fell asleep on the call and neither of us hung up.

We’ve survived worse than a few hundred kilometres. Bad weeks. Worse timing. A genuinely stupid number of arguments about nothing.

Still here. Both of us. That’s the part I’d tell people about.`,
  },
]

/* ───────────────────────────────────────────────────────────────────────────
 *  12. THE ENDING
 * ─────────────────────────────────────────────────────────────────────────── */

export const finale = {
  // ⏳ PENDING: template draft. Rewrite in your voice.
  // ✏️ [FINAL_MESSAGE]
  message: `There isn’t a clever ending for this.

You’re the best thing that ever happened to me by accident, and I’d choose it on purpose a hundred times over.

Come back whenever you want. It’ll all still be here — the letters, my voice, the songs, every last bit of it. That’s the point of it.

Happy birthday, [HER_NAME]. Go and be impossible and wonderful. I’ll be right here.`,

  closing: 'Happy 19!! No matter how far apart we are, you’ll always have a little piece of me here.', // ✏️
  restart: 'Read it again from the beginning',
}

/* ───────────────────────────────────────────────────────────────────────────
 *  13. BACKGROUND MUSIC (optional)
 *  Off by default and never autoplays — she has to choose it. Set
 *  `enabled: false` to remove the little music button entirely.
 * ─────────────────────────────────────────────────────────────────────────── */

export const ambient = {
  enabled: true,
  src: '/media/music/birthday-theme.m4a', // ✏️ the birthday theme song
  label: 'Play the birthday theme song',
  volume: 0.35,
}

/* ───────────────────────────────────────────────────────────────────────────
 *  14. SECTION ORDER
 *  Reorder or delete lines to change the flow of the whole site.
 * ─────────────────────────────────────────────────────────────────────────── */

export const sectionOrder = [
  'letter',
  'memories',
  'videos',
  'voice',
  'music',
  'timeline',
  'comfort',
  'openWhen',
  'finale',
]

/* ── Helpers used by the components. You can ignore everything below. ────── */

export const fill = (text) =>
  String(text ?? '')
    .replaceAll('[MY_NAME]', people.me)
    .replaceAll('[HER_NAME]', people.her)

export const paragraphs = (text) =>
  fill(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
