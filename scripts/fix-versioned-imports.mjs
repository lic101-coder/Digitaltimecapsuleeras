import fs from 'fs';
import path from 'path';

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
// Matches: from "react-hook-form@7.55.0" -> from "react-hook-form"
const versionedImportRegex = /(from\s+['"])([^'"]+?)@\d+\.\d+[^'"]*(['"])/g;

const srcDir = path.resolve('src');
const files = findFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);

let totalFixes = 0;
let filesFixed = 0;

for (const file of files) {
  // Skip .md files
  if (file.endsWith('.md')) continue;
  
  const content = fs.readFileSync(file, 'utf8');
  const newContent = content.replace(versionedImportRegex, (match, prefix, pkg, suffix) => {
    // Remove the @version part from the package name
    // But keep @scope (e.g., @radix-ui/react-dialog)
    const cleanPkg = pkg.replace(/@(\d+\.\d+.*)$/, '');
    totalFixes++;
    return `${prefix}${cleanPkg}${suffix}`;
  });
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    filesFixed++;
    console.log(`Fixed: ${path.relative('.', file)}`);
  }
}

console.log(`\nDone! Fixed ${totalFixes} versioned imports across ${filesFixed} files.`);
