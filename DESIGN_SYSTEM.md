# DATASTAR Design System

Based on the DATASTAR logo by Jorge Abreu-Vicente, PhD

## 🎨 Color Palette

### Primary Brand Colors (Sunset Gradient)

```
Navy Blue     #1a2845  rgb(26, 40, 69)     - Deep, professional foundation
Purple        #4a3a5a  rgb(74, 58, 90)     - Mysterious, scientific
Burgundy      #8b4560  rgb(139, 69, 96)    - Rich, sophisticated
Coral         #c97870  rgb(201, 120, 112)  - Warm, approachable
Salmon        #e89a80  rgb(232, 154, 128)  - Energetic
Orange        #f4a566  rgb(244, 165, 102)  - Dynamic, innovative
Gold          #ffc488  rgb(255, 196, 136)  - Premium, illumination
```

### Accent Colors

```
Teal          #5ec9ba  rgb(94, 201, 186)   - Scientific, fresh
Mint          #6dd4c4  rgb(109, 212, 196)  - Clean, modern
Cream         #fff8f0  rgb(255, 248, 240)  - Light, clarity
Silver        #b8b8c8  rgb(184, 184, 200)  - Neutral, borders
```

### Usage in Tailwind

```css
/* Backgrounds */
bg-brand-navy
bg-brand-purple
bg-brand-orange
bg-brand-gold

/* Text */
text-accent-teal
text-accent-mint
text-accent-cream

/* Borders */
border-neutral-silver
```

---

## 🌈 Gradient Presets

### Sunset Gradient (Hero Sections)
```css
bg-gradient-to-br from-brand-navy via-brand-purple to-brand-burgundy
```
**Use for**: Main hero backgrounds, large feature sections

### Warm Gradient (CTAs)
```css
bg-gradient-to-r from-brand-orange to-brand-gold
```
**Use for**: Primary buttons, important CTAs, highlights

### Teal Gradient (Accents)
```css
bg-gradient-to-r from-accent-teal to-accent-mint
```
**Use for**: Secondary buttons, links, hover states

### Radial Glow (Overlays)
```css
bg-gradient-radial from-transparent via-black/20 to-black/60
```
**Use for**: Card overlays, image treatments

---

## 🎯 Design Elements

### Inspired by the Logo

#### 1. **Starburst Motif**
```html
<svg viewBox="0 0 24 24">
  <path d="M12 2L12 22 M2 12L22 12 M5 5L19 19 M19 5L5 19" />
</svg>
```
**Meaning**: Illumination, insight, radial energy

#### 2. **DNA Helix Pattern**
- Use subtle helix graphics in backgrounds
- Represents: Scientific precision, data genetics

#### 3. **Molecular Diagrams**
- Hexagonal structures (like in logo)
- Chemical bonds visualization
- Teal/mint colored accents

#### 4. **Circular Elements**
- Rings and circles (from logo's circular badge)
- Orbital patterns
- Concentric circles for depth

#### 5. **Particle Effects**
- Small dots scattered (data points)
- Binary code patterns (subtle)
- Network connection lines

---

## 📝 Typography

### Hierarchy

```css
/* Hero Headlines */
text-5xl sm:text-7xl font-bold
text-gradient-sunset

/* Section Titles */
text-4xl sm:text-5xl font-bold
text-brand-gold or text-accent-cream

/* Body Text */
text-lg text-gray-300

/* Labels/Tags */
text-xs uppercase tracking-wider text-accent-teal
```

### Font Weights
- **Regular**: 400 (body text)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (headlines, CTAs)

---

## 🎴 Component Patterns

### Project Cards
```tsx
<div className="border border-neutral-silver/20 rounded-2xl overflow-hidden
                hover:border-brand-gold/50 transition-all
                bg-gradient-to-br from-brand-navy/50 to-brand-purple/30">
  {/* Gradient header */}
  <div className="bg-gradient-to-br from-brand-purple via-brand-burgundy to-brand-coral">
    {/* Decorative elements */}
  </div>
  {/* Content */}
</div>
```

### Buttons

#### Primary
```tsx
<button className="bg-gradient-warm text-brand-navy px-8 py-3 rounded-lg
                   hover:shadow-lg hover:shadow-brand-orange/50">
```

#### Secondary
```tsx
<button className="border border-accent-teal text-accent-teal
                   hover:bg-accent-teal/10 rounded-lg px-6 py-2">
```

### Badges/Tags
```tsx
<span className="bg-brand-purple/40 text-accent-cream px-3 py-1 rounded-full
                 border border-neutral-silver/20">
```

---

## 🌟 Interactive States

### Hover Effects
```css
/* Cards */
hover:border-brand-gold/50
hover:shadow-xl hover:shadow-brand-orange/20

/* Links */
hover:text-accent-teal
hover:bg-brand-purple/30

/* Buttons */
hover:shadow-lg hover:shadow-brand-orange/50
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2
focus:ring-offset-brand-navy
```

---

## 🎭 Visual Themes

### Scientific/Research Theme
- **Colors**: Navy, Purple, Teal
- **Elements**: DNA helixes, molecular structures, data visualizations
- **Mood**: Professional, intelligent, precise

### Warm/Approachable Theme
- **Colors**: Coral, Orange, Gold
- **Elements**: Radial gradients, soft glows, warm overlays
- **Mood**: Welcoming, innovative, energetic

### Premium/Excellence Theme
- **Colors**: Gold, Cream, Silver borders
- **Elements**: Metallic effects, elegant spacing
- **Mood**: High-quality, expert, trustworthy

---

## 📐 Spacing System

Following logo's balanced composition:

```css
/* Sections */
mb-24 (6rem between major sections)

/* Cards */
p-6 to p-8 (internal padding)
gap-6 (grid gaps)

/* Text */
mb-4 (paragraph spacing)
leading-relaxed (comfortable reading)
```

---

## 🖼️ Image Treatments

### Logo Integration
```tsx
<Image src="/_imgs/datastar.png" 
       className="rounded-full" 
       width={48} height={48} />
```

### Project Cards
- Gradient overlays matching logo colors
- Decorative circles and star motifs
- Radial fade effects

---

## 🎨 Usage Examples

### Hero Section
```tsx
<h1 className="text-7xl font-bold">
  Your headline{" "}
  <span className="text-gradient-sunset">with emphasis</span>
</h1>
```

### Feature Cards
```tsx
<div className="bg-gradient-to-br from-brand-navy/50 to-brand-purple/30 
                border border-neutral-silver/20 
                hover:border-accent-teal/50">
```

### CTAs
```tsx
<button className="bg-gradient-warm text-brand-navy
                   hover:shadow-lg hover:shadow-brand-orange/50">
```

---

## 🎯 Brand Personality

Based on DATASTAR logo analysis:

**Keywords**: Scientific, Illuminating, Precise, Innovative, Warm, Premium

**Visual Language**:
- Radial/circular patterns (completeness, holistic)
- Gradient transitions (progression, transformation)
- Scientific icons (expertise, research)
- Warm tones (approachable, human-centered)
- Metallic accents (premium quality)

**Color Psychology**:
- **Navy/Purple**: Trust, intelligence, depth
- **Orange/Gold**: Innovation, energy, success
- **Teal**: Clarity, science, freshness
- **Cream**: Purity, insight, illumination

---

## 📱 Responsive Considerations

```css
/* Mobile first, then enhance */
text-5xl sm:text-6xl lg:text-7xl
px-4 sm:px-6 lg:px-8
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

**This design system ensures consistency across your entire website while honoring the beautiful DATASTAR brand identity!** 🌟

