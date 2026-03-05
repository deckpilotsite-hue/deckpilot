/**
 * DeckPilot Score rubric: 8 dimensions, fixed weights, 0–10 scale.
 * Used for calculation (weighted average, Value Pick) and display (labels).
 * See doc/deckpilot-deep-research-prompts-spec.md and specs/deckpilot-score/spec.md.
 */

export const DECKPILOT_SCORE_DIMENSION_IDS = [
  'slide-quality-design',
  'editing-control-flexibility',
  'workflow-speed-ux',
  'export-ownership',
  'templates-brand-controls',
  'collaboration-team-features',
  'integrations-input-options',
  'pricing-value',
] as const;

export type DeckPilotDimensionId = (typeof DECKPILOT_SCORE_DIMENSION_IDS)[number];

export type DeckPilotScoreRubricDimension = {
  id: DeckPilotDimensionId;
  label: string;
  weight: number;
};

/** Weights 20, 18, 15, 15, 12, 8, 7, 5 (sum 100). */
export const DECKPILOT_SCORE_RUBRIC: readonly DeckPilotScoreRubricDimension[] = [
  { id: 'slide-quality-design', label: 'Slide Quality & Design Coherence', weight: 20 },
  { id: 'editing-control-flexibility', label: 'Editing Control & Flexibility', weight: 18 },
  { id: 'workflow-speed-ux', label: 'Workflow Speed & UX', weight: 15 },
  { id: 'export-ownership', label: 'Export & Ownership', weight: 15 },
  { id: 'templates-brand-controls', label: 'Templates & Brand Controls', weight: 12 },
  { id: 'collaboration-team-features', label: 'Collaboration & Team Features', weight: 8 },
  { id: 'integrations-input-options', label: 'Integrations & Input Options', weight: 7 },
  { id: 'pricing-value', label: 'Pricing & Value', weight: 5 },
];

/** Per-dimension scores keyed by dimension id. Each value 0–10. */
export type DimensionScores = Partial<Record<DeckPilotDimensionId, number>>;

/** Stored score object on a tool: overall (1 decimal), optional dimensions, optional Value Pick. */
export type DeckPilotScoreData = {
  overall: number;
  dimensions?: DimensionScores;
  valuePick?: boolean;
};

/**
 * Computes overall DeckPilot Score from dimension scores (weighted average, 1 decimal).
 * Only dimensions present in both rubric and dimensions are included; weights of
 * included dimensions are renormalized. If no dimensions are valid, returns 0.
 *
 * Formula: overall = round( sum(dimensionScore[id] * weight[id]) / sum(weight[id]) , 1 )
 * Weights: 20, 18, 15, 15, 12, 8, 7, 5 (slide-quality-design … pricing-value).
 */
export const computeOverallScore = (dimensions: DimensionScores): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const d of DECKPILOT_SCORE_RUBRIC) {
    const v = dimensions[d.id];
    if (v != null && typeof v === 'number' && v >= 0 && v <= 10) {
      weightedSum += v * d.weight;
      totalWeight += d.weight;
    }
  }
  if (totalWeight === 0) return 0;
  return Math.round((weightedSum / totalWeight) * 10) / 10;
};

/** Dimension id for Pricing & Value (last in rubric). */
const PRICING_VALUE_ID: DeckPilotDimensionId = 'pricing-value';

/** Core dimensions = all except Pricing & Value (used for Value Pick rule). */
const CORE_DIMENSION_IDS = DECKPILOT_SCORE_DIMENSION_IDS.filter((id) => id !== PRICING_VALUE_ID);

/**
 * Value Pick rule: Pricing & Value ≥ 8 and at least two core dimensions ≥ 8.
 * Core dimensions are the first seven (Slide Quality … Integrations & Input Options).
 * Documented so curators can recompute when editing dimension scores.
 */
export const computeValuePick = (dimensions: DimensionScores): boolean => {
  const pricing = dimensions[PRICING_VALUE_ID];
  if (pricing == null || typeof pricing !== 'number' || pricing < 8) return false;
  const coreAtLeast8 = CORE_DIMENSION_IDS.filter((id) => {
    const v = dimensions[id];
    return v != null && v >= 8;
  }).length;
  return coreAtLeast8 >= 2;
};

/**
 * Builds full DeckPilotScoreData from dimension scores: computes overall (1 decimal)
 * and Value Pick, for use when curating tool data. Re-run after editing dimensions.
 */
export const computeDeckPilotScoreData = (dimensions: DimensionScores): DeckPilotScoreData => ({
  overall: computeOverallScore(dimensions),
  dimensions,
  valuePick: computeValuePick(dimensions),
});
