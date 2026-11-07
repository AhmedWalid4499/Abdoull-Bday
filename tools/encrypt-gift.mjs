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
const norm = (s) => s.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ');
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
