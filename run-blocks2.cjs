const fs = require('fs');
const path = require('path');
function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/\btext-5xl\b/g, 'text-display-md');
  content = content.replace(/\btext-4xl\b/g, 'text-display-sm');
  content = content.replace(/\btext-3xl\b/g, 'text-h1');
  content = content.replace(/\btext-2xl\b/g, 'text-h3');
  content = content.replace(/\btext-xl\b/g, 'text-h4');
  content = content.replace(/\btext-lg\b/g, 'text-body-lg');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Refactored: ' + filePath);
  }
}
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      refactorFile(fullPath);
    }
  }
}
walkDir('./src/components');
