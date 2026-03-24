# Ohio Demo 26 — Comprehensive Design System Guide
Source: ohio.clbthemes.com/demo26/homedemo26-elementor/
Theme: Ohio by Colabrio · Elementor 3.35.6 · WordPress 6.9.1 · Version 3.6

## Visual Style Description
The page presents a clean, modern SaaS product landing page aesthetic that sits firmly in the "confident minimal" tradition — not stark or cold, but restrained and purposeful. The overall impression is of a professional product that takes itself seriously without being sterile.
The hero uses generous white space with centered black headline typography at a very large weight, immediately establishing hierarchy. The illustrations are flat-style with a limited color palette — warm terracotta/orange figures against light backgrounds — giving the page personality without overwhelming the UI content. These illustrations feel editorial and slightly quirky, humanizing what would otherwise be a very buttoned-up layout.
Sections alternate between pure white and a barely-perceptible warm off-white, creating a quiet rhythm as you scroll. There are no heavy borders, no gradients, no shadows competing for attention. The brand accent (a vivid orange-red) appears sparingly — on CTAs, progress bars, pricing highlights — which makes it feel charged with energy every time it appears.
Typography is doing a lot of heavy lifting. Headlines are set at very tight letter-spacing in a clean geometric sans, giving the page an editorial quality. The size contrast between H1 (massive, full-width) and body copy (small, measured) is dramatic and intentional. This tension between scale extremes is a consistent design choice throughout.
The pricing section introduces darker card backgrounds and a bolder visual weight, signaling a transition to a commitment-oriented zone. The testimonials section uses a tabbed interface with a carousel, keeping social proof dense but organized. The final CTA strip mirrors the hero's simplicity — white, centered, single input form — completing the page loop cleanly.

## 01 · Typography & Fonts

### Typeface Stack
Role | Family | Fallback
--- | --- | ---
Display / Headings / Body | DM Sans | sans-serif
Code / Labels / Badges | DM Mono | monospace

Both fonts are loaded from Google Fonts. DM Sans handles 100% of visible prose and headings. DM Mono appears exclusively for version numbers, data labels, counters, and system-level metadata.

### Font Weights Used
- **300 Light** — rarely used, occasional body supporting text
- **400 Regular** — standard body copy
- **500 Medium** — button labels, tab links, nav items
- **600 SemiBold** — icon box headings, eyebrow labels, tag text
- **700 Bold** — all headings H1 through H4, pricing numbers, counter figures
- **700i Bold Italic** — footer heading links

### Type Scale
Level | Size | Weight | Letter Spacing | Line Height | Usage
--- | --- | --- | --- | --- | ---
H1 · Hero | clamp(38px, 6vw, 96px) | 700 | −0.04em | 1.05 | Single page headline
H2 · Section | clamp(28px, 4vw, 64px) | 700 | −0.03em | 1.10 | Primary section titles
H4 · Component | clamp(18px, 1.5vw, 36px) | 700 | −0.01em | 1.25 | Tab panel titles, step labels
H5 · Widget | clamp(15px, 1.25vw, 28px) | 600 | 0 | 1.30 | Icon box headings, plan names
H6 · Micro | clamp(13px, 1vw, 24px) | 700 | 0 | 1.30 | Testimonial category, counter label
Eyebrow / Subtitle | clamp(11px, 0.9vw, 20px) | 600 | +0.12em | 1.40 | Section label above H2, UPPERCASE
Body Default | clamp(15px, 1.1vw, 24px) | 400 | 0 | 1.65 | Paragraph text, descriptions
Body Large | clamp(17px, 1.3vw, 32px) | 400 | 0 | 1.60 | Section intro descriptions
Button Label | clamp(14px, 1.1vw, 24px) | 500 | 0 | 1.00 | All button text
Mono Label | clamp(11px, 0.8vw, 20px) | 400–500 | +0.08em | 1.40 | Version badges, data, tokens

### Typography Behaviour Notes
- **Fluid Typography:** ALL typography scales fluidly using CSS `clamp()` based on viewport width. The system continuously adapts from mobile (320px) up to 4K displays (3840px) without rigid breakpoints.
- Heading letter-spacing tightens progressively with scale (larger = tighter)
- Eyebrow labels are always uppercase, always a grey or muted tone, always positioned above the main headline with 8–12px gap
- Body text under headings gets 16–20px top margin before the paragraph begins
- Strong tags within body copy use weight 600–700 to pull key phrases without changing size


## 02 · Color System

### Core Palette
Token | Hex | Role
--- | --- | ---
Dark Strong | #24262B | Primary text, filled buttons, header background
Dark Light | #32353C | Secondary text, hover states on filled elements
Brand / Accent | #FF5E3A | Primary CTA, badges, progress fill, active states
Grey Strong | #838998 | Body copy, meta text, section subtitles
Grey Light | #C5C7CE | Borders, dividers, placeholder text
Beige Dark | #A1824F | Warm decorative accent (limited use)
Background Alt | #F7F7F6 | Alternating section backgrounds
Off-White | #F5F5F5 | Icon containers, flat buttons, input backgrounds
White | #FFFFFF | Primary page background, card backgrounds
Black | #000000 | Absolute black (rarely used directly)

### Color Usage Rules
**Brand accent (#FF5E3A) is used exclusively for:**
- Primary CTA button fills
- Badge inner label backgrounds
- Progress bar fill
- Active tab indicator underline
- Hover state highlights on outlined buttons
- Version badge text in light mode

**Never use brand accent on:**
- Body text (fails contrast)
- Large background areas
- Navigation links at rest state

### Section Background Rhythm
The page uses a deliberate alternating pattern to separate content zones without borders:
- Hero → White #FFFFFF
- Logos → White #FFFFFF
- Feature + Video → Off-White / tinted (clb__dark_mode_light)
- CTA Form → White #FFFFFF
- Feature + Stats → Off-White / tinted
- Blog Preview → White #FFFFFF
- Tabs / Setup → Off-White / tinted
- Pricing → White #FFFFFF
- Testimonials → Off-White / tinted
- Bottom CTA → White #FFFFFF
- Footer → Light section (forced light always)


## 03 · Spacing & Layout

### Layout Grid
Property | Value
--- | ---
Container max-width | clamp(1200px, 80vw, 2400px)
Container side padding | clamp(20px, 3vw, 80px)
Grid column gap (wide) | clamp(64px, 6vw, 140px)
Grid column gap (default) | clamp(24px, 3vw, 64px)
Grid column gap (narrow) | clamp(16px, 2vw, 40px)

### Component Spacing Reference
Component | Value
--- | ---
Section vertical padding (standard) | clamp(60px, 8vw, 160px)
Section vertical padding (hero) | top: clamp(120px, 12vw, 320px) / bot: clamp(80px, 8vw, 200px)
Heading block bottom margin | clamp(44px, 4vw, 88px)
Eyebrow → H2 gap | 10px
H2 → body paragraph gap | 16px
Card internal padding | clamp(22px, 2.5vw, 50px) clamp(20px, 2vw, 40px)
Pillar internal padding | clamp(32px, 3.5vw, 80px) clamp(24px, 3vw, 64px)
Icon box wrapper dimensions | width/height: clamp(36px, 3vw, 70px)
Progress bar to progress bar | 16px
Button padding (large) | clamp(15px, 1.5vw, 32px) clamp(32px, 3.2vw, 72px)
Button padding (default) | clamp(12px, 1.2vw, 26px) clamp(24px, 2.5vw, 56px)
Button padding (small) | clamp(8px, 0.8vw, 16px) clamp(16px, 1.6vw, 32px)
Testimonial grid gap | clamp(24px, 2.5vw, 60px)


## 04 · White Space Philosophy
White space on this page operates at three distinct levels, each with a specific communication purpose.

**Macro level — Section separation**
Every content section receives 80–120px of vertical breathing room above and below. This is not decorative padding; it performs the role of a chapter break, giving the user's eye a moment of rest between completely different content types. Because the alternating background tones are extremely subtle, this generous spacing is what prevents the page from feeling like a continuous wall of information.

**Meso level — Block isolation**
Within each section, the heading cluster (eyebrow + H2 + body paragraph) is given 40–48px of space below it before the primary content grid begins. This gap is a visual period — a full stop that says "the title is finished; what follows is the detail." Icon boxes, cards, and feature panels each maintain 20–40px of breathing room between them. Nothing is crowded; items have room to be scanned individually.

**Micro level — Component internals**
Cards hold 28–32px of internal padding, which is generous relative to their content. This creates a sense of quality and openness inside components. Body line-height of 1.65 ensures paragraph text never feels dense. Heading line-height of 1.05–1.15 keeps large type tight and impactful without letters colliding.


## 05 · Component Library

### Buttons
Four primary button styles are used:
- **-default (Filled)**: Background: #24262B · Text: #FFFFFF · Radius: 4px · Font: 14–15px / 500 · Hover: lightens to #32353C
- **-outlined**: Background: transparent · Border: 1.5px #24262B · Text: #24262B · Hover: fills to #24262B, text turns white
- **-flat**: Background: #F5F5F5 · Text: #24262B · No border · Used for secondary newsletter actions
- **-text (Ghost)**: Background: transparent · No border · Underline on hover · Used for "Read More" inline links
- Size variants: -large (16px / 36px padding), default (14px / 28px padding), -small (13px / 18px padding)
- Colored variant: .btn-elementor-colored — applies the brand accent #FF5E3A fill

### Badge
Small pill-shaped attention hook used in the hero section only.
Structure: outer pill with label text + inner dark capsule with version number (e.g. "VER 3.6")
Outer: #F5F5F5 background · 1px solid rgba(0,0,0,0.10) border · pill radius
Inner capsule: #24262B background · white text · uppercase · 10px mono font

### Icon Boxes
Layout: horizontal flex, icon on left, text block on right
Icon container: 44×44px, #F5F5F5 background, 8px radius, centered icon
Heading: 15px / 600 weight
Body: 13px / 400 weight / #838998

### Progress Bars
Thin track variant (-thin): 3px track height
Track background: rgba(0,0,0,0.08)
Fill: #24262B (light mode)
Tooltip: positioned above the fill endpoint, shows percentage in small dark pill
Label: 12px / 600 weight above the bar

### Accordion
Light border-bottom between items · Question text: 14px / 500 · Toggle icon: + / − small icon button · Answer text: 13px / 400 / #838998 · Collapsed height: 0 · Expanded: animated height

### Testimonials
Center-aligned card layout
Category label: 12px / 700 / uppercase / grey
Quote text: 16px / 400 / italic / #24262B
Avatar: circular, 48px diameter, background image
Author name: 13px / 600
Author role: 12px / 400 / #838998

### Pricing Cards
Contained card with left-aligned content
Plan name: 15px / 700
Plan subtitle: 12px / 400 / grey
Price number: 40px / 700 / tight letter-spacing
Billing period: 12px / grey tag element
Description: 13px body
Feature list: checkmark icon + 13px label, items separated by thin horizontal line
CTA button: full-width, -default style
Note text: 12px / mono / grey below button

### Counters
Large number: 52px / 700 / tight letter-spacing / #24262B
Label: 12px / 400 / uppercase / #838998 / +0.08em tracking
Animation: number increments from 0 on scroll entry

---
*Design system compiled from source analysis + visual review · March 2026*
