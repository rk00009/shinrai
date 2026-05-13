# Dashboard Wireframes & Layout Structure

## Overview

This document defines the layout structure, wireframes, and grid system for all SHINRAI dashboards. All dashboards follow a consistent layout pattern with responsive design.

**Status**: ✅ Complete
**Version**: 1.0

---

## 1. SHARED LAYOUT STRUCTURE

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────┐
│                    TOP NAVBAR                       │
│  Logo  Breadcrumb  [Search]  [Notifications] [Profile] │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│          │                                          │
│ SIDEBAR  │         MAIN CONTENT AREA                │
│ (280px)  │                                          │
│          │  [Page Header]                           │
│          │  [Filters/Controls]                      │
│          │                                          │
│          │  [Content Grid/List]                     │
│          │                                          │
│          │                                          │
├──────────┴──────────────────────────────────────────┤
│                   FOOTER                            │
└─────────────────────────────────────────────────────┘
```

**Dimensions**:
- Sidebar: 280px (fixed)
- Main Content: `calc(100% - 280px)` (fluid)
- Navbar: 64px height
- Footer: 60px height

### Tablet Layout (768px - 1024px)

```
┌─────────────────────────────────────────┐
│        TOP NAVBAR WITH TOGGLE           │
│  [Menu] Logo [Search] [Profile]         │
├─────────────────────────────────────────┤
│     SIDEBAR (Collapsible Drawer)        │
│     (Can overlay or push content)       │
├─────────────────────────────────────────┤
│                                         │
│      MAIN CONTENT AREA                  │
│      (Single column, adjusted)          │
│                                         │
└─────────────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌──────────────────────┐
│  [Menu] Logo [Bell]  │  (48px height)
├──────────────────────┤
│                      │
│   MAIN CONTENT       │
│   (Full width)       │
│                      │
│   SIDEBAR            │
│   (Modal overlay)    │
└──────────────────────┘
```

---

## 2. SIDEBAR NAVIGATION

### Desktop Sidebar (Always Visible)

```
SHINRAI LOGO (40px logo + text)
_______________________

🏠 Dashboard
📋 My Complaints
📊 Analytics
⚙️ Settings
🆘 Help & Support

_______________________

👤 John Doe
📧 john@university.edu
🔒 Logout
```

**Structure**:
```
width: 280px
padding: 24px 16px
background: --color-bg-dark
color: --color-text-light
font-family: --font-body

Nav Items:
  height: 48px
  padding: 12px 16px
  border-radius: 6px
  margin-bottom: 8px
  
  &:hover {
    background: rgba(255, 255, 255, 0.1)
  }
  
  &.active {
    background: --color-primary-base
    color: --color-text-light
  }
```

### Mobile Sidebar (Drawer)

```css
position: fixed;
left: -100%;
top: 0;
width: 280px;
height: 100vh;
background: --color-bg-dark;
z-index: var(--z-modal);
transition: left var(--duration-base) var(--ease-out);

&.open {
  left: 0;
}
```

---

## 3. TOP NAVBAR

### Structure (64px height)

```
Left:           Center:              Right:
Logo (40px)  Breadcrumb/Title    [Search]  [Notifications]  [Profile]
```

### Navbar Components

**Logo Section** (Left)
```
Width: 280px (Desktop) / 64px (Mobile)
Align: Center
Content: Logo + "SHINRAI" text (hidden on mobile)
```

**Breadcrumb** (Center-left)
```
Font: 14px, medium weight
Color: --color-text-secondary
Format: Home / Section / Current Page
```

**Search Bar** (Center)
```
Width: 300px (hidden on tablet/mobile)
Placeholder: "Search complaints..."
Icon: 🔍
Input: --space-md padding
```

**Notifications Bell** (Right)
```
Icon: 🔔
Badge: Red circle with count (if new)
Cursor: Pointer
Click → Dropdown menu
```

**Profile Menu** (Far right)
```
Avatar: 40px circle with initials
Dropdown: Profile, Settings, Logout
```

---

## 4. GRID SYSTEM

### Content Grid (12-column)

```
Desktop (1024px+):
├─ Column Width: calc((100% - 80px) / 12)
└─ Gutter: 16px (8px each side)

Tablet (768px):
├─ Column Width: calc((100% - 32px) / 8)
└─ Gutter: 16px

Mobile (< 768px):
├─ Column Width: 100%
└─ Gutter: 8px
```

### Card Grid Layout

**Desktop**: 12 columns available
- Full Width Card: 12 columns
- Wide Component: 6-8 columns
- Regular Component: 4-6 columns
- Sidebar Widget: 3-4 columns

**Tablet**: 8 columns available
- Full Width: 8 columns
- Half Width: 4 columns
- Third Width: 2-3 columns

**Mobile**: 1 column
- Everything: Full width

---

## 5. COMPONENT SPACING

### Container Padding

```css
/* Main content area */
padding: 24px 32px; /* Desktop */
padding: 16px 20px; /* Tablet */
padding: 12px 16px; /* Mobile */
```

### Card Spacing

```css
/* Between cards */
gap: 16px; /* Desktop */
gap: 12px; /* Tablet */
gap: 8px;  /* Mobile */

/* Card internal padding */
padding: 24px; /* Desktop */
padding: 16px; /* Tablet */
padding: 12px; /* Mobile */
```

### Section Spacing

```css
/* Between sections */
margin-bottom: 48px;

/* Section header to content */
margin-bottom: 24px;
```

---

## 6. RESPONSIVE BREAKPOINTS IN LAYOUTS

### Common Patterns

**Two-Column Layout (Desktop)**
```
[Card 1 (6 cols)] [Card 2 (6 cols)]
[Card 3 (6 cols)] [Card 4 (6 cols)]
```

**One-Column Layout (Tablet)**
```
[Card 1 (8 cols)]
[Card 2 (8 cols)]
[Card 3 (8 cols)]
```

**Stack Layout (Mobile)**
```
[Card 1 (full)]
[Card 2 (full)]
[Card 3 (full)]
```

### CSS Example

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 7. MODAL/OVERLAY SYSTEM

### Modal Structure

```
┌──────────────────────────────┐
│  Modal Title         [X Close]│
├──────────────────────────────┤
│                              │
│  Modal Content               │
│  (Scrollable if needed)      │
│                              │
├──────────────────────────────┤
│         [Cancel]  [Confirm]  │
└──────────────────────────────┘
```

### Modal Specifications

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: --color-bg-primary;
  border-radius: 12px;
  box-shadow: var(--shadow-2xl);
  z-index: var(--z-modal);
  
  /* Width responsive */
  width: 90%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    width: 95%;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: none;
    height: 100vh;
    border-radius: 0;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal-backdrop);
}
```

---

## 8. FORM LAYOUT

### Form Structure

```
┌─────────────────────────────┐
│  Form Title                 │
│  Form description (optional)│
├─────────────────────────────┤
│                             │
│  [Label]                    │
│  [Input Field]              │
│                             │
│  [Label]                    │
│  [Input Field]              │
│                             │
│  [Label]                    │
│  [Select Dropdown]          │
│                             │
│  [Checkbox] Label           │
│                             │
├─────────────────────────────┤
│  [Cancel Button] [Submit]   │
└─────────────────────────────┘
```

### Form CSS

```css
.form-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: --color-text-primary;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid --color-border-light;
  border-radius: 4px;
  font-size: 14px;
  transition: all var(--duration-base);
  
  &:focus {
    border-color: --color-primary-base;
    box-shadow: 0 0 0 3px rgba(199, 55, 44, 0.1);
  }
}
```

---

## 9. TABLE LAYOUT

### Table Structure

```
┌────────┬──────────┬────────────┬──────────┬────────┐
│ Header │ Header   │ Header     │ Header   │ Action │
├────────┼──────────┼────────────┼──────────┼────────┤
│ Data   │ Data     │ Data       │ Data     │ [•••]  │
├────────┼──────────┼────────────┼──────────┼────────┤
│ Data   │ Data     │ Data       │ Data     │ [•••]  │
├────────┼──────────┼────────────┼──────────┼────────┤
│ Data   │ Data     │ Data       │ Data     │ [•••]  │
└────────┴──────────┴────────────┴──────────┴────────┘
```

### Table CSS

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table thead {
  background: --color-bg-secondary;
  border-bottom: 2px solid --color-border-light;
}

.table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: --color-text-primary;
}

.table td {
  padding: 16px;
  border-bottom: 1px solid --color-border-light;
  color: --color-text-secondary;
}

.table tbody tr:hover {
  background: --color-bg-secondary;
}

.table tbody tr:nth-child(odd) {
  background: rgba(0, 0, 0, 0.02);
}
```

---

## 10. DASHBOARD-SPECIFIC LAYOUTS

### Student Dashboard Layout

```
[Filters Bar]
┌─────────────────────────────────────┐
│ KPI Cards (4 columns)               │
├─────────────────────────────────────┤
│ New Report Button                   │
├─────────────────────────────────────┤
│ My Complaints Table / Feed          │
│ (Searchable, filterable)            │
├─────────────────────────────────────┤
│ [Timeline] [Recent Activity]        │
└─────────────────────────────────────┘
```

### Faculty Dashboard Layout

```
[Filter Bar]
┌──────────────────────────────────────┐
│ Complaint Queue Stats (Cards)        │
├──────────────────────────────────────┤
│ [Pending] [In Progress] [Resolved]   │
├──────────────────────────────────────┤
│ Team Workload (Table)                │
│ Assign / Manage Complaints           │
└──────────────────────────────────────┘
```

### Operational Dashboard Layout

```
[Task Filter / Sort]
┌──────────────────────────────────────┐
│ SLA Status (Gauge)  | Today (Stats)  │
├──────────────────────────────────────┤
│ Assigned Tasks (Queue)               │
│ - Task 1                             │
│ - Task 2                             │
│ - Task 3                             │
├──────────────────────────────────────┤
│ [Start Work] [Log Time] [Complete]   │
└──────────────────────────────────────┘
```

### Admin Dashboard Layout

```
[Date Range / Filters]
┌──────────────────────────────────────┐
│ Key Metrics (6 cards)                │
├──────────────────────────────────────┤
│ [Trends Chart] [Department Chart]    │
├──────────────────────────────────────┤
│ Escalation Metrics                   │
├──────────────────────────────────────┤
│ System Health / Logs                 │
└──────────────────────────────────────┘
```

---

## 11. EMPTY STATES

### Empty State Components

```
   🚀
   
   No Complaints Yet
   
   Get started by creating your first complaint
   
   [Create Complaint Button]
```

### Empty State CSS

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
  color: --color-text-secondary;
}

.empty-state-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 600;
  color: --color-text-primary;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  margin-bottom: 24px;
  max-width: 400px;
}

.empty-state-button {
  /* Use primary button styles */
}
```

---

## 12. LOADING STATES

### Skeleton Loading

```
┌─────────────────────┐
│ ░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░░░░░░│
├─────────────────────┤
│ ░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░░░░░░│
└─────────────────────┘
```

### Spinner

```css
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid --color-border-light;
  border-top-color: --color-primary-base;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Design Checklist

### Layout Checklist
- [ ] Sidebar navigation responsive
- [ ] Navbar responsive across all screens
- [ ] Grid system works on all breakpoints
- [ ] Modals display correctly on mobile
- [ ] Forms stack properly on small screens
- [ ] Tables scrollable on mobile
- [ ] Empty states visible when needed
- [ ] Loading states implemented

### Responsive Checklist
- [ ] 480px (mobile small)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1400px (desktop large)

### Accessibility Checklist
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Motion preferences respected

---

**Status**: ✅ Complete
**Next**: Dashboard-specific designs
**Implementation**: CSS + HTML templates
