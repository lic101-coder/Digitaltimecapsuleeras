import { execSync } from 'child_process';

try {
  console.log('Installing dependencies with pnpm...');
  execSync('pnpm install --no-frozen-lockfile', { 
    stdio: 'inherit',
    timeout: 180000,
    cwd: '/vercel/share/v0-project'
  });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Install failed:', error.message);
  process.exit(1);
}
