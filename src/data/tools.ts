/**
 * Typed tool catalog for DeckPilot.
 * Use `key` as the join key with content (e.g. review's toolName / affiliateKey).
 */

import { computeDeckPilotScoreData, type DeckPilotScoreData } from './deckpilot-score.js';

export type Tool = {
  key: string;
  name: string;
  website: string;
  pricingText: string;
  shortDesc: string;
  categoryKeys: string[];
  logo?: string;
  screenshot?: string;
  tags?: string[];
  deckpilotScore?: DeckPilotScoreData;
};

export const tools: Tool[] = [
  {
    key: 'aippt',
    name: 'AiPPT',
    website: 'https://aippt.com',
    pricingText: 'Freemium, Pro from $12/mo',
    shortDesc: 'AI-powered pitch decks in minutes.',
    categoryKeys: ['ai-presentation-tools'],
    tags: ['pitch deck', 'startup'],
    deckpilotScore: computeDeckPilotScoreData({
      'slide-quality-design': 8,
      'editing-control-flexibility': 8,
      'workflow-speed-ux': 7.5,
      'export-ownership': 7,
      'templates-brand-controls': 8,
      'collaboration-team-features': 6.5,
      'integrations-input-options': 7,
      'pricing-value': 8.5,
    }),
  },
  {
    key: 'gamma',
    name: 'Gamma',
    website: 'https://gamma.app',
    pricingText: 'Free tier, Pro from $8/mo',
    shortDesc: 'Create presentations and docs with AI.',
    categoryKeys: ['ai-presentation-tools'],
    tags: ['presentations', 'collaboration'],
    deckpilotScore: computeDeckPilotScoreData({
      'slide-quality-design': 8.5,
      'editing-control-flexibility': 8,
      'workflow-speed-ux': 9,
      'export-ownership': 7.5,
      'templates-brand-controls': 8.5,
      'collaboration-team-features': 8.5,
      'integrations-input-options': 8,
      'pricing-value': 8,
    }),
  },
  {
    key: 'beautiful-ai',
    name: 'Beautiful.ai',
    website: 'https://www.beautiful.ai',
    pricingText: 'From $12/mo',
    shortDesc: 'Smart templates that design themselves.',
    categoryKeys: ['ai-presentation-tools'],
    tags: ['templates', 'design'],
    deckpilotScore: computeDeckPilotScoreData({
      'slide-quality-design': 8.5,
      'editing-control-flexibility': 7,
      'workflow-speed-ux': 8,
      'export-ownership': 7,
      'templates-brand-controls': 8.5,
      'collaboration-team-features': 7.5,
      'integrations-input-options': 6.5,
      'pricing-value': 7.5,
    }),
  },
  {
    key: 'tome',
    name: 'Tome',
    website: 'https://tome.app',
    pricingText: 'Free tier, paid plans available',
    shortDesc: 'AI-generated narratives and presentations.',
    categoryKeys: ['ai-presentation-tools'],
    tags: ['storytelling', 'presentations'],
    deckpilotScore: computeDeckPilotScoreData({
      'slide-quality-design': 8,
      'editing-control-flexibility': 7,
      'workflow-speed-ux': 8,
      'export-ownership': 7,
      'templates-brand-controls': 7.5,
      'collaboration-team-features': 7,
      'integrations-input-options': 6.5,
      'pricing-value': 8,
    }),
  },
  {
    key: 'canva',
    name: 'Canva',
    website: 'https://www.canva.com',
    pricingText: 'Free tier, Pro from $15/mo',
    shortDesc: 'Magic Design for Presentations: AI-generated slide decks from prompts.',
    categoryKeys: ['ai-presentation-tools'],
    tags: ['templates', 'design', 'magic-design'],
    deckpilotScore: computeDeckPilotScoreData({
      'slide-quality-design': 8,
      'editing-control-flexibility': 8,
      'workflow-speed-ux': 8,
      'export-ownership': 8,
      'templates-brand-controls': 9,
      'collaboration-team-features': 8,
      'integrations-input-options': 8.5,
      'pricing-value': 7.5,
    }),
  },
];

const toolsByKey = new Map(tools.map((t) => [t.key, t]));

export const getToolByKey = (key: string): Tool | undefined => toolsByKey.get(key);

export const getToolsByKeys = (keys: string[]): Tool[] =>
  keys.map((k) => toolsByKey.get(k)).filter((t): t is Tool => t != null);
