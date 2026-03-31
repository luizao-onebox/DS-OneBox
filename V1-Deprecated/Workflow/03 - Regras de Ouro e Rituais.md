# Regras de Ouro e Rituais

---

## 🏆 Regras de Ouro

```
1. UMA tarefa por vez. Não mova outra pra "Fazendo"
   até a atual estar em "Feito".

2. Se leva mais de 3 sessões, quebre em partes menores.

3. Segunda = Planning (10 min). Sexta = Review (5 min).
   Sem exceção.

4. Não code sem saber a tarefa. Abra o board ANTES
   do editor de código.

5. Se surgir ideia nova no meio de uma tarefa,
   anote no Backlog e continue o que estava fazendo.

6. Feito > Perfeito. Ship e melhore depois.

7. Atualize o Devlog toda sexta. 5 minutos. Sempre.
```

---

## 📅 Ritual 1 — Planning de Segunda (10 min)

Toda segunda-feira, antes de codar qualquer coisa:

1. **Limpe a coluna "Feito"** — mova tudo pra um registro de concluídos.
   Olhe o que você entregou na semana passada. Celebre mentalmente.
2. **Revise o Backlog** — tem algo novo pra adicionar? Algo que não faz mais sentido?
3. **Escolha 3-5 tarefas pra semana** — mova pra coluna "Sprint (Semana)".
   Use o ICE Score se estiver em dúvida. Prefira tarefas P e M.
4. **Defina a primeira** — mova 1 tarefa pra "Fazendo".

> 10 minutos. Agora você sabe exatamente o que fazer pelos próximos 7 dias.

---

## 📅 Ritual 2 — Review de Sexta (5 min)

Toda sexta-feira, no final da última sessão da semana:

1. O que eu entreguei essa semana? (lista rápida)
2. O que ficou pra trás? Por quê? (scope creep? subestimei? bloqueio?)
3. Alguma decisão técnica importante que tomei e devo documentar?

Anote no [[04 - Devlog]] usando o [[Template - Devlog Semanal]].
3-5 linhas. Não é diário, é registro.

---

## ⏱️ Sessão de Trabalho Ideal (2-4h)

```
[0:00 - 0:05]  Abrir o board. Ver a tarefa do dia.
               Ler a descrição e os subtasks.

[0:05 - 0:15]  Setup mental: abrir os arquivos relevantes,
               relembrar onde parou (ler último commit).

[0:15 - 3:30]  EXECUTAR. Foco total na tarefa.
               - Se aparecer bug não relacionado → anota no Backlog
               - Se aparecer ideia de feature → anota no Backlog
               - Se aparecer "devia refatorar isso" → anota no Backlog
               (Percebe o padrão? Anota e volta pro que estava fazendo.)

[3:30 - 3:50]  Commit + push. Mensagem de commit descritiva.

[3:50 - 4:00]  Atualizar o board: marcar subtasks feitos,
               mover issue se completou, anotar bloqueio se houver.
```

> O segredo: **proteja as 3h15 do meio**. É ali que o trabalho real acontece.

---

## 📋 Convenções de Commit

```
feat: adicionar componente de card
fix: corrigir cálculo de validação
refactor: extrair lógica para service separado
chore: configurar ESLint + Prettier
docs: atualizar devlog semana X
style: ajustar spacing do header no mobile
test: adicionar testes unitários do módulo Y
```

> **Regra:** cada commit faz UMA coisa. Se a mensagem precisa de "e", são dois commits.

---

## Tamanhos de Tarefa

- **P (Pequena):** Até 1 sessão de trabalho (2-4h)
- **M (Média):** 2-3 sessões
- **G (Grande):** 4-5 sessões (1 semana) → **quebre em Ms ou Ps antes de começar**

## Tipos de Tarefa (Labels)

- 🎨 `design` — Trabalho no Figma, tokens, componentes visuais
- 🔨 `feature` — Funcionalidade nova
- 🧹 `refactor` — Limpeza, reorganização, melhoria de código existente
- 🐛 `bug` — Correção de problema
- 📐 `infra` — CI/CD, configs, tooling, DevOps
- 📝 `docs` — Documentação
