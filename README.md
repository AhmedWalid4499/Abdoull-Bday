# BIRTHDAY.EXE 🎂🎮

A retro terminal and 8-bit gaming birthday website. It's a single `index.html` file with no build step, and every sound is generated live in the browser.

## What happens
1. **Press any key to start** (this also turns on the sound).
2. A green-on-black terminal boots up with typing sounds and asks: **ENTER YOUR NAME, PLAYER ONE**.
3. ACCESS GRANTED → 1 BIRTHDAY DETECTED → ASCII banner → countdown.
4. The screen switches off like an old CRT and the party screen loads:
   - Glitchy **HAPPY BIRTHDAY** with his name and a LEVEL UP XP bar
   - **▶ PLAY**: an 8-bit Happy Birthday tune with karaoke lyrics that sing *his* name, plus an equalizer
   - A pixel cake whose candles you click to blow out
   - Player stats, a `birthday.js` code snippet that types itself out, and your message
   - 6 achievements with a score counter (secret: type `gg`)

## Personalise it
Open `index.html` and edit the `CONFIG` block at the top of the `<script>`:

```js
const CONFIG = {
  age: null,            // e.g. 21 shows "LVL 20 > LVL 21"
  fromName: 'YUTO',     // who the message is from
  message: `...`,       // your birthday message
};
```

## Put it online (free) with GitHub Pages
In the repo, go to **Settings → Pages → Build and deployment**, pick **Deploy from a branch**, choose your branch and `/ (root)`, then save.
After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

To preview locally, just double-click `index.html`.
