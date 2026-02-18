const { readdirSync } = require('fs');
const { resolve } = require('path');

console.log('CWD:', process.cwd());
console.log('__dirname:', __dirname);

// Check various possible locations
const paths = [
  '.',
  '..',
  '/vercel/share/v0-project',
  '/home/user',
  '/vercel/share',
];

for (const p of paths) {
  try {
    const abs = resolve(p);
    const entries = readdirSync(abs);
    console.log(`\n${abs}:`, entries.slice(0, 20).join(', '));
  } catch (e) {
    console.log(`\n${resolve(p)}: ERROR - ${e.message}`);
  }
}
