/**
 * Central affiliate link mapping.
 * Content references affiliateKey (e.g. aippt); components resolve the URL from here.
 */

export type AffiliateEntry = {
  url: string;
  network: string;
  note?: string;
};

export const affiliates: Record<string, AffiliateEntry> = {
  aippt: {
    url: 'https://example.com/track/aippt',
    network: 'Impact',
    note: 'Primary CTA link',
  },
} as const;

export const getAffiliateUrl = (affiliateKey: string): string | undefined =>
  affiliates[affiliateKey]?.url;

/**
 * Resolve CTA href: use affiliate URL if present, otherwise fall back to tool website.
 */
export const resolveCtaHref = (
  affiliateKey: string,
  fallbackUrl: string
): string => getAffiliateUrl(affiliateKey) ?? fallbackUrl;
