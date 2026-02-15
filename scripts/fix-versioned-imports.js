const fs = require('fs');
const path = require('path');

// Recursively find all .ts, .tsx, .js, .jsx files in src/
function findFiles(dir, extensions) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      results = results.concat(findFiles(fullPath, extensions));
    } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// Regex to match versioned imports like 'package@version' or "@scope/package@version"
// Matches: from 'sonner@2.0.3' -> from 'sonner'
// Matches: from "@radix-ui/react-dialog@1.1.6" -> from "@radix-ui/react-dialog"
// Also handles import('package@version') dynamic imports
const versionedImportRegex = /(from\s+['"])([^'"]+?)@(\d+\.\d+[^'"]*)(['"])/g;
const dynamicImportRegex = /(import\s*\(\s*['"])([^'"]+?)@(\d+\.\d+[^'"]*)(['"]\s*\))/g;

const srcDir = path.resolve('src');
const files = findFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);

let totalFixes = 0;
let filesFixed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Fix static imports: from 'pkg@version' -> from 'pkg'
  newContent = newContent.replace(versionedImportRegex, (match, prefix, pkg, version, suffix) => {
    totalFixes++;
    return `${prefix}${pkg}${suffix}`;
  });
  
  // Fix dynamic imports: import('pkg@version') -> import('pkg')
  newContent = newContent.replace(dynamicImportRegex, (match, prefix, pkg, version, suffix) => {
    totalFixes++;
    return `${prefix}${pkg}${suffix}`;
  });
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    filesFixed++;
    console.log(`Fixed: ${path.relative('.', file)}`);
  }
}

console.log(`\nDone! Fixed ${totalFixes} versioned imports across ${filesFixed} files.`);
