// Writes the schema.org JSON-LD (Event + FAQPage) into the <head> of index.html and en/index.html,
// built from the page itself (h1, meta description, FAQ) so it never drifts from the copy.
// FAQ answers marked data-mock (unconfirmed) are left out: search engines and AI answers should only
// quote confirmed facts. The exporter carries the block to meta.php; the theme adds url and image.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = [
  { src: 'index.html', lang: 'th' },
  { src: 'en/index.html', lang: 'en' },
];

// Confirmed event facts (dates also in js/main.js HACKATHON_START_UTC)
const EVENT = { startDate: '2027-04-16', endDate: '2027-04-17' };
const PLACE = { th: 'กรุงเทพมหานคร', en: 'Bangkok' };
const ORGANIZER = {
  th: { name: 'มหาวิทยาลัยมหิดล', alternateName: 'Mahidol University' },
  en: { name: 'Mahidol University', alternateName: 'มหาวิทยาลัยมหิดล' },
};

const LD_JSON = /<script type="application\/ld\+json">[\s\S]*?<\/script>\n/;

const text = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

function faqOf(html) {
  const items = [...html.matchAll(/<details class="faq__item"><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)];
  return items
    .filter(([, , answer]) => !answer.includes('data-mock'))
    .map(([, q, a]) => ({ '@type': 'Question', name: text(q), acceptedAnswer: { '@type': 'Answer', text: text(a) } }));
}

export function schemaFor(html, lang) {
  const name = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  // A hidden FAQ section stays out of the structured data (Google rejects markup for content users can't see).
  const faqHidden = /<section id="faq"[^>]*\bhidden\b/.test(html);
  const faq = faqHidden ? [] : faqOf(html);
  if (!name || !description || (!faqHidden && !faq.length)) throw new Error(`missing h1, description or confirmed FAQ (${lang})`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name,
        description,
        inLanguage: lang,
        ...EVENT,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        location: {
          '@type': 'Place',
          name: PLACE[lang],
          address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
        },
        organizer: { '@type': 'CollegeOrUniversity', ...ORGANIZER[lang], url: 'https://mahidol.ac.th/' },
      },
      ...(faq.length ? [{ '@type': 'FAQPage', inLanguage: lang, mainEntity: faq }] : []),
    ],
  };
}

// Replaces the page's JSON-LD block, or inserts it before the hreflang links. "<" is escaped so the
// JSON can never close the <script> element.
export function withSchema(html, schema) {
  const block = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n`;
  if (LD_JSON.test(html)) return html.replace(LD_JSON, block);
  const at = html.indexOf('<link rel="alternate"');
  if (at < 0) throw new Error('no <link rel="alternate"> to insert the JSON-LD before');
  return html.slice(0, at) + block + html.slice(at);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const { src, lang } of PAGES) {
    const file = join(ROOT, src);
    const html = readFileSync(file, 'utf8');
    writeFileSync(file, withSchema(html, schemaFor(html, lang)));
  }
  console.log('JSON-LD written to index.html and en/index.html');
}
