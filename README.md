# DATASTAR 🌟

Professional portfolio website for **Dr. Jorge Abreu-Vicente, PhD** - Astrophysicist turned AI/ML researcher specializing in biomedical sciences, knowledge graphs, and open science.

**🌐 Live Site:** [datastar.space](https://datastar.space)

---

## 🎨 Features

- ✨ **Twilight Theme** - Astronomy-inspired color palette (navy, purple, coral, gold)
- 🌍 **Bilingual** - Full English and Spanish translations
- 🌠 **Interactive CV** - Spotlight cursor effect with smooth navigation
- 🚀 **Project Showcase** - Animated cards highlighting key research
- 📱 **Responsive** - Mobile-first design with hamburger navigation
- ⚡ **Performance** - Static export for blazing-fast load times
- 🔄 **Auto-Deploy** - GitHub Actions CI/CD pipeline

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages + GitHub Actions
- **Domain:** datastar.space
- **Font:** Inter (Google Fonts)

---

## 📂 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Home page
│   │   ├── cv/
│   │   │   └── page.tsx       # CV page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── ui/
│   │       ├── gradient-button.tsx
│   │       └── spotlight-cursor.tsx
│   ├── lib/
│   │   ├── i18n.ts            # Internationalization
│   │   └── utils.ts           # Utilities
│   └── locales/
│       ├── en.ts              # English translations
│       ├── es.ts              # Spanish translations
│       ├── cv-en.ts           # CV English
│       └── cv-es.ts           # CV Spanish
├── public/                     # Static assets
├── _imgs/                      # Working images
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── CNAME                       # Custom domain
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/drAbreu/web.git
cd web

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

---

## ✏️ Making Changes

### 1. **Edit Content**

#### Update Home Page
```bash
# Edit home page content
vim src/app/page.tsx

# Update translations
vim src/locales/en.ts
vim src/locales/es.ts
```

#### Update CV Page
```bash
# Edit CV content
vim src/app/cv/page.tsx

# Update CV translations
vim src/locales/cv-en.ts
vim src/locales/cv-es.ts
```

#### Update Navbar
```bash
# Edit navigation
vim src/components/Navbar.tsx
```

### 2. **Edit Styles**

#### Global Styles
```bash
vim src/app/globals.css
```

#### Tailwind Configuration
```bash
vim tailwind.config.ts
```

#### Color Palette
The twilight color palette is defined in:
- `src/app/globals.css` (CSS variables)
- `tailwind.config.ts` (Tailwind colors)

**Colors:**
- Navy: `#1a2845`
- Purple: `#4a3a5a`
- Burgundy: `#8b4560`
- Coral: `#c97870` (primary accent)
- Orange: `#f4a566` (secondary accent)
- Gold: `#ffc488` (highlights)

### 3. **Add New Pages**

```bash
# Create new page directory
mkdir -p src/app/new-page

# Create page file
vim src/app/new-page/page.tsx
```

Example page:
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen bg-black">
      <h1 className="text-4xl text-white">New Page</h1>
    </div>
  )
}
```

### 4. **Add Images**

```bash
# Add images to public folder
cp your-image.jpg public/

# Use in components
<Image 
  src="/your-image.jpg" 
  alt="Description"
  width={800}
  height={600}
/>
```

---

## 📝 Adding Content

### Creating a New Project

Projects are stored as MDX files in `src/content/projects/`. Each project can have English and Spanish versions.

#### 1. **Create Project File**

Create a new `.mdx` file for your project:

```bash
# For English version
vim src/content/projects/my-project.mdx

# For Spanish version (optional)
vim src/content/projects/my-project-es.mdx
```

#### 2. **Add Project Frontmatter**

Each project file must include frontmatter with the following fields:

```yaml
---
title: "Project Title"
subtitle: "Optional subtitle for the project"
description: "Brief description that appears on project cards"
date: "2024-03-15"
category: "AI/ML"  # or "Astrophysics", "Research", etc.
tags: ["AI/ML", "Python", "Research"]
featured: true  # Set to true to show on homepage
image: "/projects/my-project.jpg"  # Path to project image
link: "https://github.com/username/project"  # External link (optional)
color: "coral"  # Card color: coral, orange, gold, burgundy, or purple
icon: "computer"  # Icon type: computer, document, chart, or code
order: 1  # Display order (lower numbers appear first)
lang: "en"  # Language: "en" or "es"
---

# Project Title

## Overview

Your project content here in Markdown/MDX format...

## Features

- Feature 1
- Feature 2

## Technologies

List of technologies used...
```

#### 3. **Add Project Image**

Add your project image to the `public/projects/` directory:

```bash
# Create projects directory if it doesn't exist
mkdir -p public/projects

# Add your image (recommended: 800x450px or 16:9 aspect ratio)
cp my-project-image.jpg public/projects/my-project.jpg
```

The image will automatically appear:
- On the project card in the projects list
- At the top of the project detail page

#### 4. **Set as Featured Project**

To show a project on the homepage:

1. Set `featured: true` in the frontmatter
2. Set `order: 1` (or another number) to control position
3. Only projects with `featured: true` appear on the homepage
4. Lower `order` numbers appear first

**Example:**
```yaml
featured: true
order: 1  # This will be the first featured project
```

**Homepage Display:**
- Maximum 5 featured projects recommended
- Projects are sorted by the `order` field
- All projects (featured or not) appear on `/projects` page

### Creating a New Blog Post

Blog posts are stored as MDX files in `src/content/blog/`. Each post can have English and Spanish versions.

#### 1. **Create Blog Post File**

Create a new `.mdx` file for your blog post:

```bash
# For English version
vim src/content/blog/my-post.mdx

# For Spanish version (optional)
vim src/content/blog/my-post-es.mdx
```

#### 2. **Add Blog Post Frontmatter**

Each blog post file must include frontmatter with the following fields:

```yaml
---
title: "Blog Post Title"
description: "Brief description that appears on blog cards and in SEO"
date: "2024-11-15"
author: "Jorge Abreu-Vicente, PhD"
category: "AI/ML"  # Category for filtering
tags: ["AI", "Python", "Tutorial"]  # Tags for the post
featured: false  # Not currently used, but recommended to include
lang: "en"  # Language: "en" or "es"
---

# Blog Post Title

## Section 1

Your blog content here in Markdown/MDX format...

## Section 2

More content...
```

#### 3. **Add Blog Post Image (Optional)**

If you want to add images to your blog post:

```bash
# Add images to public folder
cp blog-image.jpg public/blog/my-image.jpg

# Reference in your MDX content
![Image description](/blog/my-image.jpg)
```

#### 4. **Blog Post Features**

Every blog post automatically includes:
- **Breadcrumb navigation** (Home > Blog > Post Title)
- **Reading time estimate** (calculated from word count)
- **Table of Contents** (auto-generated from H2 headings)
- **Share buttons** (Twitter, LinkedIn, Facebook, Copy Link)
- **Author card** with your photo and social links
- **Category badge** for filtering
- **Tags** for categorization
- **Bilingual support** (English/Spanish)

### Bilingual Content Management

#### Creating Bilingual Projects/Posts

1. **Create both language versions:**
   ```bash
   # English version
   vim src/content/projects/my-project.mdx

   # Spanish version (add -es suffix)
   vim src/content/projects/my-project-es.mdx
   ```

2. **Use the same slug** (filename without extension):
   - English: `my-project.mdx`
   - Spanish: `my-project-es.mdx`

3. **Set language in frontmatter:**
   ```yaml
   # English version
   lang: "en"

   # Spanish version
   lang: "es"
   ```

#### How Language Switching Works

- The system automatically detects available languages
- Users can switch languages via the navbar
- Language preference is saved in localStorage
- If a translation doesn't exist, English version is shown as fallback

### Content Organization

```
src/content/
├── projects/
│   ├── biochatter.mdx          # English project
│   ├── biochatter-es.mdx       # Spanish project
│   ├── knowledge-graphs.mdx
│   └── knowledge-graphs-es.mdx
└── blog/
    ├── my-post.mdx             # English blog post
    ├── my-post-es.mdx          # Spanish blog post
    └── loeb.mdx

public/
├── projects/
│   ├── biochatter.jpg          # Project images (800x450px recommended)
│   └── knowledge-graphs.jpg
├── blog/
│   └── my-image.jpg            # Blog post images
└── author-photo.jpg            # Your author photo (256x256px recommended)
```

### Quick Reference: Required Fields

**Project Frontmatter:**
- ✅ `title` - Project name
- ✅ `description` - Short description
- ✅ `date` - Publication date (YYYY-MM-DD)
- ✅ `category` - Project category
- ✅ `tags` - Array of tags
- ✅ `featured` - Boolean (true/false)
- ✅ `color` - Card color theme
- ✅ `icon` - Icon type
- ✅ `order` - Display order number
- ✅ `lang` - Language code ("en" or "es")
- ⚡ `subtitle` - Optional subtitle
- ⚡ `image` - Optional image path
- ⚡ `link` - Optional external link

**Blog Post Frontmatter:**
- ✅ `title` - Post title
- ✅ `description` - Short description
- ✅ `date` - Publication date (YYYY-MM-DD)
- ✅ `author` - Author name
- ✅ `category` - Post category
- ✅ `tags` - Array of tags
- ✅ `featured` - Boolean (true/false)
- ✅ `lang` - Language code ("en" or "es")

---

## 🚢 Deploying Changes

### Automatic Deployment (Recommended)

Every push to `master` automatically triggers a build and deploy:

```bash
# Make your changes
vim src/app/page.tsx

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Update: description of changes"
git push origin master
```

**That's it!** GitHub Actions will:
1. ✅ Build your Next.js site
2. ✅ Export static files
3. ✅ Deploy to GitHub Pages
4. ✅ Site updates in ~3-5 minutes

### Monitor Deployment

Watch the deployment progress:
- 🔗 **Actions:** [github.com/drAbreu/web/actions](https://github.com/drAbreu/web/actions)
- 🔗 **Deployments:** [github.com/drAbreu/web/deployments](https://github.com/drAbreu/web/deployments)

### Manual Build (Testing Only)

```bash
# Build for production
npm run build

# Output will be in ./out folder
```

---

## 🌍 Internationalization (i18n)

### Adding Translations

1. **Add to locale files:**

```typescript
// src/locales/en.ts
export const en = {
  nav: {
    newLink: "New Link"
  }
}

// src/locales/es.ts
export const es = {
  nav: {
    newLink: "Nuevo Enlace"
  }
}
```

2. **Use in components:**

```typescript
import { useTranslation } from "@/lib/i18n"

export default function Page() {
  const { t } = useTranslation()
  return <a>{t.nav.newLink}</a>
}
```

---

## 🎨 Customizing the Design

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    navy: '#YOUR_COLOR',
    coral: '#YOUR_COLOR',
    // ...
  }
}
```

### Change Font

Edit `src/app/layout.tsx`:

```typescript
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT" />
```

Update `src/app/globals.css`:

```css
body {
  font-family: 'YOUR_FONT', sans-serif;
}
```

### Adjust Spacing

CV page spacing is controlled in `src/app/cv/page.tsx`:
- Section margins: `mb-16` (adjust to `mb-12`, `mb-20`, etc.)
- Card spacing: `space-y-8` (adjust to `space-y-6`, `space-y-10`, etc.)

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next out
npm install
npm run build
```

### Changes Not Showing

1. Check GitHub Actions completed successfully
2. Hard refresh browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
3. Clear browser cache or use incognito mode
4. Wait 5 minutes for CDN propagation

### Local Development Issues

```bash
# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

---

## 📊 Analytics & SEO

### Meta Tags

Edit `src/app/layout.tsx` to update:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter Card

### Sitemap

Generate a sitemap for SEO:

```bash
# Add to package.json scripts:
"postbuild": "next-sitemap"
```

---

## 🔐 Security

### Environment Variables

For sensitive data, use environment variables:

```bash
# Create .env.local (NOT committed to git)
NEXT_PUBLIC_API_KEY=your_key

# Use in code
const apiKey = process.env.NEXT_PUBLIC_API_KEY
```

---

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GitHub Pages](https://docs.github.com/en/pages)

### Design Inspiration
- [Brittany Chiang](https://brittanychiang.com/)
- Original template: [Liam van Vliet](https://liamvanvliet.com/)

---

## 🤝 Contributing

This is a personal portfolio site, but if you find issues or have suggestions:

1. Open an issue on GitHub
2. Fork the repo and submit a PR
3. Contact via [LinkedIn](https://www.linkedin.com/in/abreujorge-dataresearch/)

---

## 📧 Contact

- **ORCID:** [0000-0002-0211-6416](https://orcid.org/0000-0002-0211-6416)
- **GitHub:** [@drAbreu](https://github.com/drAbreu)
- **LinkedIn:** [abreujorge-dataresearch](https://www.linkedin.com/in/abreujorge-dataresearch/)
- **NASA/ADS:** [Publication Profile](https://ui.adsabs.harvard.edu/search/q=abreu-vicente&sort=date%20desc%2C%20bibcode%20desc&p_=0)

### EMBO Resources
- **SourceData:** [github.com/source-data](https://github.com/source-data)
- **HuggingFace:** [huggingface.co/EMBO](https://huggingface.co/EMBO)

---

## 📝 License

© 2025 Jorge Abreu-Vicente, PhD. All rights reserved.

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Deployed on [GitHub Pages](https://pages.github.com/)
- Design inspired by astronomy and cosmic phenomena
- Color palette extracted from the DATASTAR logo
- Font: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts

---

**Last Updated:** November 30, 2025
