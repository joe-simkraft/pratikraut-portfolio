import type { Project, SkillGroup, ContactLink, SectionOutline } from './types'

/**
 * The page outline, declared up front.
 *
 * The progress rail reads this directly rather than waiting for each section
 * to register itself on mount — otherwise the rail renders an empty outline on
 * first paint and fills in a frame later.
 */
export const outline: readonly SectionOutline[] = [
  { id: 'top', label: 'intro' },
  { id: 'work', label: 'selected work' },
  { id: 'skills', label: 'skills' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' },
]

export const site = {
  domain: 'pratikraut.in',
  owner: 'Pratik Raut',
  role: 'software engineer',
  tagline:
    'I build web applications and the tooling around them. Mostly TypeScript and Go, mostly the parts other people would rather not maintain.',

  /** How long the hero title holds before it re-glitches, ms. */
  titleHold: 6000,
} as const

export const projects: readonly Project[] = [
  {
    title: 'Project one',
    year: '2026',
    stack: ['vue', 'typescript', 'postgres'],
    summary:
      'Replace with a sentence or two on what the project does and what was hard about it. Two lines is plenty — the detail belongs in the repo.',
    live: 'https://example.com',
    source: 'https://github.com/',
  },
  {
    title: 'Project two',
    year: '2025',
    stack: ['go', 'redis', 'docker'],
    summary:
      'What it does, who it was for, and the one technical decision you would defend in an interview.',
    source: 'https://github.com/',
  },
  {
    title: 'Project three',
    year: '2025',
    stack: ['react', 'node', 'aws'],
    summary:
      'Keep these summaries the same rough length. Uneven blocks make the decrypt animation look accidental rather than designed.',
    live: 'https://example.com',
  },
  {
    title: 'Project four',
    year: '2024',
    stack: ['python', 'sqlite'],
    summary:
      'Older work still worth showing. If you cannot say something specific about it, cut it.',
    source: 'https://github.com/',
  },
]

/**
 * Skills, grouped by category — the category is named once on the left of a
 * row rather than repeated on every card.
 *
 * `icon` must name an entry in `lib/skillIcons`. The card takes its hover
 * colour from that mark, so the brand colour lives in exactly one place.
 */
export const skills: readonly SkillGroup[] = [
  {
    label: 'languages',
    items: [
      { name: 'typescript', icon: 'typescript' },
      { name: 'javascript', icon: 'javascript' },
    ],
  },
  {
    label: 'frontend',
    items: [
      { name: 'vue', icon: 'vue' },
      { name: 'react', icon: 'react' },
    ],
  },
  {
    label: 'mobile',
    items: [{ name: 'flutter', icon: 'flutter' }],
  },
  {
    label: 'backend',
    items: [{ name: 'node', icon: 'node' }],
  },
  {
    label: 'infrastructure',
    items: [
      { name: 'docker', icon: 'docker' },
      { name: 'aws', icon: 'aws' },
      { name: 'ci/cd', icon: 'cicd' },
    ],
  },
]

export const about: readonly string[] = [
  'Replace this with two or three short paragraphs. What you work on, how you got here, what kind of problem you want next. Written plainly — this section is the one people actually read.',
  'A second paragraph on how you work. Whether you like owning a system end to end, whether you prefer small teams, what you are learning at the moment.',
  'A third, shorter one. Something human: what you do away from a keyboard. It is the only part of the page nobody else could have written.',
]

export const contact = {
  email: 'hello@pratikraut.in',
  links: [
    { label: 'github', href: 'https://github.com/' },
    { label: 'linkedin', href: 'https://linkedin.com/in/' },
    { label: 'cv', href: '/cv.pdf' },
  ] as const satisfies readonly ContactLink[],
} as const
