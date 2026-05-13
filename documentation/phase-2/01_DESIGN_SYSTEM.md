# SHINRAI Design System

## Overview

A comprehensive design system for SHINRAI that ensures consistency, accessibility, and scalability across all dashboards. The system uses Enterprise Brutalism + Subtle Glassmorphism + Minimal Claymorphism aesthetic.

**Status**: ✅ Complete
**Version**: 1.0
**Last Updated**: May 13, 2026

---

## 1. COLOR SYSTEM

### Primary Colors

**SHINRAI Red** - Primary brand color
```
Light:    #E74C3C (RGB: 231, 76, 60)
Base:     #C7372C (RGB: 199, 55, 44)  ← PRIMARY
Dark:     #A01C15 (RGB: 160, 28, 21)
```

**Usage**: CTAs, highlights, error states, primary buttons, status badges

### Semantic Colors

**Success** - Positive actions and confirmations
```
Light:    #27AE60 (Green, RGB: 39, 174, 96)
Base:     #229954 (RGB: 34, 153, 84)  ← DEFAULT
Dark:     #1E8449 (RGB: 30, 132, 73)
```

**Warning** - Caution and attention needed
```
Light:    #F39C12 (Orange, RGB: 243, 156, 18)
Base:     #D68910 (RGB: 214, 137, 16)  ← DEFAULT
Dark:     #BA4A00 (RGB: 186, 74, 0)
```

**Danger** - Errors and destructive actions
```
Light:    #E74C3C (Red, RGB: 231, 76, 60)
Base:     #C7372C (RGB: 199, 55, 44)  ← DEFAULT
Dark:     #A01C15 (RGB: 160, 28, 21)
```

**Info** - Informational messages
```
Light:    #3498DB (Blue, RGB: 52, 152, 219)
Base:     #2980B9 (RGB: 41, 128, 185)  ← DEFAULT
Dark:     #1F618D (RGB: 31, 97, 141)
```

### Neutral Colors

**Backgrounds**
```
Darkest:  #0F0F0F (Near black, for dark mode)
Dark:     #1A1A1A (Secondary backgrounds)
Medium:   #2D2D2D (Tertiary backgrounds)
Light:    #F5F5F5 (Primary backgrounds)
Lightest: #FFFFFF (White)
```

**Text**
```
Dark Text:      #1A1A1A (Primary text)
Medium Text:    #4A4A4A (Secondary text)
Light Text:     #FFFFFF (White text on dark)
Disabled:       #BDBDBD (Disabled elements)
Border:         #E0E0E0 (Light borders)
Dark Border:    #333333 (Dark borders)
```

### CSS Variables (Root)

```css
:root {
  /* Primary */
  --color-primary-light: #E74C3C;
  --color-primary-base: #C7372C;
  --color-primary-dark: #A01C15;
  
  /* Semantic */
  --color-success: #229954;
  --color-warning: #D68910;
  --color-danger: #C7372C;
  --color-info: #2980B9;
  
  /* Backgrounds */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F5F5F5;
  --color-bg-tertiary: #E8E8E8;
  --color-bg-dark: #1A1A1A;
  --color-bg-darkest: #0F0F0F;
  
  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-light: #FFFFFF;
  --color-text-disabled: #BDBDBD;
  
  /* Borders */
  --color-border-light: #E0E0E0;
  --color-border-dark: #333333;
}
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Families

**Display Font**: Manrope (Google Fonts)
- Used for: Headings, page titles, brand elements
- Weights: 600 (Bold), 700 (Extra Bold), 800 (Black)
- Characteristics: Geometric, modern, strong presence

**Body Font**: Inter (Google Fonts)
- Used for: Body text, labels, descriptions
- Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- Characteristics: Clear, readable, professional

### Type Scale

```
Component Name     | Size   | Line Height | Weight | Usage
-------------------|--------|-------------|--------|-------
H1 (Page Title)    | 36px   | 1.2        | 700    | Main page headings
H2 (Section Title) | 28px   | 1.3        | 700    | Section headers
H3 (Subsection)    | 22px   | 1.4        | 600    | Card titles
H4 (Card Heading)  | 18px   | 1.4        | 600    | Table headers
Body Large         | 16px   | 1.6        | 400    | Main body text
Body Normal        | 14px   | 1.6        | 400    | Standard text
Body Small         | 12px   | 1.5        | 400    | Secondary text
Caption            | 11px   | 1.5        | 500    | Helper text
Label              | 12px   | 1.4        | 600    | Form labels
Button             | 14px   | 1.4        | 600    | Button text
Badge              | 11px   | 1.3        | 600    | Badge text
```

### CSS Variables

```css
:root {
  /* Font Families */
  --font-display: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Type Scale */
  --text-h1: 36px;
  --text-h2: 28px;
  --text-h3: 22px;
  --text-h4: 18px;
  --text-lg: 16px;
  --text-base: 14px;
  --text-sm: 12px;
  --text-xs: 11px;
}
```

### Font Google Imports

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
```

---

## 3. SPACING SYSTEM

### Spacing Scale (8px base unit)

```
xs     →  4px  (0.5rem)
sm     →  8px  (1rem)
md     →  12px (1.5rem)
lg     →  16px (2rem)
xl     →  24px (3rem)
2xl    →  32px (4rem)
3xl    →  48px (6rem)
```

### CSS Variables

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
}
```

### Usage Guidelines

| Component | Padding | Margin | Gap |
|-----------|---------|--------|-----|
| Button | 12px 24px | 0 | — |
| Card | 24px | 16px | — |
| Input | 12px 16px | 0 | — |
| Grid Item | 0 | 0 | 16px |
| Section | 48px 0 | 0 | — |
| List Item | 8px 0 | 0 | — |

---

## 4. SHADOW SYSTEM

### Depth Levels

**Shadow Depth 1** - Subtle elevation
```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
```
Usage: Hover states, subtle separation

**Shadow Depth 2** - Light elevation
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
```
Usage: Cards, buttons at rest

**Shadow Depth 3** - Medium elevation
```css
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
```
Usage: Dropdowns, modals

**Shadow Depth 4** - Strong elevation
```css
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
```
Usage: Modal backdrop, floating panels

**Shadow Depth 5** - Heavy elevation
```css
box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
```
Usage: Deep modals, overlay panels

### CSS Variables

```css
:root {
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 16px 32px rgba(0, 0, 0, 0.2);
}
```

---

## 5. BORDER RADIUS

### Radius Scale

```
None    →  0px
sm      →  2px  (Subtle)
md      →  4px  (Default)
lg      →  8px  (Cards)
xl      →  12px (Large cards)
2xl     →  16px (Extra large)
full    →  9999px (Circles, pills)
```

### CSS Variables

```css
:root {
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;
}
```

### Usage Guidelines

| Component | Radius |
|-----------|--------|
| Button | 6px |
| Input | 4px |
| Card | 8px |
| Modal | 12px |
| Avatar | full |
| Badge | full |

---

## 6. MOTION SYSTEM

### Easing Functions

**Ease Out** - Deceleration, used for entrances
```css
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
```

**Ease In Out** - Default, used for state changes
```css
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
```

**Ease In** - Acceleration, used for exits
```css
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
```

### Timing

**Quick** - Micro-interactions
```css
--duration-quick: 150ms;
```

**Base** - Standard transitions
```css
--duration-base: 200ms;
```

**Slow** - Emphasized animations
```css
--duration-slow: 300ms;
```

**Slower** - Page transitions
```css
--duration-slower: 500ms;
```

### Common Transitions

**Fade In**
```css
animation: fadeIn var(--duration-base) var(--ease-out);

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide Down**
```css
animation: slideDown var(--duration-base) var(--ease-out);

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Scale In**
```css
animation: scaleIn var(--duration-base) var(--ease-out);

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### CSS Variables

```css
:root {
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  
  --duration-quick: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
}
```

---

## 7. GLASS MORPHISM EFFECT

### Standard Glassmorphism

```css
backdrop-filter: blur(10px);
background: rgba(255, 255, 255, 0.8);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

### Dark Glassmorphism

```css
backdrop-filter: blur(10px);
background: rgba(26, 26, 26, 0.8);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### CSS Variables

```css
:root {
  --glass-blur: blur(10px);
  --glass-bg-light: rgba(255, 255, 255, 0.8);
  --glass-bg-dark: rgba(26, 26, 26, 0.8);
  --glass-border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 8. COMPONENT TOKENS

### Buttons

**Primary Button**
- Background: `--color-primary-base`
- Text: `--color-text-light`
- Padding: `12px 24px`
- Radius: `6px`
- Shadow: `--shadow-md`

**Secondary Button**
- Background: `--color-bg-secondary`
- Text: `--color-text-primary`
- Border: `--color-border-light`
- Padding: `12px 24px`
- Radius: `6px`

**Ghost Button**
- Background: transparent
- Text: `--color-primary-base`
- Border: `--color-border-light`
- Padding: `12px 24px`
- Radius: `6px`

### Input Fields

**Default State**
- Background: `--color-bg-primary`
- Border: `--color-border-light`
- Text: `--color-text-primary`
- Padding: `12px 16px`
- Radius: `4px`

**Focus State**
- Border: `--color-primary-base`
- Box-shadow: `0 0 0 3px rgba(199, 55, 44, 0.1)`

**Error State**
- Border: `--color-danger`
- Background: `rgba(199, 55, 44, 0.05)`

### Cards

**Default Card**
- Background: `--color-bg-primary`
- Border: `--color-border-light`
- Padding: `24px`
- Radius: `8px`
- Shadow: `--shadow-md`

**Elevated Card**
- Background: `--color-bg-primary`
- Shadow: `--shadow-lg`
- Padding: `24px`
- Radius: `8px`

### Badges

**Status Badge**
- Padding: `4px 12px`
- Radius: `full`
- Font: `--text-xs`
- Weight: `600`

**Success Badge**
- Background: `rgba(34, 153, 84, 0.1)`
- Text: `--color-success`
- Border: `1px solid --color-success`

**Warning Badge**
- Background: `rgba(214, 137, 16, 0.1)`
- Text: `--color-warning`
- Border: `1px solid --color-warning`

**Danger Badge**
- Background: `rgba(199, 55, 44, 0.1)`
- Text: `--color-danger`
- Border: `1px solid --color-danger`

---

## 9. ACCESSIBILITY REQUIREMENTS

### Color Contrast

- **Normal text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text**: Minimum 3:1 contrast ratio (WCAG AA)
- **UI components**: Minimum 3:1 contrast ratio

### Focus States

All interactive elements must have visible focus states:
```css
:focus-visible {
  outline: 2px solid --color-primary-base;
  outline-offset: 2px;
}
```

### Motion

- Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML

- Use semantic tags: `<button>`, `<input>`, `<label>`, `<nav>`, etc.
- Include `aria-labels` for icon-only buttons
- Maintain heading hierarchy: H1 > H2 > H3

---

## 10. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Devices |
|-----------|-------|---------|
| Mobile | < 480px | Small phones |
| Mobile Large | 480px - 768px | Large phones, tablets |
| Tablet | 768px - 1024px | Tablets |
| Desktop | 1024px - 1400px | Desktop computers |
| Desktop Large | > 1400px | Large monitors |

### CSS Media Queries

```css
/* Mobile first approach */
@media (min-width: 480px) { /* Mobile Large */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1400px) { /* Desktop Large */ }
```

---

## 11. DARK MODE

Dark mode uses inverted colors while maintaining contrast and visual hierarchy.

### Dark Mode Palette

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0F0F0F;
    --color-bg-secondary: #1A1A1A;
    --color-text-primary: #F5F5F5;
    --color-text-secondary: #BDBDBD;
    --color-border-light: #333333;
  }
}
```

---

## 12. ICONOGRAPHY

### Icon Set: Material Icons + Custom SVGs

**Size Scale**:
- Small: 16px (labels, badges)
- Normal: 24px (default, buttons)
- Large: 32px (page titles)
- Extra Large: 48px (hero elements)

### Icon Usage

**Primary Icons** (32):
- Dashboard, Settings, User, Logout
- Bell (Notifications), Mail, Chat
- Plus, Minus, Edit, Delete, Close
- Search, Filter, Sort
- Calendar, Clock, Location
- Eye, Lock, Unlock
- Success, Warning, Error, Info
- Download, Upload, Share
- Menu, Back, Forward
- Checkmark, X
- Expand, Collapse
- More (3-dot menu)

---

## 13. ELEVATION & Z-INDEX

### Z-Index Scale

```css
:root {
  --z-negative: -1;
  --z-base: 0;
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  
  --z-modal-backdrop: 900;
  --z-modal: 1000;
  
  --z-notification: 1100;
  --z-tooltip: 1200;
}
```

### Layer Usage

| Layer | Z-Index | Components |
|-------|---------|-----------|
| Background | 0 | Body, containers |
| Sticky | 200 | Fixed sidebar, navbar |
| Dropdown | 100 | Select menus, popovers |
| Modal Backdrop | 900 | Semi-transparent overlay |
| Modal | 1000 | Dialogs, forms |
| Notification | 1100 | Toast, alerts |
| Tooltip | 1200 | Help text, popovers |

---

## Design System Usage

### Implementation Checklist

- [ ] Import Google Fonts
- [ ] Define all CSS variables
- [ ] Create base component styles
- [ ] Implement responsive breakpoints
- [ ] Add dark mode support
- [ ] Enable motion preferences
- [ ] Test accessibility
- [ ] Document all custom properties

### Component Library Structure

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.css
│   └── Button.stories.tsx
├── Input/
├── Card/
├── Badge/
├── Modal/
├── Toast/
└── ...
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | May 13, 2026 | Initial design system |

---

**Status**: ✅ Complete
**Next**: Implement in all dashboards
**Maintainer**: Design team
