const { readdir, readFile, writeFile } = require('fs').promises;
const { join, extname } = require('path');

const srcDir = '/vercel/share/v0-project/src';

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
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
// But NOT scoped packages like '@radix-ui/react-dialog' (no version after it)
const versionRegex = /(from\s+['"])([^'"]+?)@(\d+\.\d+\.\d+[^'"]*?)(['"])/g;

function fixImport(match, prefix, pkg, version, suffix) {
  console.log('  Fixed: ' + pkg + '@' + version + ' -> ' + pkg);
  return prefix + pkg + suffix;
}

async function main() {
  console.log('Scanning for versioned imports in src/...');
  const files = await getAllFiles(srcDir);
  console.log('Found ' + files.length + ' source files');
  
  let fixedCount = 0;
  for (const file of files) {
    const relPath = file.replace('/vercel/share/v0-project/', '');
    const content = await readFile(file, 'utf-8');
    // Reset regex state before test
    versionRegex.lastIndex = 0;
    if (versionRegex.test(content)) {
      // Reset regex state before replace
      versionRegex.lastIndex = 0;
      console.log('\nFixing: ' + relPath);
      const newContent = content.replace(versionRegex, fixImport);
      await writeFile(file, newContent, 'utf-8');
      fixedCount++;
    }
  }
  
  console.log('\nDone! Fixed ' + fixedCount + ' files.');
}

main().catch(console.error);
