import { execSync } from 'child_process';

try {
  console.log('Running npm install to regenerate package-lock.json...');
  execSync('cd /vercel/share/v0-project && npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('Successfully installed dependencies and regenerated package-lock.json');
} catch (error) {
  console.error('Error during npm install:', error.message);
  process.exit(1);
}
