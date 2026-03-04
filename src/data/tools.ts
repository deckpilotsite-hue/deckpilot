/**
 * Typed tool catalog for DeckPilot.
 * Use `key` as the join key with content (e.g. review's toolName / affiliateKey).
 */

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
  rating?: number;
};

export const tools: Tool[] = [
  {
    key: 'aippt',
    name: 'AiPPT',
    website: 'https://aippt.com',
    pricingText: 'Freemium, Pro from $12/mo',
    shortDesc: 'AI-powered pitch decks in minutes.',
    categoryKeys: ['ai-presentation-tools'],
    rating: 4.4,
    tags: ['pitch deck', 'startup'],
  },
  {
    key: 'gamma',
    name: 'Gamma',
    website: 'https://gamma.app',
    pricingText: 'Free tier, Pro from $8/mo',
    shortDesc: 'Create presentations and docs with AI.',
    categoryKeys: ['ai-presentation-tools'],
    rating: 4.5,
    tags: ['presentations', 'collaboration'],
  },
  {
    key: 'beautiful-ai',
    name: 'Beautiful.ai',
    website: 'https://www.beautiful.ai',
    pricingText: 'From $12/mo',
    shortDesc: 'Smart templates that design themselves.',
    categoryKeys: ['ai-presentation-tools'],
    rating: 4.2,
    tags: ['templates', 'design'],
  },
  {
    key: 'tome',
    name: 'Tome',
    website: 'https://tome.app',
    pricingText: 'Free tier, paid plans available',
    shortDesc: 'AI-generated narratives and presentations.',
    categoryKeys: ['ai-presentation-tools'],
    rating: 4.3,
    tags: ['storytelling', 'presentations'],
  },
];

const toolsByKey = new Map(tools.map((t) => [t.key, t]));

export const getToolByKey = (key: string): Tool | undefined => toolsByKey.get(key);

export const getToolsByKeys = (keys: string[]): Tool[] =>
  keys.map((k) => toolsByKey.get(k)).filter((t): t is Tool => t != null);
