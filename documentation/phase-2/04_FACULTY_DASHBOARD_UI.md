# Faculty Dashboard UI Specification

## Overview

The Faculty Dashboard enables faculty members and department heads to verify, prioritize, assign, and track complaints. It provides queue management, escalation control, and department performance metrics.

**Primary Users**: Faculty, Department Heads
**Purpose**: Verify, assign, and manage complaint workflow
**Access Level**: Faculty + Staff only

---

## 1. PAGE LAYOUT

### Full Layout Structure

```
┌──────────────────────────────────────────────────────┐
│ NAVBAR                                               │
├─────────────┬──────────────────────────────────────┤
│             │                                      │
│  SIDEBAR    │      MAIN CONTENT AREA              │
│  Navigation │                                      │
│             │  [Status Tabs: All|Pending|InProg]  │
│             │  [Filter Bar with Search]           │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ Queue Stats Cards               │ │
│             │  │ [Pending] [InProg] [Resolved]   │ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ Complaint Queue (Sortable Table)│ │
│             │  │ [ID][Student][Issue][Assign]    │ │
│             │  │ [Row 1] [Row 2] [Row 3]         │ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
│             │  ┌─────────────────────────────────┐ │
│             │  │ Team Workload                   │ │
│             │  │ [Staff 1] [Staff 2] [Staff 3]   │ │
│             │  └─────────────────────────────────┘ │
│             │                                      │
└─────────────┴──────────────────────────────────────┘
```

---

## 2. STATUS TABS

### Tab Navigation

```
┌─────────────────────────────────────┐
│ All (47)  Pending (12)  In Progress (15)  Resolved (20) │
│ ────────  ──────────    ──────────────    ──────────    │
│           Selected Tab (underline)                      │
└─────────────────────────────────────┘
```

### Tab Styling

```css
.tab {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: --color-text-secondary;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--duration-base);
  position: relative;
}

.tab:hover {
  color: --color-text-primary;
}

.tab.active {
  color: --color-primary-base;
  border-bottom-color: --color-primary-base;
}

.tab-badge {
  display: inline-block;
  background: --color-bg-secondary;
  border-radius: 12px;
  padding: 2px 8px;
  margin-left: 6px;
  font-size: 12px;
  color: --color-text-secondary;
  font-weight: 600;
}

.tab.active .tab-badge {
  background: rgba(199, 55, 44, 0.1);
  color: --color-primary-base;
}
```

---

## 3. FILTER BAR

### Filter Layout

```
┌─────────────────────────────────────────────────────┐
│ [Search] [Priority Filter] [Category] [Assign To]  │
│ [Date Range] [Clear Filters]                        │
└─────────────────────────────────────────────────────┘
```

### Filter Components

**Search Box**
- Placeholder: "Search by complaint ID or student name..."
- Width: 200px
- Searches: ID, title, student name, description

**Priority Filter**
```
Options:
  - All (default)
  - Low
  - Medium
  - High
  - Critical
  
Width: 120px
```

**Category Filter**
```
Same as student dashboard
```

**Assign To Filter**
```
Options:
  - Unassigned (default for "Pending" tab)
  - [List of faculty/staff]
  - My Tasks (shows only user's assigned tasks)
  
Width: 140px
```

**Date Range**
- From: "Select date"
- To: "Select date"
- Width: 200px

**Clear Filters Button**
- Text: "Clear All"
- Style: Ghost button
- Action: Reset all filters

---

## 4. QUEUE STATS CARDS

### Stats Cards Layout

```
[Pending]      [In Progress]    [Resolved Today]
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│ 12       │  │ 15           │  │ 5            │
│ Pending  │  │ In Progress  │  │ Resolved     │
│ +3 new   │  │ -2 completed │  │ +2 today     │
└──────────┘  └──────────────┘  └──────────────┘
```

### Stats Card Spec

**Card 1: Pending Complaints**
```
Title: "Pending"
Value: "12"
Trend: "+3 new this week"
Icon: 📋
Color Bar: Orange (#F39C12)
On Click: Filter to pending tab
```

**Card 2: In Progress**
```
Title: "In Progress"
Value: "15"
Trend: "-2 completed this week"
Icon: ⚙️
Color Bar: Blue (#2980B9)
On Click: Filter to in-progress tab
```

**Card 3: Resolved Today**
```
Title: "Resolved Today"
Value: "5"
Trend: "On pace for 25 this week"
Icon: ✓
Color Bar: Green (#229954)
On Click: Show daily analytics
```

### Card Styling

```css
.stats-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--card-color);
  cursor: pointer;
  transition: all var(--duration-quick);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

.stats-value {
  font-size: 32px;
  font-weight: 700;
  color: --color-text-primary;
  margin: 8px 0;
}

.stats-trend {
  font-size: 12px;
  color: #229954;
}
```

---

## 5. COMPLAINT QUEUE TABLE

### Table Structure

```
┌──────┬─────────┬──────────┬──────────┬─────────┬──────────┬────────┐
│ ID   │ Student │ Issue    │ Category │ Priority│ Created  │ Action │
├──────┼─────────┼──────────┼──────────┼─────────┼──────────┼────────┤
│ #123 │ John D. │ Broken   │ Facilities│ High   │ 2d ago   │[Assign]│
│      │         │ Light    │          │        │          │ [View] │
├──────┼─────────┼──────────┼──────────┼─────────┼──────────┼────────┤
│ #122 │ Sarah M.│ WiFi     │ IT & Tech│ Medium │ 5d ago   │[Assign]│
│      │         │ Down     │          │        │          │ [View] │
└──────┴─────────┴──────────┴──────────┴─────────┴──────────┴────────┘
```

### Table Columns

| Column | Width | Data | Format |
|--------|-------|------|--------|
| ID | 70px | Complaint ID | #XXX |
| Student | 100px | Student name | "John Doe" |
| Issue | 150px | Complaint title | Truncated |
| Category | 100px | Category badge | Colored |
| Priority | 90px | Priority badge | Color-coded |
| Created | 90px | Date | "2d ago" |
| Action | 100px | Buttons | [Assign] [View] |

### Priority Badge Colors

```css
.priority-low { background: rgba(52, 152, 219, 0.1); color: #2980B9; }
.priority-medium { background: rgba(243, 156, 18, 0.1); color: #F39C12; }
.priority-high { background: rgba(231, 76, 60, 0.1); color: #E74C3C; }
.priority-critical { background: rgba(0, 0, 0, 0.1); color: #000; }
```

### Row Interactions

**Hover Effect**
```css
.queue-row:hover {
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.05);
}
```

**Selected Row**
```css
.queue-row.selected {
  background-color: rgba(199, 55, 44, 0.08);
  border-left: 4px solid --color-primary-base;
}
```

**Quick Actions**
```
[Assign Button] → Opens Assign Modal
[View Button] → Opens Detail Modal
```

### Sorting

Sortable columns:
- ID (ascending/descending)
- Student (A-Z / Z-A)
- Priority (Low → High / High → Low)
- Created (Newest / Oldest)

```
Click column header to sort
Show sort indicator: ↑ or ↓
```

---

## 6. ASSIGN MODAL

### Modal Structure

```
┌─────────────────────────────────────┐
│ Assign Complaint #123         [✕]  │
├─────────────────────────────────────┤
│ Issue: Broken Light in Building A   │
│ Priority: High                      │
│ Current: Unassigned                 │
│                                     │
│ Assign To:                          │
│ ┌─────────────────────────────────┐ │
│ │ ○ John Smith (3 active tasks)  │ │
│ │ ○ Sarah Johnson (5 active)      │ │
│ │ ○ Mike Chen (2 active)          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Set Priority:                       │
│ ○ Low  ○ Medium  ◉ High  ○ Critical│
│                                     │
│ Add Note:                           │
│ ┌─────────────────────────────────┐ │
│ │ "Please prioritize water damage"│ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Cancel]              [Assign]      │
└─────────────────────────────────────┘
```

### Modal Fields

**Assign To (Radio List)**
```
Show faculty/staff members:
- Name
- Current active task count
- Workload percentage (visual bar)

Select one radio button
Sort by: Least busy → Most busy
```

**Set Priority**
```
Radio buttons:
- Low (Gray)
- Medium (Orange)
- High (Red)
- Critical (Black)

Can change from current
```

**Add Note**
```
Textarea for internal note
Max: 200 chars
Example: "Contact student first"
Optional field
```

### Assignment Confirmation

**Success State**
```
Toast: "✓ Assigned to Sarah Johnson"
Table row: Updates assignee, status changes
Notification: Sent to assigned staff
```

---

## 7. TEAM WORKLOAD WIDGET

### Workload Layout

```
┌────────────────────────────────────────┐
│ Team Workload Distribution             │
├────────────────────────────────────────┤
│                                        │
│ John Smith                             │
│ ████████░░░░░░░░░░░░░░░░ 3/8 tasks   │
│                                        │
│ Sarah Johnson                          │
│ ██████████████░░░░░░░░░░ 5/8 tasks   │
│                                        │
│ Mike Chen                              │
│ ██░░░░░░░░░░░░░░░░░░░░░░ 1/8 tasks   │
│                                        │
│ Emma Lee                               │
│ ████████████░░░░░░░░░░░░ 4/8 tasks   │
│                                        │
│ [View Detailed Workload]               │
│                                        │
└────────────────────────────────────────┘
```

### Workload Bar Spec

```css
.workload-bar-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.workload-name {
  width: 120px;
  font-size: 14px;
  font-weight: 500;
}

.workload-bar {
  flex: 1;
  height: 8px;
  background: --color-bg-secondary;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 12px;
  
  .workload-fill {
    height: 100%;
    background: linear-gradient(90deg, #2980B9, #E74C3C);
    border-radius: 4px;
    transition: width 0.3s ease-out;
  }
}

.workload-text {
  width: 80px;
  text-align: right;
  font-size: 12px;
  color: --color-text-secondary;
}
```

**Color Coding**:
- 0-30%: Green (#229954)
- 30-70%: Orange (#F39C12)
- 70-100%: Red (#E74C3C)

### Click Behavior

**Click on workload bar** → Opens staff detail modal with their assigned tasks

---

## 8. VERIFICATION PANEL

### Verification Flow

```
Complaint appears in queue
         ↓
Faculty clicks [View]
         ↓
Opens Detail Modal with Verification Checklist
         ↓
Faculty:
  □ Read complaint details
  □ Review photos
  □ Check category accuracy
  □ Set priority
  □ [Approve] or [Reject]
         ↓
If Approved: Moves to "In Progress"
If Rejected: Returns to student with feedback
```

### Verification Modal

```
┌─────────────────────────────────────────┐
│ Verify Complaint #123                   │
├─────────────────────────────────────────┤
│                                         │
│ Student: John Doe                       │
│ Issue: Broken Light in Building A      │
│                                         │
│ Verification Checklist:                 │
│ ☑ Issue is within university scope     │
│ ☑ Complaint has necessary details      │
│ ☑ Photos are relevant (if any)         │
│ ☑ No duplicate complaint exists        │
│                                         │
│ Recommended Category: Facilities        │
│ Your Assessment: Facilities ✓           │
│                                         │
│ Suggested Priority: Medium              │
│ Your Assessment: High (reason below)    │
│ [Text: "Light in hallway is hazard"]   │
│                                         │
│ Decision:                               │
│ ◉ Approve  ○ Reject  ○ Needs Info      │
│                                         │
│ [Reject Reason] (if selected)           │
│                                         │
├─────────────────────────────────────────┤
│ [Cancel]         [Save & Continue]      │
└─────────────────────────────────────────┘
```

---

## 9. ESCALATION INTERFACE

### Escalation Panel

```
Quick Escalation Actions:

[Flag for HOD Review]
  Description: "Requires department head decision"
  Use case: Complex, policy-related issues

[Escalate to External]
  Description: "Route to external contractor"
  Use case: Specialized expertise needed

[Mark as Emergency]
  Description: "Safety-critical issue"
  Use case: Immediate action required
  
[Request Additional Info]
  Description: "Contact student for clarification"
  Use case: Missing information
```

### Escalation Modal

```
┌──────────────────────────────────┐
│ Escalate Complaint #123    [✕]  │
├──────────────────────────────────┤
│                                  │
│ Escalation Type:                 │
│ ○ HOD Review                     │
│ ○ External Contractor            │
│ ○ Emergency Response             │
│ ○ Information Request            │
│                                  │
│ Reason:                          │
│ [Text area with reason]          │
│                                  │
│ Attach Documents:                │
│ [Upload files if needed]         │
│                                  │
├──────────────────────────────────┤
│ [Cancel]     [Escalate]          │
└──────────────────────────────────┘
```

---

## 10. BULK ACTIONS

### Bulk Operation Bar

```
┌────────────────────────────────────────┐
│ ☑ All (15)  [Assign to...] [Export]   │
│ Individual:                            │
│ ☑ [ID #123] [ID #124] [ID #125]       │
└────────────────────────────────────────┘
```

### Bulk Actions

- **Assign to:** Select staff member, assign all selected
- **Change Priority:** Bulk priority update
- **Change Category:** Reassign categories
- **Export:** CSV export of selected complaints
- **Print:** Bulk print complaints

---

## 11. FILTERS DRAWER (MOBILE)

### Mobile Filter Drawer

```
Slide-out drawer (from left or bottom):

[Search]
[Tab Selection]
[Filters]
  ☑ Priority: Low, Medium, High
  ☑ Category: Multiple select
  ☑ Assignee: Dropdown
  ☑ Status: Tabs
  ☑ Date Range: Calendar

[Apply Filters] [Clear All]
```

---

## 12. RESPONSIVE BEHAVIOR

### Desktop (1024px+)
- Stats cards in row of 3
- Table full width with all columns
- Workload widget on right or below
- Filters always visible as bar

### Tablet (768px - 1024px)
- Stats cards stack to 2 columns
- Table with horizontal scroll
- Workload widget full width
- Filters collapse to button

### Mobile (< 768px)
- Stats cards stack vertically
- Table becomes card list format
- Workload simplified or hidden
- Filters in drawer/modal
- Action buttons full width

---

## 13. PERMISSIONS & CONDITIONALS

### Faculty Member View
- Can: View own department's complaints
- Can: Assign to team members
- Can: Update status
- Cannot: View other departments
- Cannot: Delete complaints

### Department Head (HOD) View
- Can: View all department complaints
- Can: Assign to any team member
- Can: Override assignments
- Can: Access analytics
- Can: Access escalation panel
- Cannot: Modify student access

### Admin View
- Can: View all complaints
- Can: Override any decision
- Can: Access all escalations
- Can: Modify department settings

---

## Implementation Checklist

- [ ] Status tab navigation
- [ ] Filter bar with all inputs
- [ ] Stats cards with animations
- [ ] Complaint queue table with sorting
- [ ] Assign modal with staff list
- [ ] Workload widget with visual bars
- [ ] Verification panel
- [ ] Escalation interface
- [ ] Bulk actions selection
- [ ] Mobile filter drawer
- [ ] Responsive layout for all breakpoints
- [ ] Permission-based UI elements
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success confirmations

---

**Status**: ✅ Complete
**Version**: 1.0
**Date**: May 13, 2026
