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

replaceInFile('./src/components/blocks/ActivityTimeline.tsx', []); // Handled only in stories
replaceInFile('./src/components/blocks/CreationWizard.tsx', [['h-[250px]', 'h-64']]);
replaceInFile('./src/components/blocks/DashboardCharts.tsx', [['h-[250px]', 'h-64']]);
replaceInFile('./src/components/blocks/DatePicker.tsx', [['w-[280px]', 'w-72']]);
replaceInFile('./src/components/blocks/EmptyState.tsx', [['w-[420px]', 'w-full max-w-md']]);
replaceInFile('./src/components/blocks/NotificationCenter.tsx', [['h-[350px]', 'max-h-96']]);

replaceInFile('./src/components/blocks/PricingCards.tsx', [['w-[600px]', 'w-full max-w-2xl']]);
replaceInFile('./src/components/blocks/RegisterForm.tsx', [['w-[400px]', 'w-full max-w-md']]);

replaceInFile('./src/components/blocks/RoleManager.tsx', [
  ['w-[300px]', 'w-72'],
  ['w-[100px]', 'w-24']
]);

replaceInFile('./src/components/blocks/ScoreDistribution.tsx', [['rounded-[2px]', 'rounded-sm']]);

replaceInFile('./src/components/blocks/Sidebar.tsx', [
  ['w-[68px]', 'w-[var(--sidebar-width-icon,4.5rem)]'],
  ['w-[260px]', 'w-[var(--sidebar-width,16rem)]'],
  ['h-[60px]', 'h-16']
]);

replaceInFile('./src/components/blocks/Stepper.tsx', [
  ['h-[2px]', 'h-0.5'],
  ['w-[2px]', 'w-0.5'],
  ['h-[32px]', 'h-8']
]);

replaceInFile('./src/components/blocks/UserSettings.tsx', [['w-[200px]', 'w-52']]);

