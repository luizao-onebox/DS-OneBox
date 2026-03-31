# V1-Deprecated — Checkpoint de Recuperação

> Snapshot criado em: **2026-03-30**
> Motivo: Refatoração completa da documentação e estrutura de workflow

---

## O que está aqui

Cópia integral da estrutura V1 do vault, preservada como:
1. **Registro histórico** — como o sistema era antes da refatoração
2. **Checkpoint de recuperação** — caso a V2 precise de rollback

---

## Estrutura preservada

```
V1-Deprecated/
├── Workflow/
│   ├── 00 - Sistema de Trabalho Solo Dev.md
│   ├── 01 - Backlog.md
│   ├── 02 - Sprint Atual.md
│   ├── 03 - Regras de Ouro e Rituais.md
│   ├── 04 - Devlog.md
│   ├── Recursos/
│   │   ├── 00 - Índice de Recursos.md
│   │   ├── ORCHESTRATOR.md         ← Pipeline de geração (V1)
│   │   ├── SKILL.md                ← Design system reference (V1, arquivo único monolítico)
│   │   ├── figma-variables.json
│   │   ├── textStyles.json
│   │   └── PRDs/
│   │       ├── 01_dashboard_home.md
│   │       ├── 02_conferencias_lote.md
│   │       ├── 03_conferencias_individual.md
│   │       ├── 04_desambiguacao_fila.md
│   │       ├── 05_desambiguacao_comparacao.md
│   │       ├── 06_analise_risco.md
│   │       ├── 07_cadastros_lista.md
│   │       ├── 08_cadastros_drawer.md
│   │       ├── 09_auditoria_qualidade.md
│   │       ├── 10_auditoria_eventos.md
│   │       ├── 11_settings_usuarios.md
│   │       ├── 12_settings_organizacao.md
│   │       ├── 13_categorias_lista.md
│   │       ├── 14_categorias_editor.md
│   │       ├── 15_process_rules.md
│   │       ├── 16_termos_politicas.md
│   │       ├── 17_integracoes_status.md
│   │       └── 18_integracoes_logs.md
│   ├── Templates/
│   ├── Milestones/
│   └── Devlog/
└── README.md  ← este arquivo
```

---

## Problemas identificados na V1 (motivo da refatoração)

- **CAMADA 5 nos PRDs**: código JS executável duplicado em todos os 18 arquivos, incluindo helpers repetidos
- **SKILL.md monolítico**: ~1000 linhas misturando lookup de componentes, tokens, código e exemplos — causava context window pressure
- **CAMADA 6/7/8 não implementadas**: ORCHESTRATOR referenciava camadas que não existiam nos PRDs
- **Sem estado persistente**: COMPONENT_REGISTRY e SHELL_PATTERN viviam apenas no contexto da sessão Claude
- **Sem bridge para código/GitHub**: nenhum mapeamento componente→código

---

## Como fazer rollback

Se precisar voltar para V1:
1. Copiar os arquivos de `V1-Deprecated/Workflow/` para `Workflow/`
2. Deletar os arquivos da V2 que conflitem
3. Atualizar o ORCHESTRATOR para apontar para os arquivos V1
