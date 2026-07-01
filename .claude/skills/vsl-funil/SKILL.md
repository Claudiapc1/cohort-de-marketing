---
name: vsl-funil
description: "Estrutura um funil de VSL Direct Response do zero, seguindo o metodo de oferta -> funil -> escala -> ticket. Entra nicho + produto, sai a estrutura completa: oferta (dor, mecanismo do problema, mecanismo da solucao), funil de VSL com upsell, plano de escala por multiplos funis e estrategia de ticket cartao/Pix. Use quando voce pedir pra montar funil, VSL, estruturar oferta Direct Response ou planejar escala de funil."
user_invocable: true
---

# Funil VSL — Direct Response

Skill que estrutura um funil de VSL (Video Sales Letter) no modelo Direct Response, do zero ate a escala. Baseada no metodo do Alan Nicolas.

> **Promessa do metodo:** estruturar um funil que escala por multiplos canais, onde o ticket de entrada e isca e o lucro real vem do upsell.

---

## Onde salvar e ler — convenção de projeto

Todo o trabalho de um nicho fica em **`projetos/{slug}/`** (um slug por nicho). Um projeto = uma pasta, com todas as peças do funil dentro. Nada solto na raiz.

**Como descobrir o projeto ativo:**
1. Se o usuário passou o slug/nicho no comando, use-o.
2. Senão, `ls projetos/ 2>/dev/null`: **uma** pasta → use-a; **várias** → pergunte qual; **nenhuma** → o funil ainda não começou.

**Nomes dentro da pasta** (sem repetir o slug): `avatar.md`, `offerbook.md`, `copy.md`, `funil.md`, `DESIGN.md`, `recuperacao.md`, `cro.md`; subpastas `pagina/`, `emails/`, `conteudo/`, `carrossel/`, `mockups/`. Nos 3 formatos (md/html/pdf) onde a skill gera.

> **Onde salvar:** o entregável desta skill sai em **`projetos/{slug}/vsl.md`** (+ `.html` e `.pdf`).

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

## Como usar

Quando voce pedir pra montar/estruturar um funil de VSL, uma oferta Direct Response ou um plano de escala:

1. **Coletar 2 inputs** (perguntar se nao vieram no briefing):
   - **Nicho** do produto (ex: renda extra, nutricao, emagrecimento, desenvolvimento pessoal, IA/marketing)
   - **Produto/transformacao** que vai ser vendido
2. **Rodar as 4 fases** abaixo, preenchendo cada bloco com o caso real.
3. **Entregar a estrutura completa** pra voce aprovar — NUNCA executar/subir nada sem OK.
4. Voce escreve a copy da VSL e da pagina a partir da estrutura — nao escrever de cabeca, partir sempre da oferta definida nas fases.

## O Framework — 4 Fases

### Fase 1 — Construcao da Oferta

A oferta nasce de 3 perguntas, nesta ordem:

| Pergunta | O que extrair |
|----------|---------------|
| **Qual a dor?** | A dor que a pessoa acorda sentindo TODOS os dias e que o produto resolve |
| **Por que ainda nao resolveu?** | A pessoa ja tentou e falhou — descobrir o motivo da falha |
| **Mecanismo do problema** | A causa-raiz real por que as tentativas anteriores falharam |
| **Mecanismo da solucao** | O metodo unico que resolve o mecanismo do problema |

> Regra: primeiro o **mecanismo do problema**, depois o **mecanismo da solucao**. Sem mecanismo do problema, a solucao parece "mais um curso".

### Fase 2 — Construcao do Funil

- **Funil indicado:** VSL (Video Sales Letter)
- **Duracao da VSL:** 20 a 50 minutos. **Nao existe padrao** — e o tempo necessario pra convencer o lead daquilo que esta sendo vendido. Mais curto se a consciencia for alta, mais longo se for baixa.
- **Order bump:** NAO recomendado nesse funil.
- **Upsell:** obrigatorio e tem que converter bem — **meta de 20 a 30% direto**.
  - O upsell **NAO e um "proximo passo"** do produto.
  - O upsell e um **facilitador** (faz o resultado vir mais rapido/com menos esforco) OU **maior acesso a voce** (mentoria, grupo, contato direto).

### Fase 3 — Escala

Montou o funil e botou a VSL pra rodar → escala por **multiplos funis simultaneos**:

1. VSL (base)
2. Time comercial
3. Webinario diario
4. Ascensao quinzenal
5. Lancamento

> A combinacao desses canais e o que sustenta volume alto e recorrente. Nao depender de um funil so.

### Fase 4 — Ticket e Estrategia de Pagamento

- **Ticket ideal da VSL:** R$297 a R$497 (entrada baixa de proposito).
- **O lucro vem do upsell**, nao do front-end.
- **Cartao > Pix:** pra rodar One Click Buy (compra do upsell em 1 clique), a pessoa precisa ter comprado no **cartao**.
- **Alavanca de ticket:** se o ticket esta baixo (ex: R$297) mas tem muita compra no **Pix**, **suba o ticket** — ticket maior empurra mais gente pro cartao, o que aumenta a taxa de upsell.

## Template de Saida

Entregar sempre neste formato preenchido com o caso real:

```markdown
# Funil VSL — [Produto] ([Nicho])

## 1. Oferta
- Dor diaria: ...
- Por que nao resolveu: ...
- Mecanismo do problema: ...
- Mecanismo da solucao: ...

## 2. Funil
- VSL: ~[X] min (justificativa do tempo pela consciencia do lead)
- Order bump: nao
- Upsell: [facilitador OU maior acesso] — meta 20-30% conversao

## 3. Escala
- [ ] VSL
- [ ] Time comercial
- [ ] Webinario diario
- [ ] Ascensao quinzenal
- [ ] Lancamento

## 4. Ticket
- Front-end: R$[297-497]
- Estrategia cartao/Pix: ...
- Upsell (onde esta o lucro): R$... — ...
```

## Regras

- Sempre **mostrar a estrutura pra voce revisar** antes de qualquer execucao — nunca subir copy/pagina sem OK.
- Copy da VSL/pagina sai da oferta definida nas 4 fases. Voce escreve a copy a partir da estrutura, nao de cabeca.
- Numeros (ticket, % de upsell) sao **referencias do metodo** — validar contra os dados reais do seu negocio antes de prometer em publico.
- Este e um framework de **referencia** — ao aplicar no SEU produto, adapte ao seu contexto (publico, oferta, tickets reais).

---

**Metodo:** Alan Nicolas

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
