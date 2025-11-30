# Building DATASTAR: From Concept to Deployment

**A Complete Tutorial on Creating a Professional Portfolio Website with Next.js, Tailwind CSS, and GitHub Pages**

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [The Vision](#the-vision)
3. [Technology Choices](#technology-choices)
4. [Design System](#design-system)
5. [Development Process](#development-process)
6. [Internationalization](#internationalization)
7. [Deployment Setup](#deployment-setup)
8. [Custom Domain Configuration](#custom-domain-configuration)
9. [GitHub Actions CI/CD](#github-actions-cicd)
10. [Lessons Learned](#lessons-learned)
11. [Results](#results)

---

## 🎯 Introduction

This tutorial documents the complete journey of building **DATASTAR** - a professional portfolio website for a researcher transitioning from astrophysics to AI/ML in biomedical sciences. The site showcases research projects, publications, and professional experience with a unique astronomy-inspired design.

**Live Site:** [datastar.space](https://datastar.space)

**Repository:** [github.com/drAbreu/web](https://github.com/drAbreu/web)

---

## 💡 The Vision

### Goals

1. **Professional Presence** - Showcase research at the intersection of astrophysics, AI, and biomedical sciences
2. **Bilingual Support** - Reach both English and Spanish-speaking audiences
3. **Visual Identity** - Create a unique "twilight mode" aesthetic inspired by astronomy
4. **Interactive Experience** - Implement modern UI patterns (spotlight effects, smooth animations)
5. **Easy Maintenance** - Set up automated deployment for quick updates
6. **Performance** - Ensure fast load times and excellent SEO

### Design Philosophy

The site draws inspiration from:
- **Cosmic aesthetics** - Deep space colors, stellar gradients
- **Modern minimalism** - Clean layouts, generous whitespace
- **Technical elegance** - Smooth animations, professional typography
- **Accessibility** - Clear hierarchy, readable fonts, responsive design

---

## 🛠️ Technology Choices

### Framework: Next.js 16

**Why Next.js?**
- ✅ Static Site Generation (SSG) for GitHub Pages
- ✅ App Router for modern React patterns
- ✅ Built-in optimization (images, fonts, CSS)
- ✅ TypeScript support out of the box
- ✅ Excellent developer experience

**Alternative considered:** Astro, Hugo
**Decision:** Next.js offers the best balance of features, performance, and maintainability

### Styling: Tailwind CSS

**Why Tailwind?**
- ✅ Utility-first approach for rapid development
- ✅ Easy customization (color palette, spacing)
- ✅ No CSS conflicts or specificity issues
- ✅ Purge unused styles automatically
- ✅ Responsive design utilities

**Alternative considered:** CSS Modules, Styled Components
**Decision:** Tailwind's utility classes make responsive design and maintenance much easier

### Language: TypeScript

**Why TypeScript?**
- ✅ Type safety prevents runtime errors
- ✅ Better IDE support and autocomplete
- ✅ Easier refactoring
- ✅ Self-documenting code

### Deployment: GitHub Pages

**Why GitHub Pages?**
- ✅ Free hosting for static sites
- ✅ Custom domain support
- ✅ HTTPS certificate included
- ✅ Integrated with GitHub Actions
- ✅ Excellent uptime and performance

**Alternative considered:** Vercel, Netlify
**Decision:** GitHub Pages offers simplicity and zero cost

---

## 🎨 Design System

### Color Palette: "Twilight Mode"

The entire color scheme was extracted from the DATASTAR logo, creating a cohesive cosmic theme:

```css
/* Deep Space Colors */
--brand-navy: #1a2845      /* Deep space navy */
--brand-purple: #4a3a5a    /* Twilight purple */
--brand-burgundy: #8b4560  /* Dusk burgundy */

/* Warm Sunset Colors */
--brand-coral: #c97870     /* Sunset coral (primary accent) */
--brand-orange: #f4a566    /* Golden hour (secondary accent) */
--brand-gold: #ffc488      /* Stellar gold (highlights) */
```

### Typography

**Font:** Inter by Google Fonts
- Excellent readability on screens
- Wide range of weights (300-800)
- Professional, modern appearance
- Optimized for digital displays

**Hierarchy:**
- Headings: Bold, large scale (4xl-8xl)
- Body: Regular weight, comfortable line height
- Accents: Semibold for emphasis

### Layout Principles

1. **Mobile-First** - Design for small screens, enhance for desktop
2. **Generous Whitespace** - Let content breathe
3. **Clear Hierarchy** - Guide the eye naturally
4. **Consistent Spacing** - Use Tailwind's spacing scale
5. **Smooth Transitions** - Animate state changes

---

## 💻 Development Process

### Phase 1: Project Setup

```bash
# Start with template repository
git clone https://github.com/Dingzeefs/website-template.git

# Initialize Next.js project
npm install

# Start development server
npm run dev
```

**Initial Configuration:**
- `next.config.js` - Static export settings
- `tailwind.config.ts` - Custom color palette
- `tsconfig.json` - TypeScript compiler options
- `.gitignore` - Exclude build artifacts

### Phase 2: Core Components

#### 1. Navbar Component (`src/components/Navbar.tsx`)

**Features:**
- Sticky positioning
- Language switcher (EN/ES)
- Hamburger menu for mobile
- Smooth animations
- Gradient call-to-action button

**Key Implementation:**

```typescript
export default function Navbar({ language, setLanguage, navTranslations }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop navigation */}
      {/* Mobile menu */}
    </header>
  )
}
```

#### 2. Gradient Button (`src/components/ui/gradient-button.tsx`)

**Features:**
- Animated gradient background
- Hover effect with reversed gradient
- Uses Radix UI for accessibility
- Class Variance Authority for variants

**Implementation:**

```typescript
const gradientButtonVariants = cva([
  "gradient-button",
  "inline-flex items-center justify-center",
  "rounded-full px-9 py-4",
  // ...more classes
])

export const GradientButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(gradientButtonVariants({ variant, className }))} ref={ref} {...props} />
  }
)
```

**CSS Magic:**

```css
.gradient-button::before {
  /* Normal gradient */
  background: linear-gradient(135deg, navy, purple, burgundy, orange);
  opacity: 1;
}

.gradient-button::after {
  /* Reversed gradient for hover */
  background: linear-gradient(135deg, orange, burgundy, purple, navy);
  opacity: 0;
}

.gradient-button:hover::before { opacity: 0; }
.gradient-button:hover::after { opacity: 1; }
```

#### 3. Spotlight Cursor (`src/components/ui/spotlight-cursor.tsx`)

**Features:**
- Follows mouse movement
- Radial gradient effect
- Canvas-based rendering
- Configurable radius, brightness, color

**Implementation:**

```typescript
const useSpotlightEffect = (config: SpotlightConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }
    
    const draw = () => {
      // Create radial gradient at mouse position
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, config.radius
      )
      // ... render
      requestAnimationFrame(draw)
    }
    
    // ... event listeners
  }, [config])
  
  return canvasRef
}
```

### Phase 3: Page Development

#### Home Page (`src/app/page.tsx`)

**Structure:**
1. **Hero Section**
   - Full-screen background image (moon with clouds)
   - Gradient overlay
   - Animated headline
   - Stats grid (years, publications, expertise)
   - Expertise tags
   - CTA buttons

2. **Projects Section**
   - 3x2 grid of project cards
   - Animated on hover
   - Color-coded by topic
   - Links to external resources

**Key Features:**
- Responsive grid (1 column mobile, 3 columns desktop)
- Smooth hover animations
- Gradient text effects
- Background images with overlays

#### CV Page (`src/app/cv/page.tsx`)

**Design Inspiration:** [Brittany Chiang's portfolio](https://brittanychiang.com/)

**Layout:**
- **Sidebar (Desktop)** - Sticky navigation
  - Name and tagline
  - Section navigation with active indicators
  - Language switcher
  - Academic links (ORCID, NASA/ADS, Google Scholar)
  - Social media

- **Main Content**
  - About section
  - Experience (Academic + Industry)
  - Projects
  - Education
  - Publications
  - Awards
  - Outreach & Teaching

**Interactive Features:**
- Spotlight cursor effect (coral color)
- Active section highlighting
- Smooth scroll with offset
- Hover effects on cards
- Conditional rendering of EMBO resources

**Implementation Details:**

```typescript
const [activeSection, setActiveSection] = useState("")

useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      if (sectionTop <= 100) {
        setActiveSection(section.getAttribute("id") || "")
      }
    })
  }
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])
```

### Phase 4: Refinements

#### Removing Teal/Cyan Colors

**Problem:** Initial design included bright teal/cyan accents that clashed with the twilight theme.

**Solution:** Systematically replaced all `accent-teal` and `accent-mint` with warm twilight colors:
- Language switcher: teal → orange
- Hover states: teal → gold
- Active navigation: teal → coral
- Project cards: teal → gold/coral
- Spotlight: teal → coral

**Files Changed:**
- `src/app/globals.css` - CSS variables
- `tailwind.config.ts` - Color definitions
- `src/components/Navbar.tsx` - All hover states
- `src/app/page.tsx` - All accent colors
- `src/app/cv/page.tsx` - All interactive elements

**Result:** Cohesive twilight aesthetic throughout the entire site.

#### Compressing CV Spacing

**Problem:** Initial CV layout had too much whitespace, requiring excessive scrolling.

**Changes:**
```typescript
// Section spacing
mb-24 → mb-16  // 33% reduction

// Heading spacing
mb-12 → mb-8   // Better rhythm

// Item spacing
space-y-12 → space-y-8  // Experience
space-y-8 → space-y-6   // Awards
space-y-6 → space-y-4   // Publications
```

**Result:** More compact, scannable CV while maintaining readability.

#### Improving Typography

**Problem:** Default system fonts lacked the professional polish desired.

**Solution:** Integrated Google Fonts with Inter typeface:

```html
<!-- src/app/layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

```css
/* src/app/globals.css */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  font-optical-sizing: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 🌍 Internationalization

### Architecture

**Structure:**
```
src/locales/
├── en.ts      # Home page - English
├── es.ts      # Home page - Spanish
├── cv-en.ts   # CV page - English
└── cv-es.ts   # CV page - Spanish
```

### Implementation

**Translation Hook (`src/lib/i18n.ts`):**

```typescript
export type Language = "en" | "es"

export const translations = { en, es }

export function useTranslation(lang: Language = "en") {
  return translations[lang]
}
```

**Usage in Components:**

```typescript
export default function Page() {
  const [language, setLanguage] = useState<Language>("en")
  const t = translations[language]
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
    </div>
  )
}
```

### Translation Strategy

**English (Primary):**
- Original content
- Technical terms in English
- International academic audience

**Spanish:**
- Natural, idiomatic translations
- Technical accuracy maintained
- Regional neutral (not specific to Spain/Latin America)

**Example:**

```typescript
// en.ts
hero: {
  title: "Illuminating insights through science",
  cta: {
    research: "Explore My Research",
    cv: "View Full CV"
  }
}

// es.ts
hero: {
  title: "Iluminando conocimiento a través de la ciencia",
  cta: {
    research: "Explorar Mi Investigación",
    cv: "Ver CV Completo"
  }
}
```

---

## 🚀 Deployment Setup

### Migration Strategy

**Challenge:** Existing GitHub Pages site using Quarto needed to be preserved while deploying new Next.js site.

**Solution:**

1. **Create Legacy Branch:**
```bash
cd /Users/jabreu/PycharmProjects/web
git add -A
git commit -m "Save current state"
git branch legacy_web
git push origin legacy_web
```

2. **Clean Master Branch:**
```bash
git rm -rf .
git clean -fdx
```

3. **Copy New Site:**
```bash
# From development repo
cd /Users/jabreu/PycharmProjects/web-new
rsync -av --exclude='node_modules' --exclude='.next' --exclude='out' . /Users/jabreu/PycharmProjects/web/
```

4. **Configure for GitHub Pages:**
```bash
# Create CNAME for custom domain
echo "datastar.space" > CNAME

# Create .nojekyll to prevent Jekyll processing
touch .nojekyll

# Update README
vim README.md
```

### Initial Deployment Attempt

**Problem:** Committed built artifacts (`_next/`, `index.html`) directly to repo.

**Issues:**
- Large repo size
- Mixed source and build files
- Hard to maintain
- Messy commit history

**Result:** Site deployed but repo structure was chaotic.

### Refactoring to Clean Structure

**Solution:** Remove build artifacts, keep only source code, use GitHub Actions for builds.

```bash
# Remove all built files
git rm -rf index.html cv.html 404.html _next/ _not-found/ *.txt *.png *.jpg

# Commit clean structure
git add -A
git commit -m "♻️ Refactor: Clean repo structure + GitHub Actions CI/CD"
```

---

## 🌐 Custom Domain Configuration

### DNS Setup

**Domain:** datastar.space (registered at domain provider)

**DNS Records:**

```dns
# A Records (Apex domain)
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

# CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: drAbreu.github.io
```

**Why 4 A Records?**
- Load balancing across GitHub's servers
- Redundancy (if one IP fails)
- Better global performance
- DDoS protection

**TTL (Time To Live):**
- Initial: 30 minutes (for quick fixes during setup)
- Production: 1-24 hours (for stability)

### GitHub Pages Configuration

**Settings → Pages:**

1. **Source:** GitHub Actions (not "Deploy from a branch")
2. **Custom Domain:** datastar.space
3. **Enforce HTTPS:** ✓ Enabled (after DNS propagation)

**CNAME File:**
```bash
# In repository root
echo "datastar.space" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### DNS Propagation

**Timeline:**
- DNS records added
- Wait 10-30 minutes (fast)
- Up to 48 hours (worst case)
- Check propagation: [dnschecker.org](https://dnschecker.org)

**Verification:**
```bash
nslookup datastar.space

# Expected output:
Server: 192.168.178.1
Address: 192.168.178.1#53

Non-authoritative answer:
Name: datastar.space
Address: 185.199.108.153
Name: datastar.space
Address: 185.199.109.153
Name: datastar.space
Address: 185.199.110.153
Name: datastar.space
Address: 185.199.111.153
```

### HTTPS Certificate

**Automatic Certificate:**
- GitHub automatically provisions Let's Encrypt certificate
- Takes ~24 hours after DNS verification
- Auto-renews before expiration
- Force HTTPS redirects all HTTP traffic

---

## ⚙️ GitHub Actions CI/CD

### Workflow Design

**Goals:**
- Automatic deployment on every push to `master`
- Clean separation of source and build artifacts
- Fast build times
- Clear error messages

### Workflow File (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:  # Allow manual triggers

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Install dependencies
        run: npm ci
        
      - name: Build with Next.js
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Initial Workflow Issues

**Problem 1: Environment Protection**

```
Error: Branch "master" is not allowed to deploy to github-pages 
due to environment protection rules.
```

**Cause:** GitHub Pages environment had branch restrictions.

**Solution:** Removed environment specification from workflow:

```yaml
# Before (failed):
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}

# After (works):
deploy:
  runs-on: ubuntu-latest
  needs: build
```

**Alternative:** Configure environment to allow all branches.

### Deployment Flow

```
1. Developer pushes to master
   ↓
2. GitHub detects push
   ↓
3. Workflow triggers automatically
   ↓
4. Job 1: Build
   - Checkout code
   - Install Node.js 20
   - Cache dependencies
   - Run npm ci (clean install)
   - Run npm run build
   - Upload ./out as artifact
   ↓
5. Job 2: Deploy
   - Download artifact from Job 1
   - Deploy to GitHub Pages
   ↓
6. Site updated (3-5 minutes)
```

### Monitoring Deployments

**GitHub Actions Tab:**
- Real-time build logs
- Success/failure status
- Build duration
- Error messages

**GitHub Deployments Tab:**
- Production environment status
- Deployment history
- Rollback capability

**Example Successful Deployment:**

```
✓ build (1m 30s)
  ✓ Checkout (2s)
  ✓ Setup Node (5s)
  ✓ Setup Pages (1s)
  ✓ Install dependencies (30s)
  ✓ Build with Next.js (45s)
  ✓ Upload artifact (7s)

✓ deploy (15s)
  ✓ Deploy to GitHub Pages (15s)

Total time: 1m 45s
```

---

## 📚 Lessons Learned

### 1. Separate Source from Build Artifacts

**Mistake:** Initially committed `_next/`, `out/`, and built HTML files to the repository.

**Problem:**
- Bloated repository
- Merge conflicts on build files
- Unclear what's source vs. generated
- Wasted storage and bandwidth

**Solution:** Use GitHub Actions to build on-demand, keep only source in repo.

**Benefit:** Clean, maintainable codebase.

### 2. Design System First

**Success:** Extracting the color palette from the DATASTAR logo before coding saved significant refactoring time.

**Approach:**
1. Analyze logo colors
2. Create comprehensive palette (6-8 colors)
3. Define usage rules (primary, accent, highlight)
4. Document in design system file
5. Configure Tailwind with custom colors
6. Use consistently across all components

**Benefit:** Cohesive visual identity, easy to make global changes.

### 3. Remove Conflicting Colors Early

**Mistake:** Started with template colors (teal/cyan) that clashed with the twilight theme.

**Impact:** Had to systematically search and replace across entire codebase.

**Lesson:** Establish color palette and remove template defaults immediately.

### 4. Test DNS Propagation

**Discovery:** DNS propagation can be instant or take hours.

**Best Practice:**
- Use low TTL (30 min) during setup
- Test with `nslookup` before pushing code
- Use [dnschecker.org](https://dnschecker.org) for global verification
- Increase TTL to 1-24 hours once stable

### 5. GitHub Actions vs. Manual Deployment

**Manual Deployment:**
- Build locally
- Commit built files
- Push to GitHub
- ❌ Error-prone, tedious, messy repo

**GitHub Actions:**
- Push source code
- Automatic build and deploy
- ✅ Clean, reliable, professional

**Lesson:** Set up CI/CD from the start, even for simple sites.

### 6. Mobile-First Design

**Success:** Designing for mobile first, then enhancing for desktop, resulted in:
- Better mobile experience
- Cleaner code (progressive enhancement)
- Faster development (less refactoring)

**Approach:**
- Design smallest screen first (320px)
- Add breakpoints as needed (sm, md, lg, xl)
- Test on real devices

### 7. Internationalization Architecture

**Success:** Separate translation files for each page made management easy.

**Structure:**
```
src/locales/
├── en.ts       # Home EN
├── es.ts       # Home ES
├── cv-en.ts    # CV EN
└── cv-es.ts    # CV ES
```

**Benefits:**
- Easy to find translations
- Can translate pages independently
- Translators can work on specific files
- Type-safe with TypeScript

### 8. Performance Optimization

**Next.js Image Component:**
```typescript
<Image 
  src="/background.jpg"
  alt="Description"
  fill
  priority  // Above fold
  quality={85}
/>
```

**Benefits:**
- Automatic WebP conversion
- Responsive images
- Lazy loading
- Blur placeholder

### 9. Documentation Matters

**Lesson:** Writing comprehensive README and tutorial:
- Forces you to understand your own code
- Makes future updates easier
- Helps others learn
- Creates shareable content

**Best Practice:** Document as you build, not after.

### 10. Version Control Best Practices

**Branch Strategy:**
- `master` - Production code
- `legacy_web` - Old Quarto site (preserved)
- Feature branches for major changes

**Commit Messages:**
- Use conventional commits
- Be descriptive
- Include emoji for quick scanning

**Examples:**
```
✨ feat: Add spotlight cursor effect to CV page
🐛 fix: Resolve mobile menu toggle issue
♻️ refactor: Clean repo structure + GitHub Actions
📝 docs: Update README with deployment instructions
🎨 style: Replace teal with twilight colors
```

---

## 🎯 Results

### Metrics

**Performance:**
- ⚡ **Load Time:** < 1 second (static export)
- 🎨 **First Contentful Paint:** ~0.4s
- 📊 **Lighthouse Score:** 95+ (Performance)
- 📱 **Mobile-Friendly:** 100% (Google test)

**SEO:**
- ✅ Meta tags configured
- ✅ Open Graph images
- ✅ Twitter Card
- ✅ Semantic HTML
- ✅ Alt text on all images

**Accessibility:**
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (WCAG AA)

**Code Quality:**
- ✅ TypeScript (no any types)
- ✅ ESLint passing
- ✅ No console errors
- ✅ Responsive design (320px - 4K)

### Features Delivered

✅ **Bilingual Support** (EN/ES)
✅ **Twilight Theme** (custom color palette)
✅ **Interactive CV** (spotlight cursor, active nav)
✅ **Project Showcase** (animated cards)
✅ **Responsive Design** (mobile-first)
✅ **Custom Domain** (datastar.space)
✅ **HTTPS** (Let's Encrypt)
✅ **CI/CD** (GitHub Actions)
✅ **Clean Codebase** (source only, no build artifacts)

### Before & After

**Before (Quarto Site):**
- Static site generator (R-based)
- Orange/blue color scheme
- English only
- Manual deployment
- Limited interactivity

**After (DATASTAR):**
- Modern React framework (Next.js)
- Custom twilight theme
- Bilingual (EN/ES)
- Automatic deployment
- Rich interactions (spotlight, animations)
- Better performance
- Easier to maintain

---

## 🚀 Future Enhancements

### Short Term

1. **Blog Section**
   - Markdown-based posts
   - Code syntax highlighting
   - RSS feed
   - Search functionality

2. **Projects Page**
   - Detailed project pages
   - Image galleries
   - Demo videos
   - GitHub integration

3. **Analytics**
   - Privacy-friendly (Plausible or Fathom)
   - Track page views
   - Monitor engagement

### Medium Term

1. **Contact Form**
   - Server-side validation
   - Spam protection
   - Email notifications

2. **Publications Integration**
   - Auto-fetch from ORCID API
   - Citation counts
   - Download PDFs

3. **Newsletter**
   - Email subscription
   - Research updates
   - Monthly digest

### Long Term

1. **Morgenrot Subdomain**
   - Separate mental health book site
   - Different theme (calm, psychological)
   - `morgenrot.datastar.space`

2. **Interactive Visualizations**
   - Research data visualization
   - D3.js or Observable
   - Astronomy simulations

3. **CMS Integration**
   - Contentful or Sanity.io
   - Non-technical content updates
   - Preview deployments

---

## 💡 Conclusion

Building DATASTAR was a journey from concept to deployed website, touching on:

- **Design** - Creating a cohesive visual identity
- **Development** - Modern React patterns and TypeScript
- **Internationalization** - Supporting multiple languages
- **DevOps** - CI/CD with GitHub Actions
- **Networking** - DNS configuration and custom domains

The result is a professional, performant, maintainable portfolio site that accurately represents the intersection of astrophysics, AI, and biomedical research.

**Key Takeaways:**

1. ✨ **Design system first** - Establish colors and typography early
2. 🚀 **Automate deployment** - GitHub Actions saves time and reduces errors
3. 🌍 **Internationalization** - Structure for i18n from the start
4. 📱 **Mobile-first** - Better experience, cleaner code
5. 📚 **Document everything** - Future you will thank present you

---

## 🔗 Resources

### Code & Documentation
- **Live Site:** [datastar.space](https://datastar.space)
- **Repository:** [github.com/drAbreu/web](https://github.com/drAbreu/web)
- **Legacy Site:** [github.com/drAbreu/web/tree/legacy_web](https://github.com/drAbreu/web/tree/legacy_web)

### Tools & Frameworks
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)

### Design Inspiration
- [Brittany Chiang](https://brittanychiang.com/)
- [Liam van Vliet](https://liamvanvliet.com/)
- [Lynn Fisher](https://lynnandtonic.com/)

### Learning Resources
- [React Documentation](https://react.dev)
- [CSS Tricks](https://css-tricks.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

## 👤 About the Author

**Dr. Jorge Abreu-Vicente, PhD**

Astrophysicist turned AI/ML researcher specializing in biomedical sciences, knowledge graphs, and open science.

- **ORCID:** [0000-0002-0211-6416](https://orcid.org/0000-0002-0211-6416)
- **GitHub:** [@drAbreu](https://github.com/drAbreu)
- **LinkedIn:** [abreujorge-dataresearch](https://www.linkedin.com/in/abreujorge-dataresearch/)

---

**Published:** November 30, 2025  
**Last Updated:** November 30, 2025  
**Reading Time:** ~30 minutes

---

*If this tutorial helped you build your own portfolio site, I'd love to hear about it! Feel free to reach out or share your creation.*

