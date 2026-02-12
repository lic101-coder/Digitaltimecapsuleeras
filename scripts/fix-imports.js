import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// This script removes version numbers from import specifiers
// e.g., from "sonner@2.0.3" → from "sonner"
// e.g., from "@radix-ui/react-slot@1.1.2" → from "@radix-ui/react-slot"

const srcDir = process.argv[2] || '/vercel/share/v0-project/src';

// Regex to match versioned imports:
// Handles both scoped (@org/package@version) and unscoped (package@version)
// Pattern: from "package@semver" or from 'package@semver'
const versionedImportRegex = /(from\s+['"])(@[a-z0-9-]+\/[a-z0-9-]+|[a-z0-9-]+)@\d+\.\d+\.\d+([^'"]*['"])/g;

let totalFixed = 0;
let filesFixed = 0;

function walkDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git') continue;
      walkDir(fullPath);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  let count = 0;
  const fixed = content.replace(versionedImportRegex, (match, prefix, pkg, suffix) => {
    count++;
    return `${prefix}${pkg}${suffix}`;
  });
  if (count > 0) {
    writeFileSync(filePath, fixed, 'utf-8');
    totalFixed += count;
    filesFixed++;
    console.log(`Fixed ${count} import(s) in ${filePath}`);
  }
}

console.log(`Scanning ${srcDir} for versioned imports...`);
walkDir(srcDir);
console.log(`\nDone! Fixed ${totalFixed} imports across ${filesFixed} files.`);
