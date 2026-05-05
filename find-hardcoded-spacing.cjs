const fs = require('fs');
const path = require('path');

// Look for fixed heights, widths, radius and arbitrary values that should probably be tokens
const spacingRegex = /\b([hw]-(1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)|rounded-(sm|md|lg|xl|2xl|3xl|full))\b/g;
const arbitrarySpacingRegex = /\b([hw]|rounded)-\[[0-9]+(px|rem|em)\]/g;

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
        let match1 = line.match(arbitrarySpacingRegex); // Focus on arbitrary spacing [10px] etc
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

console.log("=== COMPONENTES COM ESPAÇAMENTOS HARDCODED (Arbitrários ex: w-[10px]) ===");
for (const [file, items] of Object.entries(grouped)) {
  console.log('\nArquivo: ' + file);
  items.forEach(item => {
    console.log('  Linha ' + item.line + ': ' + item.matches);
  });
}
