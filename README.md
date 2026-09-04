# pratikraut.in — portfolio

Wireframe 02, built. A single-page portfolio where each section arrives
scrambled and decrypts as it scrolls into view, with a progress rail tracking
how much of the page has resolved.

Sections, in order: intro, selected work, **skills**, about, contact.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the built output
```

Requires Node 20.19+ or 22.12+. No runtime dependencies beyond Vue — 30 kB
gzipped JS, one request, no images.

## Filling it in

All content is in `src/config.ts`, and it's the only file you need to touch:

| Export | What it is |
| --- | --- |
| `site` | Domain, name, role, tagline. |
| `outline` | Section ids and rail labels. Reorder here and the rail follows. |
| `projects` | Title, year, stack, summary, live/source links. |
| `skills` | Groups of related skills — the labels become the left column. |
| `about` | An array of paragraphs. |
| `contact` | Email plus the links row. |

Two things worth knowing when you write the copy. Keep project summaries about
the same length: uneven blocks make the staggered resolve look accidental
rather than designed. And keep skill items short — they're pill-shaped, and a
long one wraps awkwardly.

## The design problem, and how it's handled

This layout has one real risk, which I flagged when you picked it: text hidden
behind an interaction is text that might never be read. Four decisions address
that directly, and they're the parts most worth understanding before you change
anything.

**Nothing ever re-scrambles.** `useReveal` is a one-shot observer that
disconnects after firing. Scroll back up and everything you've already read
stays readable. Re-hiding content on scroll-up is the fastest way to make this
effect infuriating.

**Body copy resolves fast, headings resolve slowly.** The stagger is per
character, so a long paragraph would take many seconds at heading speed. About
and project text use a 4–5 ms stagger and a short hold, landing in well under a
second — the scramble reads as a flicker rather than an obstacle. Headings and
the email use a 30 ms stagger where the effect is the point. If you speed up
`stagger` on body copy, you make it more readable; slowing it down is where it
starts to hurt.

**There's an escape hatch.** The rail has a `decrypt all` control that resolves
everything at once and stays off for the rest of the visit. Anyone who finds it
tiresome can opt out in one click.

**Reduced motion skips it entirely.** With `prefers-reduced-motion: reduce`,
the scramble never runs, the chromatic layers are removed, and the ticker is
never started. A real branch, not a CSS override.

### Accessibility and crawlers

Scrambled glyphs would index as junk and read as noise, so while a string is
animating it's `aria-hidden` with a visually hidden companion carrying the real
text. Once resolved, the glyphs *are* the real text, so the companion is
dropped and the string appears in the DOM exactly once — the first version of
this duplicated every line, which a test caught.

Because `useReveal` fails open when `IntersectionObserver` is missing, a
crawler or an old browser gets the entire page as plain text immediately.
Nothing is gated behind JavaScript-driven scroll.

Also: a skip link, labelled sections and landmarks, `aria-label` on every rail
jump link, visible focus rings throughout, and `rel="noopener"` on external
links.

## Layout

```
src/
├─ config.ts                  all content and the page outline
├─ types.ts
├─ lib/
│  ├─ scramble.ts             pure frameAt / duration, plus a grapheme cache
│  ├─ ticker.ts               one shared rAF loop for the whole page
│  └─ motion.ts               reduced-motion check, safe without matchMedia
├─ composables/
│  ├─ decryptContext.ts       section registry + progress, via provide/inject
│  ├─ useReveal.ts            one-shot IntersectionObserver
│  └─ useDecrypt.ts           binds a string to the ticker, resolves on active
├─ components/
│  ├─ ProgressRail.vue        dots, percentage, jump nav, decrypt-all
│  ├─ SectionShell.vue        observes, reports, provides `revealed` to slot
│  ├─ GlitchTitle.vue         the hero, re-glitches on a loop
│  ├─ DecryptText.vue         every other scrambling string
│  ├─ HeroSection.vue / WorkSection.vue / SkillsSection.vue
│  ├─ AboutSection.vue / ContactSection.vue
│  └─ ScreenOverlay.vue       scanlines and vignette
└─ assets/styles.css          design tokens
```

The animation core is a pure function of `(text, elapsedMs)` with no internal
state or randomness — glyphs come from a hash of `(characterIndex, tick)`. Every
scrambling element runs off one shared `requestAnimationFrame` loop that stops
itself when the last subscriber finishes, so a fully decrypted page does no work
per frame. Paragraph-length strings are grapheme-split once and cached, since
otherwise every frame re-splits every block.

## Deploying

Static output in `dist/`. On Vercel, Netlify or Cloudflare Pages: build command
`npm run build`, output directory `dist`. For any other host, upload the
contents of `dist/`.

Drop your CV at `public/cv.pdf` — the contact row links to `/cv.pdf` already.

## A note on the font

The effect needs a monospaced face: with proportional type the line reflows
every frame as glyph widths change and the whole page wobbles. The CSS uses the
system mono stack, so it renders slightly differently per platform. To make it
consistent, self-host one face and put it at the front of `--mono` in
`src/assets/styles.css`.
