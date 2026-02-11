import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const projectRoot = '/vercel/share/v0-project/src';

function getAllFiles(dir) {
  const results = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Match: from 'package@1.2.3' or from "package@1.2.3"
// Also match: from '@scope/package@1.2.3'
// But NOT: from 'jsr:@scope/package@1.2.3'
const versionRegex = /@\d+\.\d+\.\d+(?=['"])/g;

const files = getAllFiles(projectRoot);
let totalFixed = 0;
let filesFixed = 0;

for (const filePath of files) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let changed = false;
    
    const newLines = lines.map(line => {
      // Only process import/export lines
      if ((line.includes('from ') || line.includes('import(')) && 
          (line.includes("'") || line.includes('"'))) {
        // Skip jsr: imports
        if (line.includes('jsr:')) return line;
        
        const newLine = line.replace(versionRegex, '');
        if (newLine !== line) {
          changed = true;
          totalFixed++;
          return newLine;
        }
      }
      return line;
    });
    
    if (changed) {
      writeFileSync(filePath, newLines.join('\n'), 'utf-8');
      filesFixed++;
      console.log('Fixed: ' + filePath.replace('/vercel/share/v0-project/', ''));
    }
  } catch (err) {
    console.error('Error: ' + filePath + ' - ' + err.message);
  }
}

console.log('\nDone. Fixed ' + totalFixed + ' imports in ' + filesFixed + ' files (scanned ' + files.length + ' total).');
