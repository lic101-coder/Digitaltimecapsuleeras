const { readdir, readFile, writeFile } = require('fs/promises');
const { join, extname } = require('path');

const SRC_DIR = join(process.cwd(), 'src');

// Pattern matches: from "package@version" or from 'package@version'
// Captures the package name (before @version) and replaces the whole import specifier
const VERSIONED_IMPORT_RE = /from\s+(['"])((?:@[\w-]+\/)?[\w-]+)@\d+\.\d+\.\d+\1/g;

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function fixFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const newContent = content.replace(VERSIONED_IMPORT_RE, (match, quote, pkg) => {
    return `from ${quote}${pkg}${quote}`;
  });
  if (content !== newContent) {
    await writeFile(filePath, newContent, 'utf-8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

async function main() {
  const files = await getAllFiles(SRC_DIR);
  console.log(`Scanning ${files.length} files...`);
  let fixedCount = 0;
  for (const file of files) {
    const fixed = await fixFile(file);
    if (fixed) fixedCount++;
  }
  console.log(`Done! Fixed ${fixedCount} files.`);
}

main().catch(console.error);
