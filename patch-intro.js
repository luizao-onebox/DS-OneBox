const fs = require('fs');

const filePath = './src/Introduction.mdx';
let content = fs.readFileSync(filePath, 'utf8');

const downloadBlock = 

---

## ?? Acelerando com Inteligência Artificial (Claude, ChatGPT)

Se você utiliza LLMs (como Claude 3.5, ChatGPT ou Cursor) para te ajudar a programar, nós preparamos um **Arquivo de Contexto Absoluto**. 

Ele contém todas as regras do Design System, os tokens de cores e tipografia, e o código-fonte de **todos os componentes**. Basta baixar o arquivo abaixo e fazer o upload (arrastar e soltar) no chat da sua IA favorita, e ela conseguirá criar telas inteiras usando o nosso padrão perfeitamente!

<a 
  href="https://luizao-onebox.github.io/DS-OneBox/llms.txt?v=2" 
  target="_blank" 
  download="llms.txt"
  style={{ 
    display: 'inline-flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '0.75rem 1.5rem', 
    backgroundColor: '#09090b', 
    color: '#ffffff', 
    borderRadius: '0.375rem', 
    fontWeight: '500', 
    textDecoration: 'none',
    marginTop: '1rem',
    marginBottom: '1rem',
    border: '1px solid #333'
  }}
>
  ?? Baixar Contexto para IA (llms.txt)
</a>

---
;

// Insert after the title and intro paragraph
const marker = "---";
content = content.replace(marker, downloadBlock);

fs.writeFileSync(filePath, content);
console.log('Introduction.mdx patched successfully');
