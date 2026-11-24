# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Applicants (primary):** people in Thailand who might enter the hackathon: students, physicians and health professionals, researchers, engineers, designers, policymakers, entrepreneurs and faculty members. They apply as a team of 3–5 or as individuals (a team-matching session is provided). No prior idea, company, prototype or programming skill is required. They come to the page to decide whether to apply, check eligibility, dates and cost, and later to apply.
- **Foreign applicants living in Thailand:** read the English page (`/en/`) and apply through the same Thailand Hub.
- **Harvard HSIL and partners:** the Harvard team, other Hubs and partner organizations, who check what the Thailand Hub is and how it runs. They read the English page.
- **Sponsors and media, Thai and international:** judge whether the event is credible and worth backing or covering. International readers use `/en/`.

## Product Purpose

The official website of the Thailand Hub of the Harvard Health Systems Innovation Lab (HSIL) Hackathon 2027, organized by Mahidol University: a two-day health systems innovation competition on AI, 9–10 April 2027 in Bangkok. Winning teams continue into Harvard's online Bootcamps and Venture Building program, with Demo Day in Boston for finalists.

Success has two equal parts:
1. Enough qualified applicants once applications open (December 2026 to mid-February 2027). Until then the page builds awareness, and every CTA reads "Coming Soon".
2. Credibility with sponsors, partners and media: the page must read as an official university programme run with Harvard HSIL.

## Positioning

The only official Thailand Hub of the global HSIL Hackathon: the 8th global edition and the 2nd in Thailand, run by Mahidol University. Local winners have a selection-based path to Harvard's Bootcamps and Demo Day at Boston AI Week. It is free, takes no equity, and HSIL claims no intellectual property.

## Operating Context

- Applicants find the page through university channels and press, and read it mostly on phones; the page must work from 360px to 1440px+.
- Registration is a two-state switch in `js/main.js` (`REGISTRATION_OPEN`, `APPLY_URL`): closed shows "Coming Soon" with no link, open turns the CTAs into links to the external application form.
- The schedule follows Harvard HSIL's announcement; the page marks the current stage from today's date.

## Capabilities and Constraints

- Static HTML, no framework, no runtime dependencies, deployed on Vercel. Sass is the only dev dependency, and the compiled CSS is committed so the site runs without a build. Every section must work without JavaScript; JS is progressive enhancement only.
- Bilingual: Thai is primary at `/`, English at `/en/`. Both are full static pages, and JS takes its runtime strings from `<html lang>`. Every copy change must be made in both.
- `v2/` (with `v2/en/`) is an alternative design kept for comparison and shares the same copy.
- Content in `[square brackets]` is a placeholder; unconfirmed facts carry `data-mock`. Never invent values for either.
- Harvard names and marks are used under the Collaborative Hub agreement; the Harvard logo still needs official approval or an HSIL-supplied file.
- Open: application URL, 2027 sponsors, the 2027 venue ("รอประกาศ" / "To be announced"), and confirmation of the hospital challenges.

## Brand Commitments

- Name: "Mahidol x Harvard Hackathon 2027 — Official Thailand Hub". Mahidol leads as organizer; Harvard HSIL appears as the global partner.
- Thai voice: the register of an official university announcement. Full sentences, ผู้สมัคร/ผู้เข้าแข่งขัน rather than คุณ/เรา, full month names, and the Buddhist year with the Gregorian year in brackets. English keeps the same formal register and uses Gregorian dates only.
- The client artwork in `assets/aw/` is the visual reference for the main design.
- Official logos in `assets/logos/` are used unedited.

## Evidence on Hand

- Real: 2026 network figures (58 Hubs, 41 countries, 12,780 participants), 2026 prize total of 200,000 THB (100,000 / 60,000 / 40,000), 2026 results (41 ideas, 166 participants, 1 team to Harvard's Bootcamp), the 2026 winning teams (VALVE, AIVA CARE, Emily in Boston) and event photos (`assets/2026/`), the 2026 co-organisers and sponsors (`assets/logos/sponsors-2026/`), the coordinator's contact details, the 2027 criteria and quick facts (age 18–88 by Mahidol Hub criteria, pitch in English, prize split 100,000 / 60,000 / 40,000), the 2026 venue and date, press coverage (Thansettakij, Naewna, Thailand.go.th, Manager Online), the NIA strategic partnership, and Harvard's published 2027 schedule.
- Mock, awaiting confirmation (marked `data-mock`): hospital challenges.
- Absent and not to be fabricated: 2027 sponsors, testimonials, names of the 2026 special-award teams.

## Product Principles

1. The official record comes first. Every fact must be verifiable or marked as pending; credibility is half of success.
2. Mahidol leads, Harvard backs it. The hierarchy between organizer and global partner never flips.
3. Thai and English are equal citizens. Both languages get the same content, structure and quality.
4. It works for everyone, everywhere: phones first, no JavaScript required, WCAG 2.2 AA.
5. The path is honest: the page makes clear that Boston is reached by selection, not guaranteed by a local win, and that travel is self-funded.

## Accessibility & Inclusion

WCAG 2.2 AA across both languages and both designs. That covers text contrast on the dark bands and over the artwork, tap targets of at least `var(--tap)`, a visible focus ring on every ground, a pausable ticker that honours reduced motion, and figures that stay readable to screen readers while they animate.
