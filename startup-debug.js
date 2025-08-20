console.log('=== STARTUP DEBUG SCRIPT ===');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('PID:', process.pid);
console.log('Current working directory:', process.cwd());
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- PWD:', process.env.PWD);
console.log('=== END STARTUP DEBUG ===');

// Try to require the main application
try {
  console.log('Attempting to require main application...');
  require('./src/index.js');
  console.log('Main application loaded successfully');
} catch (error) {
  console.error('Error loading main application:', error);
  process.exit(1);
}
