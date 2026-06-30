#!/usr/bin/env node
/**
 * cohort.cjs — wrapper "comando único" da skill design-md para o Cohort de Marketing.
 *
 * O aluno só dá o comando. Este wrapper cuida do resto:
 *   1. Instala as dependências da skill na primeira vez (sem o aluno rodar npm install)
 *   2. Roda o extrator original (run.cjs) — não toca no código do Alan
 *   3. Copia o DESIGN.md gerado para a RAIZ do projeto (onde as skills do cohort procuram)
 *   4. Marca o brand-choice como "design-md" para os relatórios saírem na marca do aluno
 *
 * Uso (o Claude Code chama isto quando o aluno digita /design-md <url>):
 *   node .claude/skills/design-md/cohort.cjs --url https://site-da-marca.com
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const skillDir = __dirname;
const projectRoot = process.cwd();

function log(msg) { process.stdout.write(`[cohort] ${msg}\n`); }

// --- 1. Garante as dependências (primeira vez apenas) ---
const nodeModules = path.join(skillDir, 'node_modules');
const yamlInstalled = fs.existsSync(path.join(nodeModules, 'yaml'));
if (!yamlInstalled) {
  log('Primeira vez: instalando as dependências da skill (~30s, só acontece uma vez)...');
  try {
    execFileSync('npm', ['install', '--silent', '--no-audit', '--no-fund'], {
      cwd: skillDir,
      stdio: 'inherit',
    });
  } catch (e) {
    log('Falha ao instalar dependências automaticamente.');
    log('Rode manualmente uma vez:  cd .claude/skills/design-md && npm install');
    process.exit(1);
  }
}

// --- 2. Roda o extrator original (run.cjs) a partir da raiz do projeto ---
const args = process.argv.slice(2);
log('Gerando o DESIGN.md da sua marca...');
let runHadError = false;
try {
  execFileSync('node', [path.join(skillDir, 'run.cjs'), ...args], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
} catch (e) {
  // Um passo não-essencial (ex.: render do preview) pode falhar mesmo com o
  // DESIGN.md já gerado. Não aborta aqui: confere abaixo se o arquivo saiu.
  runHadError = true;
}

// --- 3. Acha o DESIGN.md recém-gerado e copia para a raiz do projeto ---
const outputsDir = path.join(projectRoot, 'outputs', 'design-md');
function findFreshestDesignMd(dir) {
  if (!fs.existsSync(dir)) return null;
  let best = null;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(dir, entry.name, 'DESIGN.md');
    if (fs.existsSync(candidate)) {
      const mtime = fs.statSync(candidate).mtimeMs;
      if (!best || mtime > best.mtime) best = { file: candidate, mtime, slug: entry.name };
    }
  }
  return best;
}

const found = findFreshestDesignMd(outputsDir);
if (!found) {
  log('Não consegui gerar o DESIGN.md. Veja o log acima.');
  process.exit(runHadError ? 1 : 2);
}
if (runHadError) {
  log('Obs: um passo opcional (preview) deu aviso, mas o seu DESIGN.md saiu normalmente.');
}

const rootDesign = path.join(projectRoot, 'DESIGN.md');
fs.copyFileSync(found.file, rootDesign);
log(`DESIGN.md copiado para a raiz do projeto (a partir de "${found.slug}").`);

// --- 4. Marca o brand-choice ---
try {
  fs.writeFileSync(path.join(projectRoot, '.cohort-brand-choice'), 'design-md\n');
} catch (_) { /* não-crítico */ }

log('Pronto! A sua marca está ativa. Daqui pra frente as skills usam o seu DESIGN.md.');
log(`Abra o preview pra conferir: outputs/design-md/${found.slug}/preview.html`);
