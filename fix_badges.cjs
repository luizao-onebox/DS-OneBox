const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('Badge.tsx') && !fullPath.includes('Badge.stories.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      const regex = /<Badge([^>]*?)variant=(["'])(.*?)\2([^>]*?)>/g;
      content = content.replace(regex, (match, p1, q, variant, p4) => {
        let newVariant = 'solid';
        let newColor = 'neutral';
        
        if (variant === 'secondary') {
          newVariant = 'soft';
          newColor = 'neutral';
        } else if (variant === 'destructive') {
          newVariant = 'solid';
          newColor = 'destructive';
        } else if (variant === 'outline') {
          newVariant = 'outline';
          newColor = 'neutral';
        } else if (variant === 'default') {
          newVariant = 'solid';
          newColor = 'primary';
        } else if (variant === 'success') {
          newVariant = 'solid';
          newColor = 'success';
        } else if (variant === 'warning') {
          newVariant = 'solid';
          newColor = 'warning';
        } else if (variant === 'info') {
          newVariant = 'solid';
          newColor = 'info';
        } else if (variant === 'destructiveOutline') {
          newVariant = 'outline';
          newColor = 'destructive';
        } else {
          return match;
        }

        changed = true;
        return `<Badge${p1}variant="${newVariant}" color="${newColor}"${p4}>`;
      });

      const regexDefault = /<Badge([^>]*?)>/g;
      content = content.replace(regexDefault, (match, p1) => {
        if (p1.includes('variant=') || match.includes('</Badge>')) return match;
        changed = true;
        return `<Badge${p1}variant="solid" color="primary">`;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('src/components');
