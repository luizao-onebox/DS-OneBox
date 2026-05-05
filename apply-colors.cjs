const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (let [oldStr, newStr] of replacements) {
    // using regex if oldStr is regex, else string replace
    if (oldStr instanceof RegExp) {
      content = content.replace(oldStr, newStr);
    } else {
      content = content.split(oldStr).join(newStr);
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Colors fixed in: ' + filePath);
  }
}

replaceInFile('./src/components/blocks/ScoreDistribution.tsx', [['text-amber-950', 'text-warning-950']]);
replaceInFile('./src/components/shadcn/Logo.stories.tsx', [['bg-zinc-950', 'bg-neutral-950']]);
