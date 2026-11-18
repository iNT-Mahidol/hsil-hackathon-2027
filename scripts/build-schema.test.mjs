import { test } from 'node:test';
import assert from 'node:assert/strict';
import { schemaFor, withSchema } from './build-schema.mjs';

const PAGE = `<!doctype html><html><head>
<title>T</title>
<meta name="description" content="Desc">
<link rel="alternate" hreflang="th" href="/">
</head><body>
<h1 id="hero-title"><span>Mahidol x Harvard</span> <span>Hackathon</span> <span class="sr-only">2027</span></h1>
<details class="faq__item"><summary>Is it free?</summary><p>Yes, <span lang="en">no</span> fee.</p></details>
<details class="faq__item"><summary>Minimum age?</summary><p data-mock>15</p></details>
</body></html>`;

test('builds Event from h1 and description, FAQ without data-mock answers', () => {
  const [event, faq] = schemaFor(PAGE, 'en')['@graph'];
  assert.equal(event['@type'], 'Event');
  assert.equal(event.name, 'Mahidol x Harvard Hackathon 2027');
  assert.equal(event.description, 'Desc');
  assert.equal(event.startDate, '2027-04-16');
  assert.equal(event.organizer.name, 'Mahidol University');
  assert.deepEqual(faq.mainEntity, [
    { '@type': 'Question', name: 'Is it free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, no fee.' } },
  ]);
});

test('fails loudly without a confirmed FAQ', () => {
  assert.throws(() => schemaFor(PAGE.replace(/<details[\s\S]*?free[\s\S]*?<\/details>/, ''), 'en'), /confirmed FAQ/);
});

test('inserts before hreflang once, then replaces in place', () => {
  const once = withSchema(PAGE, { a: 1 });
  assert.match(once, /<script type="application\/ld\+json">\{"a":1\}<\/script>\n<link rel="alternate"/);
  const twice = withSchema(once, { a: 2 });
  assert.equal((twice.match(/ld\+json/g) ?? []).length, 1);
  assert.match(twice, /\{"a":2\}/);
});

test('escapes < so the JSON cannot close the script element', () => {
  assert.match(withSchema(PAGE, { a: '</script>' }), /"\\u003c\/script>"/);
});

test('leaves out the FAQPage while the FAQ section is hidden', () => {
  const graph = schemaFor(`<section id="faq" hidden class="section">${PAGE}</section>`, 'en')['@graph'];
  assert.deepEqual(graph.map((n) => n['@type']), ['Event']);
});
