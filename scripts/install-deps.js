import { execSync } from 'child_process';

try {
  console.log('Installing dependencies...');
  execSync('cd /vercel/share/v0-project && npm install --legacy-peer-deps', { 
    stdio: 'inherit',
    timeout: 120000 
  });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Install failed:', error.message);
  process.exit(1);
}
