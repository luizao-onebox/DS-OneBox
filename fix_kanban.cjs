const fs = require('fs');
let content = fs.readFileSync('src/components/blocks/Kanban.stories.tsx', 'utf8');

content = content.replace(/tag: \{ label: "Design", variant: "outline" \}/g, 'tag: { label: "Design", variant: "outline", color: "neutral" }');
content = content.replace(/tag: \{ label: "Backend", variant: "default" \}/g, 'tag: { label: "Backend", variant: "solid", color: "primary" }');
content = content.replace(/tag: \{ label: "DevOps", variant: "warning" \}/g, 'tag: { label: "DevOps", variant: "solid", color: "warning" }');
content = content.replace(/tag: \{ label: "Frontend", variant: "success" \}/g, 'tag: { label: "Frontend", variant: "solid", color: "success" }');
content = content.replace(/tag: taskTag \? \{ label: taskTag, variant: "default" \} : undefined/g, 'tag: taskTag ? { label: taskTag, variant: "solid", color: "primary" } : undefined');
content = content.replace(/variant: t.tag\?\.variant \|\| "default"/g, 'variant: t.tag?.variant || "solid", color: t.tag?.color || "primary"');

fs.writeFileSync('src/components/blocks/Kanban.stories.tsx', content);
