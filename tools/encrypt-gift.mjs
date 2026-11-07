// Encrypts the gift card code so it can live safely in a public repo.
// The page decrypts it in the browser only when the right answer is typed.
//
// Usage:  node tools/encrypt-gift.mjs "<gift card code>" "<secret answer>"
// Paste the printed JSON into CONFIG.gift.payload in index.html.
// Answers are matched case-insensitively, with extra spaces ignored.
import { webcrypto as crypto } from 'node:crypto';

const [code, answer] = process.argv.slice(2);
if (!code || !answer) {
  console.error('Usage: node tools/encrypt-gift.mjs "<gift card code>" "<secret answer>"');
  process.exit(1);
}

const ITER = 600000;
// Must stay identical to normAnswer() in index.html.
function norm(s) {
  s = s.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
  const M = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  const mon = (w) => (/^[a-z]+$/.test(w) && M[w.slice(0, 3)]) || null;
  const n2 = (w) => /^\d{1,2}$/.test(w), n4 = (w) => /^\d{4}$/.test(w);
  const p = s.replace(/(\d+)(st|nd|rd|th)\b/g, '$1').replace(/[,./\-]/g, ' ').trim().split(/\s+/);
  let y, mo, d;
  if (p.length === 3) {
    if (mon(p[0]) && n2(p[1]) && n4(p[2])) [mo, d, y] = [mon(p[0]), +p[1], +p[2]];
    else if (n2(p[0]) && mon(p[1]) && n4(p[2])) [d, mo, y] = [+p[0], mon(p[1]), +p[2]];
    else if (n4(p[0]) && n2(p[1]) && n2(p[2])) [y, mo, d] = [+p[0], +p[1], +p[2]];
    else if (n2(p[0]) && n2(p[1]) && n4(p[2])) {
      const a = +p[0], b = +p[1]; y = +p[2];
      if (a > 12 && b <= 12) [d, mo] = [a, b]; else if (b > 12 && a <= 12) [mo, d] = [a, b];
    }
  }
  if (y && mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return `date:${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return s;
}
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const base = await crypto.subtle.importKey('raw', enc.encode(norm(answer)), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(code.trim())));

const b64 = (u) => Buffer.from(u).toString('base64');
console.log(JSON.stringify({ iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
