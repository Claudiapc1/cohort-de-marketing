export const PROJECT_BRIEF_SCHEMA_VERSION = '1.0.0' as const;
export const LEGACY_BRIEF_SCHEMA_VERSION = '0.1.0' as const;

export type FieldSource = 'user' | 'artifact' | 'inferred' | 'migration';
export type FieldConfirmation = 'confirmed' | 'pending' | 'not_applicable';

export interface FieldSourceMeta {
  source: FieldSource;
  confirmation: FieldConfirmation;
  sourceArtifactId?: string;
  sourceRevisionId?: string;
  updatedAt: string;
}

export type BriefSection = Record<string, unknown>;

export interface ProjectBriefData {
  schemaVersion: typeof LEGACY_BRIEF_SCHEMA_VERSION;
  meta?: BriefSection;
  project: BriefSection & { slug?: string; name?: string };
  market?: BriefSection;
  offer?: BriefSection;
  brand?: BriefSection;
  funnel?: BriefSection;
  channels?: BriefSection;
  data?: BriefSection;
  integrations?: BriefSection;
  fieldMeta?: Record<string, { source?: string; sourcePath?: string; updatedAt?: string }>;
}

export interface ProjectBriefRevision {
  schemaVersion: typeof PROJECT_BRIEF_SCHEMA_VERSION;
  id: string;
  workspaceId: string;
  projectId: string;
  revision: number;
  status: 'draft' | 'active' | 'superseded';
  createdAt: string;
  updatedAt: string;
  data: ProjectBriefData;
  fieldSources: Record<string, FieldSourceMeta>;
}

export interface MarketingProject {
  id: string;
  workspaceId: string;
  slug: string;
  name: string;
  status: 'active' | 'archived';
  activeBriefRevisionId: string;
  createdAt: string;
  updatedAt: string;
}

export type ArtifactVerification = 'pending' | 'confirmed' | 'missing';
export type ArtifactState = 'real' | 'example' | 'proposal' | 'confirmed' | 'stale';

export interface ProjectArtifact {
  id: string;
  workspaceId: string;
  projectId: string;
  artifactType: string;
  title: string;
  path: string;
  format: 'markdown' | 'html' | 'pdf' | 'image' | 'json' | 'yaml' | 'other';
  state: ArtifactState;
  verification: ArtifactVerification;
  source: 'filesystem' | 'skill_run' | 'migration' | 'demo';
  hash?: string;
  content?: string;
  skillRunId?: string;
  createdAt: string;
  updatedAt: string;
}

export type SkillRunStatus = 'queued' | 'running' | 'needs_review' | 'done' | 'failed' | 'cancelled';

export interface SkillRun {
  id: string;
  workspaceId: string;
  projectId: string;
  skillId: string;
  status: SkillRunStatus;
  skillHash: string;
  inputSnapshot: Record<string, unknown>;
  proposal?: Record<string, unknown>;
  /**
   * Canonical hash of the reviewable proposal (STORY-8.W2.3). Set on `needs_review`
   * and bumped alongside `proposalRevision` when the reviewer edits the proposal;
   * a stale expected hash is rejected by the approval endpoint.
   */
  proposalHash?: string;
  /** Bumped on each proposal edit — invalidates a stale in-flight approval. */
  proposalRevision?: number;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignOverride {
  value: unknown;
  reason: string;
  updatedAt: string;
}

export interface CampaignPlanRevision {
  schemaVersion: '1.0.0';
  id: string;
  projectId: string;
  campaignId: string;
  revision: number;
  sourceBrief: { id: string; revision: number };
  platform: 'meta';
  objective: 'sales' | 'leads';
  landingPageUrl?: string;
  budget: { daily: number; periodDays: number; currency: 'BRL' };
  angles: Array<{ id: string; name: string; awarenessLevel: number; source: 'brief' | 'artifact' | 'human' }>;
  finalists: Array<{
    id: string;
    angleId: string;
    hook: string;
    copy: string;
    format: 'feed' | 'reels-9x16';
    selectedByHuman: true;
  }>;
  tracking: {
    status: 'PENDING' | 'OK' | 'PARCIAL' | 'CRITICO';
    criticalItemsConfirmed: boolean;
    auditArtifactId?: string;
    checks: Record<string, { value: boolean | null; evidence: string; critical: boolean }>;
  };
  structure: Record<string, unknown> | null;
  manualSubmission: {
    status: 'not_ready' | 'ready' | 'confirmed_by_human';
    confirmedAt?: string;
    confirmedBy?: string;
  };
  overrides: Record<string, CampaignOverride>;
  updatedAt: string;
}

export interface WeeklyMetric {
  name: string;
  value: number | null;
  seal: 'Real' | 'Estimado' | 'nao_fornecido';
  source: string;
  attributionWindow: string | null;
  premise: string | null;
  confirmedByHuman: boolean;
  cashConfirmed?: boolean;
}

export interface WeeklyPanel {
  schemaVersion: '1.0.0';
  id: string;
  projectId: string;
  campaignId: string;
  weekStart: string;
  revision: number;
  status: 'draft' | 'reading_ready' | 'diagnosed' | 'decided' | 'closed';
  metrics: WeeklyMetric[];
  reader: { literalOnly: true; sampleSufficientForCpa: boolean; note: string; reviewedAt?: string };
  diagnosis: {
    hypothesis: string;
    singleLever: string;
    successCriterion: string;
    reversalCriterion: string;
    circuitBreakerTriggered: boolean;
  } | null;
  decision: {
    status: 'pending' | 'approved' | 'rejected';
    decidedBy?: string;
    decidedAt?: string;
    humanAction?: string;
  };
  events: Array<{
    id: string;
    type: string;
    actor: 'human' | 'system' | 'skill';
    createdAt: string;
    payload?: unknown;
  }>;
}

export interface PathLookup {
  exists: boolean;
  value: unknown;
}

export function getPath(source: unknown, path: string): PathLookup {
  let cursor: unknown = source;
  for (const part of path.split('.')) {
    if (!cursor || typeof cursor !== 'object' || !Object.prototype.hasOwnProperty.call(cursor, part)) {
      return { exists: false, value: undefined };
    }
    cursor = (cursor as Record<string, unknown>)[part];
  }
  return { exists: true, value: cursor };
}

export function setPath<T extends object>(source: T, path: string, value: unknown): T {
  const clone = structuredClone(source);
  const parts = path.split('.');
  let cursor = clone as Record<string, unknown>;
  for (const part of parts.slice(0, -1)) {
    const child = cursor[part];
    if (!child || typeof child !== 'object' || Array.isArray(child)) cursor[part] = {};
    cursor = cursor[part] as Record<string, unknown>;
  }
  cursor[parts.at(-1) ?? path] = value;
  return clone;
}

export function slugifyProjectName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'novo-projeto';
}

export interface BriefValidationIssue {
  path: string;
  message: string;
}

const LEGACY_BRIEF_ROOT_FIELDS = new Set([
  'schemaVersion',
  'meta',
  'project',
  'market',
  'offer',
  'brand',
  'funnel',
  'channels',
  'data',
  'integrations',
  'fieldMeta',
  'artifacts',
]);

/** Valida o envelope importável sem normalizar nem descartar o documento original. */
export function validateLegacyBrief(input: unknown): BriefValidationIssue[] {
  const issues: BriefValidationIssue[] = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return [{ path: '$', message: 'deve ser um objeto JSON.' }];
  }
  const document = input as Record<string, unknown>;
  for (const key of Object.keys(document)) {
    if (!LEGACY_BRIEF_ROOT_FIELDS.has(key)) issues.push({ path: key, message: 'campo não permitido.' });
  }
  if (document.schemaVersion !== LEGACY_BRIEF_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', message: `esperado ${LEGACY_BRIEF_SCHEMA_VERSION}.` });
  }
  if (!document.project || typeof document.project !== 'object' || Array.isArray(document.project)) {
    issues.push({ path: 'project', message: 'é obrigatório e deve ser um objeto.' });
  } else {
    const project = document.project as Record<string, unknown>;
    if (typeof project.slug !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(project.slug)) {
      issues.push({ path: 'project.slug', message: 'é obrigatório e deve usar slug minúsculo com hífens.' });
    }
  }
  for (const key of ['meta', 'market', 'offer', 'brand', 'funnel', 'channels', 'data', 'integrations']) {
    if (document[key] !== undefined && (!document[key] || typeof document[key] !== 'object' || Array.isArray(document[key]))) {
      issues.push({ path: key, message: 'deve ser um objeto.' });
    }
  }
  if (document.fieldMeta !== undefined && (!document.fieldMeta || typeof document.fieldMeta !== 'object' || Array.isArray(document.fieldMeta))) {
    issues.push({ path: 'fieldMeta', message: 'deve ser um objeto.' });
  }
  if (document.artifacts !== undefined) {
    if (!document.artifacts || typeof document.artifacts !== 'object' || Array.isArray(document.artifacts)) {
      issues.push({ path: 'artifacts', message: 'deve ser um objeto de flags booleanas.' });
    } else {
      for (const [artifactType, declared] of Object.entries(document.artifacts as Record<string, unknown>)) {
        if (typeof declared !== 'boolean') issues.push({ path: `artifacts.${artifactType}`, message: 'deve ser booleano.' });
      }
    }
  }
  return issues;
}

export function migrateLegacyBrief(
  input: ProjectBriefData & { artifacts?: Record<string, boolean> },
  options: { id: string; workspaceId: string; projectId: string; now: string },
): { document: ProjectBriefRevision; declaredArtifactTypes: string[] } {
  const issues = validateLegacyBrief(input);
  if (issues.length) {
    throw new Error(`Briefing inválido: ${issues.map((issue) => `${issue.path} (${issue.message})`).join('; ')}`);
  }

  const data = structuredClone(input);
  const declaredArtifactTypes = Object.entries(data.artifacts ?? {})
    .filter(([, declared]) => declared)
    .map(([artifactType]) => artifactType);
  delete data.artifacts;

  const fieldSources = Object.fromEntries(
    Object.entries(data.fieldMeta ?? {}).map(([path, meta]) => [
      path,
      {
        source: meta.source === 'artifact' ? 'artifact' : meta.source === 'inferred' ? 'inferred' : 'migration',
        confirmation:
          meta.source === 'pending_confirmation'
            ? 'pending'
            : meta.source === 'not_applicable'
              ? 'not_applicable'
              : 'confirmed',
        ...(meta.sourcePath ? { sourceArtifactId: meta.sourcePath } : {}),
        updatedAt: meta.updatedAt ?? options.now,
      } satisfies FieldSourceMeta,
    ]),
  );

  return {
    document: {
      schemaVersion: PROJECT_BRIEF_SCHEMA_VERSION,
      id: options.id,
      workspaceId: options.workspaceId,
      projectId: options.projectId,
      revision: 1,
      status: 'active',
      createdAt: String(data.meta?.createdAt ?? options.now),
      updatedAt: String(data.meta?.updatedAt ?? options.now),
      data,
      fieldSources,
    },
    declaredArtifactTypes,
  };
}
