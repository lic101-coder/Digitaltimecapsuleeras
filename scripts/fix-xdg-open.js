// Create a no-op xdg-open script so Vite doesn't crash when trying to open a browser
import { writeFileSync, chmodSync, existsSync } from 'fs';
import { execSync } from 'child_process';

// Find where xdg-open would be looked up
const paths = (process.env.PATH || '').split(':');
let targetDir = '/usr/local/bin';

// Use the first writable bin directory
for (const p of paths) {
  if (p && existsSync(p)) {
    targetDir = p;
    break;
  }
}

const stubPath = `${targetDir}/xdg-open`;

try {
  // Create a no-op shell script
  writeFileSync(stubPath, '#!/bin/sh\nexit 0\n');
  chmodSync(stubPath, 0o755);
  console.log(`Created xdg-open stub at ${stubPath}`);
} catch (e) {
  console.error(`Failed to create stub at ${stubPath}:`, e.message);
  // Try /tmp as fallback
  try {
    writeFileSync('/tmp/xdg-open', '#!/bin/sh\nexit 0\n');
    chmodSync('/tmp/xdg-open', 0o755);
    console.log('Created xdg-open stub at /tmp/xdg-open');
    // Prepend /tmp to PATH
    console.log('Add /tmp to PATH: export PATH=/tmp:$PATH');
  } catch (e2) {
    console.error('Failed to create stub:', e2.message);
  }
}
