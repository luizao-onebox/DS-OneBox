# Spec — Admin / Settings / Termos & Políticas
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #16 de 18 
> Prioridade de execução: **11**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Termos & Políticas
Sidebar ativo: Settings → Product → Termos & Políticas
Plataforma: Desktop 1440 × 880px
DS Skill: DS-COMPONENTS.md + DS-TOKENS.md + HELPERS.md
Memória: Consultar telas já criadas antes de iniciar
```

---

## CAMADA 2 — Referência Visual

> Executar via figma_execute antes de qualquer geração:

```javascript
await figma_execute({
  code: `
    const node = await figma.getNodeByIdAsync("3134:3682");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3682", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3682", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Product > Termos & Políticas 
**Objetivo:** Gestão de termos de uso, políticas de privacidade e retenção de dados (LGPD). 
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL)
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar + body)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`
**Fundo:** `surface/desktop` (gray/100)

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Shell
Sidebar: 305:3092, item ativo: Settings → Product → Termos & Políticas
Topbar: 301:1056

### BLOCO 2 · Seção 1 — Termos e Políticas
Tabela node 3048:41686:
| Documento | Versão | Publicado | URL | Aceites | Ações |
|-----------|--------|-----------|-----|---------|-------|
| Termos de Uso | v3.2 | 15/01/2026 | palmeiras.com/termos | 94% | Editar URL · Histórico |
| Política de Privacidade | v2.1 | 15/01/2026 | palmeiras.com/privacidade | 94% | Editar URL · Histórico |
| Consentimento Biometria | v1.0 | 01/02/2026 | palmeiras.com/biometria | 87% | Editar URL · Histórico |

### BLOCO 3 · Seção 2 — Políticas de Retenção
Tabela:
| Tipo de dado | Retenção | Base legal | Ação pós-expiração |
|-------------|----------|-----------|---------------------|
| Dados cadastrais | Vínculo + 5 anos | Execução de contrato | Anonimização |
| Selfie/biometria | Duração do vínculo | Consentimento | Exclusão |
| Documentos capturados | 90 dias pós-conferência | Legítimo interesse | Exclusão |
| Logs de auditoria | 5 anos | Obrigação legal | Arquivamento |

### BLOCO 4 · Seção 3 — Solicitações LGPD
Tabela node 3048:41686:
| # | Tipo | Cadastro | Data | SLA | Status | Ações |
|---|------|----------|------|-----|--------|-------|
| #1 | Acesso | João S. | 20/02/2026 | 15d | Em andamento | Ver · Atender |
| #2 | Eliminação | Maria F. | 15/02/2026 | 15d | Concluído | Ver |

Status: Badge/Components node 3010:97638

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Termos & Políticas" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Settings" marcado como Active via setProperties
[ ] Body: VERTICAL, FILL, padding 24px, gap 24px
[ ] DataTable nodes 3393:11073/6548/9617 usados para table body — não recriados com primitivos
[ ] Todos os text nodes criados via makeText() — zero fontName/fontSize diretos
[ ] Todos os text styles vinculados ao DS via textStyleId (applyTextStyle retornou true)
[ ] Todos os tokens de cor via bindToken() — ZERO hex hardcoded nos fills
[ ] Nenhum componente DS visual recriado com primitivos (createFrame para layout estrutural E CORRETO)
[ ] Zero texto placeholder visível ("Label", "Value", "Title", "Button", "PH")
[ ] Modal/Drawer appendado ao screen como último filho, visible=false no estado padrão
[ ] Screenshot capturado após cada bloco
```

---


## CAMADA 6 — Validação Visual

Comparar screenshot do frame `Admin / Settings / Termos & Políticas` com referência `3134:3682`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Settings" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
