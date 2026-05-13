# Student Dashboard UI Specification

## Overview

The Student Dashboard is the primary interface for students to submit, track, and manage their civic complaints. It provides real-time status updates, historical tracking, and analytics about their complaints.

**Primary Users**: Students
**Purpose**: Submit and track civic complaints
**Access Level**: Public (university students)

---

## 1. PAGE LAYOUT

### Full Layout Structure

```
┌──────────────────────────────────────────────────────┐
│ NAVBAR (with Search, Notifications, Profile)        │
├─────────────┬──────────────────────────────────────┤
│             │                                      │
│  SIDEBAR    │      MAIN CONTENT AREA              │
│  Navigation │                                      │
│             │  Header: "Dashboard"                │
│             │  [Filters] [New Report Btn]          │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ KPI Cards (4 columns)           │ │
│             │  │ [Active] [Resolved] [Rate] [SAT]│ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ Recent Issues (Table)           │ │
│             │  │ [ID] [Title] [Status] [Time]    │ │
│             │  │ - Issue 1                       │ │
│             │  │ - Issue 2                       │ │
│             │  │ - Issue 3                       │ │
│             │  │ [Pagination]                    │ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ Activity Timeline               │ │
│             │  │ [Vertical Timeline View]        │ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
└─────────────┴──────────────────────────────────────┘
```

---

## 2. KEY PERFORMANCE INDICATORS (KPI SECTION)

### KPI Cards Layout

```
Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
Gap: 16px
Total Height: Auto (approximately 120px per card)
```

### KPI Card 1: Active Issues

**Title**: "Active Issues"
**Value**: "247"
**Icon**: 📋 (or icon-clipboard)
**Trend**: "+12 this week"
**Trend Color**: Green (Positive)
**Bottom Color Bar**: Red (#C7372C)

**Card Styling**:
```
Background: White card with subtle shadow
Border-top: 4px solid #C7372C
Padding: 20px
Border-radius: 8px
Font: 
  - Title: 12px, gray (#999)
  - Value: 36px, bold, dark (#1A1A1A)
  - Trend: 12px, green
```

### KPI Card 2: Resolution Rate

**Title**: "Resolution Rate"
**Value**: "87%"
**Icon**: ✓ (or icon-check-circle)
**Trend**: "+3% vs last month"
**Trend Color**: Green (Positive)
**Bottom Color Bar**: Green (#229954)

### KPI Card 3: Avg Resolution Time

**Title**: "Avg Resolution Time"
**Value**: "8 days"
**Icon**: ⏱️ (or icon-clock)
**Trend**: "-2 days vs last month"
**Trend Color**: Green (Positive)
**Bottom Color Bar**: Blue (#2980B9)

### KPI Card 4: Stakeholder Satisfaction

**Title**: "Stakeholder Satisfaction"
**Value**: "92%"
**Icon**: ⭐ (or icon-star)
**Trend**: "+1% vs last month"
**Trend Color**: Green (Positive)
**Bottom Color Bar**: Orange (#F39C12)

### KPI Card Animation

```css
.kpi-card {
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}

.kpi-value {
  animation: countUp 2s ease-out;
  
  @keyframes countUp {
    from { 
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

---

## 3. FILTER & ACTION BAR

### Filter Bar Layout

```
┌─────────────────────────────────────────────────────┐
│ [Search Box] [Status Filter] [Category] [Date Range]│
│                                    [+ New Report]    │
└─────────────────────────────────────────────────────┘
```

### Components

**Search Box**
```
Width: 250px (min)
Placeholder: "Search complaints by ID or title..."
Icon: 🔍
Height: 40px
Padding: 10px 16px
Border-radius: 4px
```

**Status Filter Dropdown**
```
Options:
  - All (default)
  - Pending
  - In Progress
  - Resolved
  - On Hold
  
Width: 120px
Height: 40px
```

**Category Filter Dropdown**
```
Options:
  - All (default)
  - Facilities
  - IT & Technology
  - Security
  - Academic
  - Student Services
  - Other
  
Width: 140px
Height: 40px
```

**Date Range Picker**
```
Format: "From Date - To Date"
Width: 200px
Height: 40px
Popup: Calendar picker on click
```

**New Report Button**
```
Text: "+ New Report"
Background: --color-primary-base (#C7372C)
Color: White
Padding: 10px 24px
Border-radius: 4px
Font: 14px, bold
Cursor: Pointer
On Click: Open New Report Modal
```

---

## 4. RECENT ISSUES TABLE

### Table Structure

```
┌─────┬──────────┬──────────┬─────────┬──────────┬────────┐
│ ID  │ Title    │ Category │ Status  │ Created  │ Action │
├─────┼──────────┼──────────┼─────────┼──────────┼────────┤
│ #123│ Broken   │ Facilities   │ Resolved│ 2d ago  │ [View]│
│     │ Light    │              │        │         │ [Share]│
├─────┼──────────┼──────────┼─────────┼──────────┼────────┤
│ #122│ WiFi     │ IT & Tech    │ In Prog │ 5d ago  │ [View]│
│     │ Issue    │              │        │         │ [Share]│
├─────┼──────────┼──────────┼─────────┼──────────┼────────┤
│ #121│ Broken   │ Facilities   │ Pending │ 1w ago  │ [View]│
│     │ Door     │              │        │         │ [Share]│
└─────┴──────────┴──────────┴─────────┴──────────┴────────┘

[< Prev] 1 2 3 [Next >]
```

### Table Columns

| Column | Width | Data | Format |
|--------|-------|------|--------|
| ID | 80px | Complaint ID | #XXX |
| Title | 200px | Complaint title | Truncated to 50 chars |
| Category | 130px | Category badge | Colored pill badge |
| Status | 110px | Status badge | Colored pill badge |
| Created | 100px | Date created | "2d ago" format |
| Action | 80px | Action buttons | [View] dropdown |

### Status Badge Colors

```css
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}

.status-pending {
  background: rgba(243, 156, 18, 0.1);
  color: #D68910;
  border: 1px solid #D68910;
}

.status-in-progress {
  background: rgba(52, 152, 219, 0.1);
  color: #2980B9;
  border: 1px solid #2980B9;
}

.status-resolved {
  background: rgba(34, 153, 84, 0.1);
  color: #229954;
  border: 1px solid #229954;
}

.status-on-hold {
  background: rgba(155, 89, 182, 0.1);
  color: #8E44AD;
  border: 1px solid #8E44AD;
}
```

### Category Badge Colors

```css
.category-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.category-facilities { background: rgba(230, 126, 34, 0.1); color: #E67E22; }
.category-it { background: rgba(52, 152, 219, 0.1); color: #2980B9; }
.category-security { background: rgba(192, 57, 43, 0.1); color: #C0392B; }
.category-academic { background: rgba(155, 89, 182, 0.1); color: #8E44AD; }
.category-student { background: rgba(46, 204, 113, 0.1); color: #27AE60; }
```

### Row Hover Effect

```css
.table tbody tr {
  transition: background-color var(--duration-quick);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
  }
}
```

### Pagination

```
[< Prev] 1 2 3 4 5 [Next >]

Items per page: [10 ▼] Show 10 of 47 results
```

---

## 5. ACTIVITY TIMELINE

### Timeline Layout

```
┌─────────────────────────────────────┐
│        Activity Timeline            │
├─────────────────────────────────────┤
│                                     │
│  🔵 Submitted by You                │
│  May 10, 2026 at 2:30 PM            │
│  "New complaint created"            │
│                                     │
│  ↓                                  │
│                                     │
│  🟢 Verified by Faculty             │
│  May 11, 2026 at 9:15 AM            │
│  "Complaint verified. Priority: High"
│                                     │
│  ↓                                  │
│                                     │
│  🟡 In Progress                     │
│  May 12, 2026 at 10:00 AM           │
│  "Assigned to Operations Team"      │
│                                     │
│  ↓                                  │
│                                     │
│  (Current)                          │
│                                     │
└─────────────────────────────────────┘
```

### Timeline CSS

```css
.timeline {
  position: relative;
  padding: 24px;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  margin-bottom: 32px;
  
  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    width: 16px;
    height: 16px;
    background: currentColor;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 19px;
    top: 20px;
    width: 2px;
    height: calc(100% + 32px);
    background: #E0E0E0;
  }
  
  &:last-child::after {
    display: none;
  }
}

.timeline-item.active {
  color: #2980B9;
}

.timeline-item.completed {
  color: #229954;
}
```

---

## 6. NOTIFICATION TOAST

### Toast Notification

```
┌──────────────────────────────────┐
│ ✓ Complaint #123 submitted       │
│   successfully!                  │
│                              [✕] │
└──────────────────────────────────┘
```

### Toast Variants

**Success Toast**
```css
.toast.success {
  background: rgba(34, 153, 84, 0.1);
  border-left: 4px solid #229954;
  color: #229954;
  icon: ✓ (Green)
}
```

**Error Toast**
```css
.toast.error {
  background: rgba(199, 55, 44, 0.1);
  border-left: 4px solid #C7372C;
  color: #C7372C;
  icon: ✕ (Red)
}
```

**Info Toast**
```css
.toast.info {
  background: rgba(52, 152, 219, 0.1);
  border-left: 4px solid #2980B9;
  color: #2980B9;
  icon: ℹ (Blue)
}
```

**Warning Toast**
```css
.toast.warning {
  background: rgba(243, 156, 18, 0.1);
  border-left: 4px solid #F39C12;
  color: #F39C12;
  icon: ⚠ (Orange)
}
```

### Toast CSS

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 20px;
  border-radius: 6px;
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  animation: slideUp var(--duration-base) var(--ease-out);
  z-index: var(--z-notification);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Auto-dismiss**: 4 seconds

---

## 7. NEW REPORT MODAL

### Modal Structure

```
┌───────────────────────────────────┐
│ Create New Complaint         [✕]  │
├───────────────────────────────────┤
│                                   │
│ [Title Input Field]               │
│ "Brief description of issue"      │
│                                   │
│ [Description Textarea]            │
│ "Detailed information..."         │
│                                   │
│ [Category Dropdown]               │
│ "Select category"                 │
│                                   │
│ [Location Picker]                 │
│ "Choose location on campus"       │
│                                   │
│ [Photo Upload]                    │
│ "Upload up to 5 photos"           │
│ [Drag and drop or click]          │
│                                   │
│ [Priority Selector]               │
│ ○ Low  ○ Medium  ○ High           │
│                                   │
├───────────────────────────────────┤
│ [Cancel]              [Submit]    │
└───────────────────────────────────┘
```

### Modal Fields

**Title Input**
- Label: "Complaint Title *"
- Placeholder: "Brief description of the issue"
- Max length: 100 characters
- Character counter: "45 / 100"
- Required: Yes

**Description Textarea**
- Label: "Description *"
- Placeholder: "Provide detailed information about the issue..."
- Max length: 1000 characters
- Rows: 4
- Resizable: Vertical only
- Required: Yes

**Category Dropdown**
- Label: "Category *"
- Options: [All from FEATURE_SPECIFICATION.md]
- Required: Yes
- Has search/filter

**Location Picker**
- Label: "Location"
- Type: Interactive campus map or text input
- Shows: Building + Room number
- Optional

**Photo Upload**
- Label: "Photos (Optional)"
- Max files: 5
- Max size per file: 5MB
- Accepted formats: JPG, PNG, WebP
- Drag-and-drop supported
- Preview thumbnails

**Priority Selector**
- Label: "Priority"
- Type: Radio buttons
- Options: Low, Medium, High
- Default: Medium
- Help text: "Based on your assessment"

### Modal Behavior

```javascript
// On Title input
- Real-time character count
- Show warning at 90% (90 chars)
- Disable submit if empty

// On Category selection
- Show/hide optional fields based on category
- Some categories might have specific questions

// On Photo upload
- Show preview
- Allow removal/reorder
- Compress images before upload
- Show upload progress

// On Submit
- Validate all required fields
- Show loading spinner
- Disable submit button
- Display success toast
- Redirect to complaint detail (or close modal)
```

---

## 8. COMPLAINT DETAIL VIEW

### Detail Modal

```
┌─────────────────────────────────────────┐
│ Complaint #123                  [✕]    │
├─────────────────────────────────────────┤
│                                         │
│ Title: Broken Light in Building A      │
│ Category: Facilities                    │
│ Status: In Progress  [Update ▼]        │
│                                         │
│ ┌──────────────────────────────────┐   │
│ │ Description:                     │   │
│ │ The light fixture in room 205... │   │
│ └──────────────────────────────────┘   │
│                                         │
│ Location: Building A, Room 205         │
│ Created: May 10, 2026                  │
│ Updated: May 12, 2026                  │
│                                         │
│ Photos:                                 │
│ [Thumbnail] [Thumbnail] [Thumbnail]   │
│                                         │
│ Status Timeline:                        │
│ • Submitted: May 10                     │
│ • Verified: May 11                      │
│ • In Progress: May 12                   │
│                                         │
│ Comments (2):                           │
│ ┌──────────────────────────────────┐   │
│ │ Faculty Member:                  │   │
│ │ "Escalated to operations team"   │   │
│ │ May 11, 9:15 AM                  │   │
│ └──────────────────────────────────┘   │
│                                         │
│ [Add Comment...]                        │
│                                         │
├─────────────────────────────────────────┤
│              [Close]                    │
└─────────────────────────────────────────┘
```

---

## 9. RESPONSIVE BEHAVIOR

### Desktop (1024px+)
- 4-column KPI cards
- Full table visible
- Timeline on right sidebar or below
- Modals: 600px max width, centered

### Tablet (768px - 1024px)
- 2-column KPI cards
- Table with horizontal scroll
- Timeline below content
- Modals: 500px max width

### Mobile (< 768px)
- 1-column KPI cards (stacked)
- Table collapses to cards (one per row)
- Full-screen modals (height: 100vh)
- Filters collapse into drawer
- Pagination simplified to [< Prev] [Next >]

---

## 10. INTERACTION STATES

### Button States

**Primary Button**
```
Default: #C7372C background
Hover: #A01C15 (darker)
Focus: Add outline + glow
Active: Pressed effect (slight scale)
Disabled: 50% opacity, cursor: not-allowed
Loading: Show spinner, disable interaction
```

### Input States

**Focus**
```
Border: 2px solid #C7372C
Shadow: 0 0 0 3px rgba(199, 55, 44, 0.1)
```

**Error**
```
Border: 2px solid #C7372C
Background: rgba(199, 55, 44, 0.05)
Error message: Red text below input
```

**Disabled**
```
Background: #F5F5F5
Color: #BDBDBD
Cursor: not-allowed
```

### Row Hover (Table)

```
Background: rgba(0, 0, 0, 0.03)
Shadow: inset 0 0 8px rgba(0, 0, 0, 0.05)
```

---

## 11. ACCESSIBILITY

### Keyboard Navigation
- Tab through: Search → Filters → Table → Pagination
- Enter: Activate buttons, open modals
- Escape: Close modals
- Arrow keys: Navigate table rows

### Screen Reader
- `<label>` for all form inputs
- `aria-label` for icon buttons
- `aria-live="polite"` for toast notifications
- Semantic HTML: `<main>`, `<nav>`, `<section>`
- Table headers marked with `<th scope="col">`

### Color Contrast
- All text: 4.5:1 minimum
- UI components: 3:1 minimum
- Status badges: Sufficient contrast

### Focus Indicators
- 2px outline on keyboard focus
- Visible on all interactive elements

---

## 12. ANIMATION SPECIFICATIONS

### Page Load
```
KPI Cards: Fade in + slide down (stagger 50ms)
Table rows: Fade in (200ms each)
Timeline: Scroll into view
```

### Interactions
```
Button hover: Scale 1.02 (100ms)
Modal open: Fade + slide down (200ms)
Toast: Slide up (150ms)
Status update: Pulse effect (500ms)
```

### Micro-interactions
```
Checkbox: Scale + checkmark animation (150ms)
Dropdown open: Slide down (150ms)
Tooltip: Fade in (100ms)
Loading: Spinner rotation (1s infinite)
```

---

## Implementation Checklist

- [ ] Layout structure HTML
- [ ] Sidebar & navbar components
- [ ] KPI cards with animations
- [ ] Filter bar with inputs
- [ ] Table with sorting/pagination
- [ ] Activity timeline
- [ ] New report modal with form
- [ ] Detail view modal
- [ ] Toast notifications
- [ ] Responsive CSS for all breakpoints
- [ ] Accessibility testing
- [ ] Animation smoothness check
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Dark mode support

---

**Status**: ✅ Complete
**Version**: 1.0
**Date**: May 13, 2026
