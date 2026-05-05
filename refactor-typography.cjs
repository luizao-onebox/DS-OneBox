const fs = require('fs');
const path = require('path');

const directory = './src/components/shadcn';

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Headings
  content = content.replace(/text-2xl font-semibold/g, 'text-h3');
  content = content.replace(/text-2xl font-bold/g, 'text-h3');
  content = content.replace(/text-xl font-semibold/g, 'text-h4');
  content = content.replace(/text-lg font-semibold/g, 'text-h5');
  content = content.replace(/text-base font-semibold/g, 'text-h6');

  // Labels
  content = content.replace(/text-sm font-semibold/g, 'text-label-md font-semibold');
  content = content.replace(/text-sm font-medium/g, 'text-label-md');
  content = content.replace(/text-xs font-semibold/g, 'text-label-sm font-semibold');
  content = content.replace(/text-xs font-medium/g, 'text-label-sm');
  content = content.replace(/text-base font-medium/g, 'text-label-lg');

  // Bodies (using word boundaries to prevent text-sm matching inside text-label-sm)
  content = content.replace(/\btext-sm\b/g, 'text-body-sm');
  content = content.replace(/\btext-xs\b/g, 'text-body-xs');
  content = content.replace(/\btext-base\b/g, 'text-body-md');
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

walkDir(directory);
walkDir('./src/blocks');
console.log("Done refactoring.");
