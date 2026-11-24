import type { CmsDoc } from '@/lib/cms/shared';
import { tr } from '@/lib/cms/siteContent';
import type { Story, StoryRow } from './StoryCard';

type Labels = { client: string; challenge: string; whatWeDid: string; outcome: string };

/**
 * Our Work projects from the admin portal (Firestore `ourWork`) -> page cards.
 * challenge / whatWeDid / outcome / storyLink are optional: cards without them show the short description.
 */
export function storiesFromDocs(docs: CmsDoc[], locale: string, labels: Labels): Story[] {
  return docs.map(({ id, data: d }) => {
    const text = (key: string) => tr(d, key, locale);
    const detail: StoryRow[] = [
      { label: labels.challenge, text: text('challenge') },
      { label: labels.whatWeDid, text: text('whatWeDid') },
      { label: labels.outcome, text: text('outcome'), highlight: true },
    ].filter((row) => row.text);
    const rows: StoryRow[] = [
      { label: labels.client, text: text('client') },
      ...(detail.length ? detail : [{ text: text('description') }]),
    ].filter((row) => row.text);
    const link = typeof d.storyLink === 'string' ? d.storyLink.trim() : '';
    return {
      id,
      categoryKey: /epm/i.test(String(d.industry ?? '')) ? 'epm' : 'other',
      industry: text('industry'),
      badge: text('badge') || undefined,
      companyName: text('title'),
      image: (locale === 'ar' && d.imageSrcAr) || d.imageSrc || '/sst1.jpg',
      // Site paths get the locale prefix; only full https links are allowed otherwise
      storyLink: link.startsWith('/') ? `/${locale}${link}` : /^https:\/\//.test(link) ? link : undefined,
      rows,
    };
  });
}
