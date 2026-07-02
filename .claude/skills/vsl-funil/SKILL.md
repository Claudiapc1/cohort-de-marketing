---
name: vsl-funil
description: "Estrutura um funil de VSL Direct Response do zero, seguindo o método de oferta -> funil -> escala -> ticket. Entra nicho + produto, sai a estrutura completa: oferta (dor, mecanismo do problema, mecanismo da solução), funil de VSL com upsell, plano de escala por múltiplos funis e estratégia de ticket cartão/Pix. Use quando você pedir pra montar funil, VSL, estruturar oferta Direct Response ou planejar escala de funil."
user_invocable: true
---

# Funil VSL — Direct Response

Skill que estrutura um funil de VSL (Video Sales Letter) no modelo Direct Response, do zero até a escala. Baseada no método do Alan Nicolas.

> **Promessa do método:** estruturar um funil que escala por múltiplos canais, onde o ticket de entrada é isca e o lucro real vem do upsell.

---

## Onde salvar e ler — convenção de projeto

Todo o trabalho de um nicho fica em **`projetos/{slug}/`** (um slug por nicho). Um projeto = uma pasta, com todas as peças do funil dentro. Nada solto na raiz.

**Como descobrir o projeto ativo:**
1. Se o usuário passou o slug/nicho no comando, use-o.
2. Senão, `ls projetos/ 2>/dev/null`: **uma** pasta → use-a; **várias** → pergunte qual; **nenhuma** → o funil ainda não começou.

**Nomes dentro da pasta** (sem repetir o slug): `avatar.md`, `offerbook.md`, `copy.md`, `funil.md`, `DESIGN.md`, `recuperacao.md`, `cro.md`; subpastas `pagina/`, `emails/`, `conteudo/`, `carrossel/`, `mockups/`. Nos 3 formatos (md/html/pdf) onde a skill gera.

> **Onde salvar:** o entregável desta skill sai em **`projetos/{slug}/vsl.md`** (+ `.html` e `.pdf`).

---

## Passo 0 — Checar insumos antes de rodar

Rode `ls projetos/{slug}/` e veja o que já existe. Insumos desta skill:

- **Obrigatório:** `offerbook.md` — dele saem a dor, o mecanismo e a oferta (sai da skill `/offerbook`).
- **Recomendados:** `avatar.md` (dores e público reais), `espiao/dossie-*.md` (brechas do concorrente), `swipe/briefing-swipe-file.md` (hooks e referências validadas).

Se faltar um obrigatório, aponte a skill que o gera e **PERGUNTE** se o usuário quer seguir mesmo assim — não trave silenciosamente, não assuma.

---

## Gate de pré-requisito (execute ANTES de tudo)

Esta skill parte do output das etapas anteriores do funil. Antes de qualquer coisa, descubra o **projeto ativo** (ver "convenção de projeto" acima) e confira que os arquivos existem dentro dele:

```
ls projetos/ 2>/dev/null                                        # descobrir o projeto ativo (slug)
ls projetos/{slug}/copy.md projetos/{slug}/offerbook.md 2>/dev/null
```

- Se existir(em), leia deles a copy base da VSL/página do `projetos/{slug}/copy.md` e a oferta (dor, mecanismo do problema/solução, entregáveis, preço) do `projetos/{slug}/offerbook.md`.
- Se FALTAR algum, PARE e exiba um aviso claro apontando qual skill rodar antes:

> Pra estruturar o funil de VSL eu preciso da `projetos/{slug}/copy.md`, que sai da skill `/copy-funil` (e do `projetos/{slug}/offerbook.md` pra oferta, da skill `/offerbook`). Rode `/copy-funil` primeiro; quando `projetos/{slug}/copy.md` existir, volte e rode esta skill de novo.

Não invente de cabeça o conteúdo que deveria vir da etapa anterior.

---

## Regra de honestidade de prova

- **Nunca inventar** depoimento, número, case ou citação. Toda prova vem do offerbook ou de pesquisa real.
- **Sem prova disponível** → use estratégia alternativa (garantia forte, bastidor, transparência) e marque `[SEM PROVA AINDA]`.
- **Nicho regulado** → linguagem de possibilidade, sem "resultado garantido" (respeite o gate de compliance do offerbook).

---

## Como usar

Quando você pedir pra montar/estruturar um funil de VSL, uma oferta Direct Response ou um plano de escala:

1. **Coletar 2 inputs** (perguntar se não vieram no briefing):
   - **Nicho** do produto (ex: renda extra, nutrição, emagrecimento, desenvolvimento pessoal, IA/marketing)
   - **Produto/transformação** que vai ser vendido
2. **Rodar as 4 fases** abaixo, preenchendo cada bloco com o caso real.
3. **Entregar a estrutura completa** pra você aprovar — NUNCA executar/subir nada sem OK.
4. Você escreve a copy da VSL e da página a partir da estrutura — não escrever de cabeça, partir sempre da oferta definida nas fases.

## O Framework — 4 Fases

### Fase 1 — Construção da Oferta

A oferta nasce de 3 perguntas, nesta ordem:

| Pergunta | O que extrair |
|----------|---------------|
| **Qual a dor?** | A dor que a pessoa acorda sentindo TODOS os dias e que o produto resolve |
| **Por que ainda não resolveu?** | A pessoa já tentou e falhou — descobrir o motivo da falha |
| **Mecanismo do problema** | A causa-raiz real por que as tentativas anteriores falharam |
| **Mecanismo da solução** | O método único que resolve o mecanismo do problema |

> Regra: primeiro o **mecanismo do problema**, depois o **mecanismo da solução**. Sem mecanismo do problema, a solução parece "mais um curso".

### Fase 2 — Construção do Funil

- **Funil indicado:** VSL (Video Sales Letter)
- **Duração da VSL:** 20 a 50 minutos. **Não existe padrão** — é o tempo necessário pra convencer o lead daquilo que está sendo vendido. Mais curto se a consciência for alta, mais longo se for baixa.
- **Order bump:** NÃO recomendado nesse funil.
- **Upsell:** obrigatório e tem que converter bem — **meta de 20 a 30% direto**.
  - O upsell **NÃO é um "próximo passo"** do produto.
  - O upsell é um **facilitador** (faz o resultado vir mais rápido/com menos esforço) OU **maior acesso a você** (mentoria, grupo, contato direto).

### Fase 3 — Escala

Montou o funil e botou a VSL pra rodar → escala por **múltiplos funis simultâneos**:

1. VSL (base)
2. Time comercial
3. Webinário diário
4. Ascensão quinzenal
5. Lançamento

> A combinação desses canais é o que sustenta volume alto e recorrente. Não depender de um funil só.

### Fase 4 — Ticket e Estratégia de Pagamento

- **Ticket ideal da VSL:** R$297 a R$497 (entrada baixa de propósito).
- **O lucro vem do upsell**, não do front-end.
- **Cartão > Pix:** pra rodar One Click Buy (compra do upsell em 1 clique), a pessoa precisa ter comprado no **cartão**.
- **Alavanca de ticket:** se o ticket está baixo (ex: R$297) mas tem muita compra no **Pix**, **suba o ticket** — ticket maior empurra mais gente pro cartão, o que aumenta a taxa de upsell.

## Template de Saída

Entregar sempre neste formato preenchido com o caso real:

```markdown
# Funil VSL — [Produto] ([Nicho])

## 1. Oferta
- Dor diária: ...
- Por que não resolveu: ...
- Mecanismo do problema: ...
- Mecanismo da solução: ...

## 2. Funil
- VSL: ~[X] min (justificativa do tempo pela consciência do lead)
- Order bump: não
- Upsell: [facilitador OU maior acesso] — meta 20-30% conversão

## 3. Escala
- [ ] VSL
- [ ] Time comercial
- [ ] Webinário diário
- [ ] Ascensão quinzenal
- [ ] Lançamento

## 4. Ticket
- Front-end: R$[297-497]
- Estratégia cartão/Pix: ...
- Upsell (onde está o lucro): R$... — ...
```

## Regras

- Sempre **mostrar a estrutura pra você revisar** antes de qualquer execução — nunca subir copy/página sem OK.
- Copy da VSL/página sai da oferta definida nas 4 fases. Você escreve a copy a partir da estrutura, não de cabeça.
- Números (ticket, % de upsell) são **referências do método** — validar contra os dados reais do seu negócio antes de prometer em público.
- Este é um framework de **referência** — ao aplicar no SEU produto, adapte ao seu contexto (público, oferta, tickets reais).

---

**Método:** Alan Nicolas

---

## Output nos 3 formatos (md + html + pdf) — igual à Aula 1

Todo entregável desta skill sai em **3 formatos**, com o mesmo nome-base:

1. **`.md`** — o conteúdo (fonte de verdade).
2. **`.html`** — versão estilizada aplicando os **tokens do `projetos/{slug}/DESIGN.md` da marca do aluno** (cores, fontes, borda/raio, tamanho, logo). NUNCA use um tema fixo/genérico (dark, champagne, "padrão do cohort", template pronto) — a identidade é sempre a do `DESIGN.md`. Legibilidade conforme o público (nichos 50+/acessibilidade → fonte grande ≥18px, alto contraste). CSS inline, self-contained, sem emoji, português acentuado. Se não houver `DESIGN.md`, gere-o com `/design-md` antes.
3. **`.pdf`** — gerado a partir do html:

   ```
   bash .claude/skills/vsl-funil/scripts/gerar_pdf.sh <arquivo>.html
   ```

Salve os 3 e confirme ao final. Nunca entregar só o `.md`.

---

## Ao terminar — SEMPRE diga o próximo passo

Toda execução desta skill **termina apontando o próximo passo** — pra o aluno nunca ficar sem saber o que fazer depois. Consulte o **Mapa de Execução do `/metodo-funil`** (ou a sequência da aula) pra saber qual skill vem a seguir, e aponte-a explicitamente:

> Pronto. **Próximo passo:** rode `/{proxima-skill}` — [o que ela entrega].

Nunca encerre sem o próximo passo.
