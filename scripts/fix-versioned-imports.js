import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const SRC_DIR = join(process.cwd(), 'src');

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Pattern: matches package names with @version at the end inside quotes
// e.g., "@radix-ui/react-slot@1.1.2" -> "@radix-ui/react-slot"
// e.g., "sonner@2.0.3" -> "sonner"
// e.g., "lucide-react@0.487.0" -> "lucide-react"
// e.g., "class-variance-authority@0.7.1" -> "class-variance-authority"
// Handles both scoped (@org/pkg@ver) and unscoped (pkg@ver) packages
const versionedImportRegex = /(from\s+['"])([^'"]+?)@\d+[^'"]*(['"])/g;

async function fixFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const newContent = content.replace(versionedImportRegex, (match, prefix, packageName, suffix) => {
    // Don't strip the @ from scoped packages like @radix-ui/react-slot
    // The regex captures everything before the last @version
    console.log(`  Fixed: ${packageName}@... -> ${packageName}`);
    return `${prefix}${packageName}${suffix}`;
  });

  if (content !== newContent) {
    await writeFile(filePath, newContent, 'utf-8');
    return true;
  }
  return false;
}

async function main() {
  const files = await getAllFiles(SRC_DIR);
  let fixedCount = 0;

  for (const file of files) {
    const relativePath = file.replace(process.cwd() + '/', '');
    const content = await readFile(file, 'utf-8');
    if (versionedImportRegex.test(content)) {
      // Reset regex lastIndex since it's global
      versionedImportRegex.lastIndex = 0;
      console.log(`Fixing: ${relativePath}`);
      const fixed = await fixFile(file);
      if (fixed) fixedCount++;
    }
  }

  console.log(`\nDone! Fixed ${fixedCount} files.`);
}

main().catch(console.error);
