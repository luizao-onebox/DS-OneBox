const fs = require('fs');
const path = require('path');

const borderRegex = /\bborder-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[1-9]5?0\b/g;

let findings = [];

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (dirPath.endsWith('.tsx')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      let lines = content.split('\n');
      lines.forEach((line, i) => {
        let match1 = line.match(borderRegex);
        let matches = [...(match1 || [])];
        if (matches.length > 0) {
          findings.push({ file: dirPath, line: i + 1, matches: matches.join(', ') });
        }
      });
    }
  });
}

walkDir('./src/components');

const grouped = findings.reduce((acc, curr) => {
  if (!acc[curr.file]) acc[curr.file] = [];
  acc[curr.file].push(curr);
  return acc;
}, {});

console.log("=== COMPONENTES COM BORDAS HARDCODED ===");
for (const [file, items] of Object.entries(grouped)) {
  console.log('\nArquivo: ' + file);
  items.forEach(item => {
    console.log('  Linha ' + item.line + ': ' + item.matches);
  });
}
