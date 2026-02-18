import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const srcDir = join(process.cwd(), 'src');

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, supabase/functions (which use Deno-style imports)
      if (entry.name === 'node_modules') continue;
      if (entry.name === 'functions' && dir.includes('supabase')) continue;
      files.push(...await getAllFiles(fullPath));
    } else {
      const ext = extname(entry.name);
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

// This regex matches import specifiers with @version patterns
// e.g., 'sonner@2.0.3' -> 'sonner'
// e.g., '@radix-ui/react-dialog@1.1.6' -> '@radix-ui/react-dialog'
// e.g., 'date-fns@4.1.0' -> 'date-fns'
// e.g., 'lucide-react@0.487.0' -> 'lucide-react'
// But NOT scoped packages like '@radix-ui/react-dialog' (no version)
// Pattern: match the last @version in a package name that's followed by a semver
const versionRegex = /(from\s+['"])([^'"]+?)@(\d+\.\d+\.\d+[^'"]*?)(['"])/g;

function fixImport(match, prefix, pkg, version, suffix) {
  // For scoped packages like @radix-ui/react-dialog@1.1.6
  // pkg would be @radix-ui/react-dialog, version would be 1.1.6
  console.log(`  Fixed: ${pkg}@${version} -> ${pkg}`);
  return `${prefix}${pkg}${suffix}`;
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const newContent = content.replace(versionRegex, fixImport);
  if (content !== newContent) {
    await writeFile(filePath, newContent, 'utf-8');
    return true;
  }
  return false;
}

async function main() {
  console.log('Scanning for versioned imports in src/...');
  const files = await getAllFiles(srcDir);
  console.log(`Found ${files.length} source files`);
  
  let fixedCount = 0;
  for (const file of files) {
    const relPath = file.replace(process.cwd() + '/', '');
    const content = await readFile(file, 'utf-8');
    if (versionRegex.test(content)) {
      // Reset regex state
      versionRegex.lastIndex = 0;
      console.log(`\nFixing: ${relPath}`);
      await processFile(file);
      fixedCount++;
    }
  }
  
  console.log(`\nDone! Fixed ${fixedCount} files.`);
}

main().catch(console.error);
