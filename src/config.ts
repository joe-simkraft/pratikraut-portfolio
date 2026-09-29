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
  role: 'full stack developer',
  tagline:
    'I build scalable web and mobile applications and the tooling around them — Java and Spring Boot on the back end, Vue, React and Flutter on the front, shipped on AWS.',

  /** How long the hero title holds before it re-glitches, ms. */
  titleHold: 6000,
} as const

/**
 * Selected work, from the resume. Years are best-effort estimates within the
 * Simkraft tenure (2021–present) — adjust as needed.
 */
export const projects: readonly Project[] = [
  {
    title: 'Creato',
    year: '2026',
    stack: ['vue', 'typescript', 'ci/cd'],
    summary:
      'Frontend team lead on a platform for managing client deliverables and creative workflows. Built the Vue 3 (TypeScript) UI, TUS resumable uploads and Calendly integration, and supported the Java deployment.',
  },
  {
    title: 'Sports Management App',
    year: '2024',
    stack: ['react', 'typescript', 'redux', 'rest'],
    summary:
      'A React app for running state-level sports events across age groups — athlete registration, event scheduling and result tracking, built on reusable components with REST integration and considered state management.',
  },
  {
    title: 'FTP Automation',
    year: '2025',
    stack: ['vue', 'typescript'],
    summary:
      'A Vue 3 interface that streamlines FTP file-transfer operations, giving users a responsive, intuitive way to manage transfers end to end.',
  },
  {
    title: 'StyleRent',
    year: '2022',
    stack: ['flutter', 'dart', 'rest'],
    summary:
      'A Flutter app for renting fashion items — connecting people with clothing and accessories to promote sustainable, rental-first fashion, backed by REST APIs.',
  },
  {
    title: 'NFC Business Cards',
    year: '2023',
    stack: ['flutter', 'dart'],
    summary:
      'A Flutter app to create and customise digital business cards and share them with others over NFC.',
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
    label: 'frontend',
    items: [
      { name: 'vue', icon: 'vue' },
      { name: 'react', icon: 'react' },
      { name: 'typescript', icon: 'typescript' },
      { name: 'javascript', icon: 'javascript' },
      { name: 'html5', icon: 'html5' },
      { name: 'css3', icon: 'css' },
    ],
  },
  {
    label: 'backend',
    items: [
      { name: 'java', icon: 'java' },
      { name: 'spring boot', icon: 'springboot' },
      { name: 'node', icon: 'node' },
      { name: 'express', icon: 'express' },
    ],
  },
  {
    label: 'mobile',
    items: [
      { name: 'flutter', icon: 'flutter' },
      { name: 'dart', icon: 'dart' },
    ],
  },
  {
    label: 'database',
    items: [{ name: 'mongodb', icon: 'mongodb' }],
  },
  {
    label: 'cloud & devops',
    items: [
      { name: 'aws', icon: 'aws' },
      { name: 'ci/cd', icon: 'cicd' },
      { name: 'git', icon: 'git' },
      { name: 'github', icon: 'github' },
    ],
  },
]

export const about: readonly string[] = [
  "I'm a full stack developer with 4+ years at Simkraft Digital Tech in Mumbai, building scalable web and mobile applications with Java, Spring Boot, React, Vue and Flutter — and deploying them on AWS.",
  "I like owning the frontend end to end: designing responsive, user-centric interfaces, wiring up REST APIs, and keeping code quality high through reviews and sensible standards. Lately I've led frontend initiatives and shipped production features in agile teams.",
  "I'm drawn to the parts of a system other people would rather not maintain — deployment, tooling, the glue that holds things together. I hold a B.E. in Information Technology from PVPPCOE, Mumbai.",
]

export const contact = {
  emails: ['pratiikraut@gmail.com', 'hello@pratikraut.in'] as const,
  links: [
    { label: 'github', href: 'https://github.com/pratikraut' },
    { label: 'linkedin', href: 'https://linkedin.com/in/pratikgraut' },
    { label: 'cv', href: '/cv.pdf' },
  ] as const satisfies readonly ContactLink[],
} as const
