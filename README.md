# BIRTHDAY.EXE 🎂🎮

A retro terminal and 8-bit gaming birthday website. It's a single `index.html` file with no build step, and every sound is generated live in the browser.

## What happens
1. **Press any key to start** (this also turns on the sound).
2. A green-on-black terminal boots up with typing sounds and asks for the player's name. Only the birthday player's name is accepted. Wrong names cost a life, and losing all 3 gives GAME OVER, then a continue with a hint.
3. ACCESS GRANTED → 1 BIRTHDAY DETECTED → ASCII banner → countdown → CRT switch-off.
4. The party page:
   - Glitchy **HAPPY BIRTHDAY** with his name, and his partner creature **BYTLING** evolving into **TERADRAKE** to an original evolution-style tune while the XP bar fills. Click the creature to hear it.
   - **▶ PLAY**: an 8-bit Happy Birthday with karaoke lyrics that sing his name
   - A pixel cake with candles to blow out, player stats, a self-typing `birthday.js`, and your message
   - 🎁 **Loot chest**: a gift card code, encrypted and unlocked only by answering a question
   - 🔍 **Hidden Critters Hunt**: 6 tiny critters hidden around the page, plus a critter log
   - 8 achievements and a score (secret: type `gg`)
5. At **100% completion**, ending credits roll with an original credits theme.

## Personalise it
Edit the `CONFIG` block at the top of the `<script>` in `index.html`:

```js
const CONFIG = {
  playerName: 'Abdoull',      // the only accepted name
  acceptedNames: ['Abdoull'], // add other spellings here
  age: null,                  // e.g. 21 shows "LVL 20 > LVL 21"
  fromName: 'YUTO',           // who the messages are from
  message: `...`,             // the "incoming transmission" message
  gift: { ... },              // loot chest (see below)
};
```

### Loot chest
The gift code is never stored in plain text. To change it:

```bash
node tools/encrypt-gift.mjs "<gift card code>" "<answer>"
```

Paste the printed JSON into `CONFIG.gift.payload`. Answers ignore capital letters and spacing, and dates can be written in any common format.

## Link preview
`preview.png` (1200×630) is shown when the link is shared on WhatsApp, Discord, iMessage and similar apps. The `og:` tags in `<head>` point to the GitHub Pages URL. Update them if the site moves.

## Put it online (free) with GitHub Pages
**Settings → Pages → Build and deployment → Deploy from a branch**, choose the branch and `/ (root)`, then save.
After a minute it's live at `https://ahmedwalid4499.github.io/Abdoull-Bday/`.

To preview locally, double-click `index.html`.
