import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function walkDir(dir, callback) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    if (entry === 'node_modules' || entry === '.git' || entry === 'dist') continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      callback(fullPath);
    }
  }
}

let fixedCount = 0;

walkDir('/vercel/share/v0-project/src', (filePath) => {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;

  // Fix sonner@2.0.3 -> sonner
  if (content.includes('sonner@2.0.3')) {
    content = content.replace(/['"]sonner@2\.0\.3['"]/g, (match) => {
      const quote = match[0];
      return `${quote}sonner${quote}`;
    });
    modified = true;
  }

  // Fix date-fns@4.1.0 -> date-fns
  if (content.includes('date-fns@4.1.0')) {
    content = content.replace(/['"]date-fns@4\.1\.0['"]/g, (match) => {
      const quote = match[0];
      return `${quote}date-fns${quote}`;
    });
    modified = true;
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
    console.log(`Fixed: ${filePath}`);
  }
});

console.log(`\nTotal files fixed: ${fixedCount}`);
