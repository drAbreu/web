# Content & Publishing Guide

A reference for adding new chapters, posts, and connecting the newsletter.
Last updated: April 2026.

---

## Site Structure

```
src/
  content/
    permafrost/   ← Interstellar Permafrost chapters (EN + ES)
    blog/         ← General blog posts (hidden from nav, still accessible)
    projects/     ← Project write-ups (hidden from nav)
  app/
    permafrost/   ← Permafrost pages & CSS
    morgenrot/    ← Morgenrot pages & CSS
    about/        ← About page
    page.tsx      ← Home (dark entry page)
```

---

## Adding a New Permafrost Chapter

### 1. Create the English file

Create `src/content/permafrost/02-your-chapter-title.mdx`

Use this frontmatter template:

```mdx
---
title: "Your Chapter Title"
description: "One sentence teaser shown on the chapter list."
date: "2026-05-15"
author: "Jorge Abreu-Vicente"
category: "Permafrost"
tags: ["permafrost", "chapter-2", "sci-fi"]
featured: false
lang: "en"
---

Chapter text goes here in standard Markdown.

Use **bold**, *italic*, section breaks with `---`, and `### Date — Location` for scene headers.
```

**Important rules:**
- `lang: "en"` is mandatory — readers see only posts matching their selected language
- `date` controls the reading order (sorted oldest → newest in the chapter list)
- `slug` is inferred from the filename (`02-your-chapter-title` → `/permafrost/02-your-chapter-title`)
- Number your files (`01-`, `02-`, etc.) to keep them ordered in the filesystem

### 2. Create the Spanish file

Create `src/content/permafrost/02-tu-titulo-de-capitulo-es.mdx`

```mdx
---
title: "Tu Título de Capítulo"
description: "Una frase de presentación que aparece en la lista."
date: "2026-05-15"
author: "Jorge Abreu-Vicente"
category: "Permafrost"
tags: ["permafrost", "capitulo-2", "ciencia-ficcion"]
featured: false
lang: "es"
---

El texto del capítulo aquí.
```

**The Spanish file needs a different filename** (append `-es`) because each language version gets its own URL. Readers switch languages with the EN/ES toggle on the page.

### 3. Deploy

```bash
npm run build   # verify no errors
git add src/content/permafrost/
git commit -m "add: chapter 2 — Your Title (EN + ES)"
git push
```

Vercel will auto-deploy. The chapter appears immediately on the live site.

---

## Adding a New Morgenrot Post

Morgenrot posts live in `src/content/blog/` (the same directory as general blog posts, distinguished by category/tag).

Create `src/content/blog/morgenrot-your-post-title.mdx`:

```mdx
---
title: "Your Post Title"
description: "One sentence description."
date: "2026-05-15"
author: "Jorge Abreu-Vicente"
category: "Morgenrot"
tags: ["morgenrot", "chapter"]
lang: "en"
---

Post content here.
```

For the Spanish version, create `src/content/blog/morgenrot-tu-titulo-de-post-es.mdx` with `lang: "es"`.

The Morgenrot page picks up posts that have `category: "Morgenrot"` (case-insensitive) or `tags` containing `"morgenrot"`. Both conditions are checked.

---

## Frontmatter Reference

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown as the post/chapter heading |
| `description` | Yes | Shown in cards and list view |
| `date` | Yes | Format: `"YYYY-MM-DD"`. Controls sort order |
| `lang` | Yes | `"en"` or `"es"`. No fallback — missing language = no entry |
| `category` | Yes | `"Permafrost"` or `"Morgenrot"` |
| `tags` | Optional | Array of strings, shown as `#tag` badges |
| `image` | Optional | Path from `/public/`, e.g. `"/blog/my-post/cover.jpg"` |
| `featured` | Optional | `true`/`false`, not currently used in UI |
| `author` | Optional | Defaults shown as metadata |

---

## Connecting the Newsletter

The newsletter form UI is built and working. You just need to wire it to a service.

The component is at `src/components/NewsletterSignup.tsx`, function `handleSubmit`.

### Option A — Buttondown (recommended, simplest)

1. Create account at [buttondown.email](https://buttondown.email)
2. Go to **Settings → API** and copy your username
3. In `NewsletterSignup.tsx`, replace the `handleSubmit` function body:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await fetch(
      "https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME",
      {
        method: "POST",
        body: new URLSearchParams({ email }),
      }
    );
    setStatus("sent");
    setEmail("");
  } catch {
    setStatus("sent"); // still show success to user
  }
};
```

Replace `YOUR_USERNAME` with your Buttondown username.

### Option B — ConvertKit

1. Create account at [convertkit.com](https://convertkit.com)
2. Create a **Form**, copy the **Form ID** (a number like `1234567`)
3. Replace `handleSubmit`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await fetch(
    "https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: "YOUR_PUBLIC_API_KEY",
        email,
      }),
    }
  );
  setStatus("sent");
  setEmail("");
};
```

### Option C — Substack

Substack does not provide an API for external embeds. The simplest path: link the subscribe button to your Substack URL instead of using the form. Replace the form in `NewsletterSignup.tsx` with:

```tsx
<a
  href="https://yourname.substack.com/subscribe"
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  {l.button}
</a>
```

### After connecting

Both Morgenrot and Permafrost use the same `NewsletterSignup` component. Connecting it once connects it everywhere. You can pass a `projectName` prop (already done — `"Morgenrot"` and `"Permafrost"`) to tag subscribers differently if your service supports it.

---

## Language System

The site uses strict language separation — no fallback from Spanish to English.

- Each post/chapter has a `lang: "en"` or `lang: "es"` field
- The page filters posts by the selected language: only `lang === currentLanguage` posts are shown
- If a post has no Spanish version, it simply won't appear in Spanish mode
- Language preference is saved in `localStorage` under the key `"language"`

**This means:** for every English chapter you publish, you should also publish the Spanish version. If you temporarily only have English, the Spanish reader sees an empty list (with the "coming soon" message).

---

## Deployment

The site runs on Vercel with automatic deploys from the `master` branch.

```bash
# Standard content publish flow
git add src/content/
git commit -m "add: chapter title"
git push
# Vercel deploys automatically, usually in ~1 minute
```

To preview locally before pushing:

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # full production build (catches MDX/TypeScript errors)
```

---

## File Naming Conventions

| Content | Pattern | Example |
|---|---|---|
| Permafrost EN | `NN-kebab-title.mdx` | `02-frozen-light.mdx` |
| Permafrost ES | `NN-kebab-title-es.mdx` | `02-luz-congelada-es.mdx` |
| Morgenrot EN | `morgenrot-kebab-title.mdx` | `morgenrot-the-first-step.mdx` |
| Morgenrot ES | `morgenrot-kebab-title-es.mdx` | `morgenrot-el-primer-paso-es.mdx` |

Keep filenames lowercase, no spaces, hyphens only. The filename becomes the URL slug.
