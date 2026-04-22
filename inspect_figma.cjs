const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_nodes.json', 'utf8'));
const nodes = data.nodes;

if (!nodes) {
  console.log('Erro ao buscar nós', data);
  process.exit(1);
}

function summarizeNode(node, depth=0) {
  const pad = ' '.repeat(depth * 2);
  let summary = pad + node.name + ' (' + node.type + ')';
  
  if (node.fills && node.fills.length > 0 && node.fills[0].color) {
     const c = node.fills[0].color;
     summary += ` bg: rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${c.a||1})`;
  }
  
  if (node.characters) {
     summary += ` txt: "${node.characters.substring(0,20).replace(/\n/g, ' ')}"`;
  }
  
  console.log(summary);
  if (node.children) {
     node.children.forEach(c => summarizeNode(c, depth+1));
  }
}

Object.keys(nodes).forEach(k => {
  console.log('--- NODE: ' + k + ' ---');
  summarizeNode(nodes[k].document);
});
