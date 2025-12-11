#!/usr/bin/env node

/**
 * Development Environment Setup Script
 * Configures the development environment and validates the setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up LakinduQA Portfolio - Professional Development Environment\n');

// Check if Node.js and npm are installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  
  console.log(`✅ Node.js: ${nodeVersion}`);
  console.log(`✅ npm: ${npmVersion}\n`);
} catch (error) {
  console.error('❌ Node.js or npm is not installed. Please install them first.');
  process.exit(1);
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Validate project structure
console.log('📁 Validating project structure...');
const requiredDirs = [
  'src',
  'src/styles',
  'src/scripts',
  'src/components',
  'config',
  'public',
  'assets',
  'components'
];

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.js',
  '.eslintrc.js',
  '.prettierrc.js',
  'index.html',
  'README.md'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ Directory: ${dir}`);
  } else {
    console.log(`⚠️  Missing directory: ${dir}`);
  }
});

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ File: ${file}`);
  } else {
    console.log(`⚠️  Missing file: ${file}`);
  }
});

console.log('\n🎉 Development environment setup complete!');
console.log('\n📋 Available commands:');
console.log('  npm run dev     - Start development server');
console.log('  npm run build   - Build for production');
console.log('  npm run preview - Preview production build');
console.log('  npm run lint    - Run ESLint');
console.log('  npm run format  - Format code with Prettier');
console.log('  npm run type-check - Type check with TypeScript');
console.log('  npm run validate - Run all quality checks');
console.log('\n🚀 Run "npm run dev" to start developing!');