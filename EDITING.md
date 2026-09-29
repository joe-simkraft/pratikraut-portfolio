# Editing this site

All content lives in **`src/config.ts`** and one PDF in **`public/`**. You rarely
need to touch the components.

---

## Update the CV (downloadable PDF)

Replace this one file, keeping the exact name:

```
public/cv.pdf
```

Drop your new résumé in as `cv.pdf` (overwrite the old one). The contact "cv"
link points to `/cv.pdf`, so nothing else needs to change.

---

## Update projects

Edit the `projects` array in [`src/config.ts`](src/config.ts). Each project:

```ts
{
  title: 'Project name',
  year: '2026',
  stack: ['vue', 'typescript', 'rest'], // plain labels shown as chips — any text
  summary: 'One or two sentences on what it does and what was hard about it.',
  live: 'https://example.com',   // optional → shows a "live ↗" link
  source: 'https://github.com/…', // optional → shows a "source ↗" link
}
```

- **Add** a project: add another `{ … }` to the array.
- **Remove** one: delete its `{ … }`.
- Even numbers look best — projects lay out in two columns on wide screens.

---

## Update skills

Edit the `skills` array in `src/config.ts`. It's grouped by category:

```ts
{
  label: 'backend',
  items: [
    { name: 'java', icon: 'java' },
    { name: 'node', icon: 'node' },
  ],
}
```

- `name` is the visible text.
- `icon` must be a key that exists in [`src/lib/skillIcons.ts`](src/lib/skillIcons.ts).
- **New tech with no icon yet?** Add a mark to `skillIcons.ts`:
  ```ts
  myTech: {
    title: 'My Tech',
    color: '#RRGGBB',              // brand colour (revealed on hover)
    path: '<single SVG path data>', // 24×24 viewBox; grab from simpleicons.org
  },
  ```
  then reference it as `{ name: 'my tech', icon: 'myTech' }`.

---

## Update about / contact / title

Still in `src/config.ts`:

- `about` — the array of paragraphs.
- `contact.emails` — one or more email addresses (each becomes a mail link).
- `contact.links` — github / linkedin / cv, etc. (`href` is the URL).
- `site.role` and `site.tagline` — the hero subtitle and blurb.

The page `<title>` and social-share text are in [`index.html`](index.html).

---

## Preview and deploy

```bash
npm run dev      # local preview at the printed URL
npm run build    # produces dist/ — deploy that folder to your host
npm run typecheck # optional: catch mistakes before building
```
