const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in the project root
process.chdir(__dirname);

// Build the Rust project for WebAssembly
console.log('Building Rust project for WebAssembly...');
execSync('cargo build --release --target wasm32-unknown-unknown', { stdio: 'inherit' });

// Create the output directory if it doesn't exist
const outputDir = path.join('./', 'src', 'gen');
fs.mkdirSync(outputDir, { recursive: true });

// Run wasm-bindgen
console.log('Generating WebAssembly bindings...');
execSync(`wasm-bindgen ../target/wasm32-unknown-unknown/release/resumers_lib.wasm --out-dir ${outputDir} --target web --typescript`, { stdio: 'inherit' });

// Run typeshare
console.log('Generating TypeScript types...');
execSync(`typeshare ../src/ --lang=typescript --output-file=${path.join(outputDir, 'types.ts')}`, { stdio: 'inherit' });

// Create index.ts file
console.log('Creating index.ts...');
fs.writeFileSync(path.join(outputDir, 'index.ts'), 'export * from \'./types\';\n');

console.log('Build completed successfully!');