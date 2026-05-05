const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (let [oldStr, newStr] of replacements) {
    if (oldStr instanceof RegExp) {
      content = content.replace(oldStr, newStr);
    } else {
      content = content.split(oldStr).join(newStr);
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Spacings fixed in: ' + filePath);
  }
}

replaceInFile('./src/components/shadcn/Chart.tsx', [
  ['w-[8rem]', 'w-32'],
  ['rounded-[2px]', 'rounded-sm']
]);
replaceInFile('./src/components/shadcn/Chart.stories.tsx', [
  [/rounded-\[2px\]/g, 'rounded-sm'],
  [/h-\[250px\]/g, 'h-64'],
  [/h-\[300px\]/g, 'h-72']
]);

replaceInFile('./src/components/shadcn/DropdownMenu.tsx', [['w-[8rem]', 'w-32']]);
replaceInFile('./src/components/shadcn/Select.tsx', [['w-[8rem]', 'w-32']]);

replaceInFile('./src/components/shadcn/Command.tsx', [['h-[300px]', 'h-72']]);

replaceInFile('./src/components/shadcn/Textarea.tsx', [['h-[60px]', 'min-h-16']]);

replaceInFile('./src/components/shadcn/Toast.tsx', [['w-[420px]', 'w-full max-w-md']]);

replaceInFile('./src/components/shadcn/Calendar.tsx', [
  ['h-[200px]', 'h-48'],
  ['w-[120px]', 'w-32']
]);

replaceInFile('./src/components/shadcn/Skeleton.tsx', [['w-[250px]', 'w-64']]);

