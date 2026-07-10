import { describe, expect, it } from 'vitest';
import { getPath, migrateLegacyBrief, setPath, slugifyProjectName, validateLegacyBrief } from '@/lib/project-domain';

describe('project domain', () => {
  it('gets and sets nested paths without mutating the source', () => {
    const source = { project: { name: 'Antes' } };
    const next = setPath(source, 'project.name', 'Depois');
    expect(getPath(next, 'project.name')).toEqual({ exists: true, value: 'Depois' });
    expect(source.project.name).toBe('Antes');
  });

  it('creates stable ASCII slugs', () => {
    expect(slugifyProjectName('Máquina de Receita com IA')).toBe('maquina-de-receita-com-ia');
  });

  it('migrates artifacts as pending declarations outside the brief', () => {
    const result = migrateLegacyBrief(
      {
        schemaVersion: '0.1.0',
        project: { slug: 'demo' },
        artifacts: { offerbook: true, design: false },
        fieldMeta: {
          'project.slug': { source: 'user', updatedAt: '2026-07-09T00:00:00.000Z' },
        },
      },
      {
        id: 'brief-1',
        workspaceId: 'workspace-1',
        projectId: 'project-1',
        now: '2026-07-09T00:00:00.000Z',
      },
    );
    expect(result.document.schemaVersion).toBe('1.0.0');
    expect('artifacts' in result.document.data).toBe(false);
    expect(result.declaredArtifactTypes).toEqual(['offerbook']);
    expect(result.document.fieldSources['project.slug']?.source).toBe('migration');
  });

  it('preserves zero, false, unknown and not_applicable values during migration', () => {
    const result = migrateLegacyBrief(
      {
        schemaVersion: '0.1.0',
        project: { slug: 'preserve-values' },
        data: { zero: 0, disabled: false, unknown: 'unknown', not_applicable: 'not_applicable' },
        fieldMeta: { 'data.not_applicable': { source: 'not_applicable' } },
      },
      { id: 'brief-2', workspaceId: 'workspace-1', projectId: 'project-2', now: '2026-07-09T00:00:00.000Z' },
    );
    expect(result.document.data.data).toEqual({ zero: 0, disabled: false, unknown: 'unknown', not_applicable: 'not_applicable' });
    expect(result.document.fieldSources['data.not_applicable']?.confirmation).toBe('not_applicable');
  });

  it('returns every invalid field path without changing the source document', () => {
    const source = { schemaVersion: '0.1.0', project: { slug: 'Bad Slug' }, artifacts: { offerbook: 'yes' } };
    expect(validateLegacyBrief(source)).toEqual([
      { path: 'project.slug', message: 'é obrigatório e deve usar slug minúsculo com hífens.' },
      { path: 'artifacts.offerbook', message: 'deve ser booleano.' },
    ]);
    expect(source).toEqual({ schemaVersion: '0.1.0', project: { slug: 'Bad Slug' }, artifacts: { offerbook: 'yes' } });
  });
});
