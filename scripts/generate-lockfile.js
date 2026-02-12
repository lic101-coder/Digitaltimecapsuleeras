import { execSync } from 'child_process';

try {
  console.log('Running npm install to generate package-lock.json...');
  execSync('cd /vercel/share/v0-project && npm install --legacy-peer-deps', {
    stdio: 'inherit',
    timeout: 120000,
  });
  console.log('Successfully generated package-lock.json');
} catch (error) {
  console.error('Error generating lockfile:', error.message);
  process.exit(1);
}
