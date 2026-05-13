# Admin Dashboard UI Specification

## Overview

The Admin Dashboard provides system-wide analytics, monitoring, and control. It's designed for administrators to track system health, department performance, SLA compliance, and make data-driven decisions.

**Primary Users**: System administrators, department heads
**Purpose**: System monitoring and analytics
**Access Level**: Admin only
**Focus**: Data visualization and insights

---

## 1. PAGE LAYOUT

### Full Dashboard Layout

```
┌────────────────────────────────────────────────────────┐
│ NAVBAR (Full width with quick actions)                 │
├─────────────┬────────────────────────────────────────┤
│             │ [Date Range Picker]  [Export]          │
│  SIDEBAR    │                                         │
│  (Collap.)  │ ┌──────────────────────────────────┐   │
│             │ │ KEY METRICS (6 cards)            │   │
│             │ │ [Total Issues][Resolved][Rate]   │   │
│             │ │ [Avg Time][Satisfaction][SLA %]  │   │
│             │ └──────────────────────────────────┘   │
│             │                                         │
│             │ ┌──────────────────────────────────┐   │
│             │ │ CHARTS (2 columns)               │   │
│             │ │ [Trends] [Distribution]          │   │
│             │ │ [Categories] [Departments]       │   │
│             │ └──────────────────────────────────┘   │
│             │                                         │
│             │ ┌──────────────────────────────────┐   │
│             │ │ TABLE: Department Performance    │   │
│             │ │ Rankings, metrics, trends        │   │
│             │ └──────────────────────────────────┘   │
│             │                                         │
│             │ ┌──────────────────────────────────┐   │
│             │ │ System Health                    │   │
│             │ │ API status, Database, Queues     │   │
│             │ └──────────────────────────────────┘   │
│             │                                         │
└─────────────┴────────────────────────────────────────┘
```

---

## 2. TOP CONTROL BAR

### Control Elements

```
┌────────────────────────────────────────────────────────┐
│ [Date Range: Today ▼] [Comparison: None ▼]             │
│                                      [Export CSV] [Print]│
└────────────────────────────────────────────────────────┘
```

**Date Range Dropdown**
```
Options:
- Today
- Last 7 Days
- Last 30 Days
- Last Quarter
- Last Year
- Custom Range
```

**Comparison Dropdown**
```
Options:
- None (default)
- vs Last Month
- vs Last Quarter
- vs Last Year
- vs Previous Period
```

**Export Button**
```
Formats:
- CSV
- PDF Report
- Excel Dashboard
- Send Email
```

---

## 3. KEY METRICS CARDS (6 cards)

### Metrics Layout

```
Desktop: 6 columns (1 per card)
Tablet: 3 columns (2 rows)
Mobile: 1 column (stacked)
```

### Card 1: Total Complaints

```
┌──────────────┐
│ Total        │
│ Complaints   │
│              │
│ 2,847 ↑      │
│              │
│ +12% vs last │
│ month        │
│              │
│ 📊 Trend: Up │
└──────────────┘
```

**Spec**:
- Value: Large number (48px font)
- Trend: % change + arrow
- Comparison: "vs last month"
- Icon: 📊
- Color: Blue (#2980B9)

### Card 2: Resolved Count

```
┌──────────────┐
│ Resolved     │
│              │
│ 2,475 ↑      │
│              │
│ Resolution   │
│ Rate: 87%    │
│              │
│ ✓            │
└──────────────┘
```

**Spec**:
- Value: Number resolved
- Submetric: Resolution rate %
- Status: Color-coded by performance
- Color: Green (#229954)

### Card 3: Average Resolution Time

```
┌──────────────┐
│ Avg          │
│ Resolution   │
│ Time         │
│              │
│ 8 days ↓     │
│              │
│ -2 days vs   │
│ last month   │
│              │
│ ⏱ Good       │
└──────────────┘
```

**Spec**:
- Value: X days
- Trend: Down is good
- Arrow color: Green if improving
- Color: Orange (#F39C12)

### Card 4: Stakeholder Satisfaction

```
┌──────────────┐
│ Satisfaction │
│              │
│ 92% ↑        │
│ ⭐⭐⭐⭐⭐   │
│              │
│ +1% vs last  │
│ month        │
│              │
│ Excellent    │
└──────────────┘
```

**Spec**:
- Value: % or stars
- Visual: Star rating
- Trend: Direction
- Color: Red (#C7372C)

### Card 5: SLA Compliance

```
┌──────────────┐
│ SLA          │
│ Compliance   │
│              │
│ 94% ↑        │
│              │
│ Breaches: 16 │
│              │
│ On Track ✓   │
│              │
│ Target: 95%  │
└──────────────┘
```

**Spec**:
- Value: % compliance
- Breaches: Count of SLA breaches
- Status: Green if > 90%
- Target: Show goal
- Color: Purple (#8E44AD)

### Card 6: Escalations

```
┌──────────────┐
│ Escalations  │
│              │
│ 24 ↑         │
│              │
│ +8% vs month │
│              │
│ 3 Active     │
│              │
│ Critical: 1  │
└──────────────┘
```

**Spec**:
- Value: Total escalations
- Breakdown: Active, critical, pending
- Trend: Direction
- Color: Red (#E74C3C)

---

## 4. CHARTS SECTION

### Chart 1: Complaints Trend (Line Chart)

```
        │
        │     ╱────╲
        │    ╱      ╲    ╱─
  Count │   ╱        ╲  ╱
        │  ╱          ╲╱
        │────────────────────
        └─ Days      ─
        
Title: "Complaints Trend (Last 30 Days)"
X-axis: Dates
Y-axis: Count
Legend: Line shows trend
Interaction: Hover for exact numbers
```

### Chart 2: Complaints by Category (Pie Chart)

```
     ┌─────────────┐
    │ Facilities  │
    │ 35% █████  │
    ├─────────────┤
    │ IT & Tech   │
    │ 25% ████   │
    ├─────────────┤
    │ Security    │
    │ 18% ███    │
    ├─────────────┤
    │ Academic    │
    │ 15% ██     │
    ├─────────────┤
    │ Student Svc │
    │ 7% █       │
     └─────────────┘
```

**Spec**:
- Pie segments: Color-coded
- Labels: Category name + percentage
- Interaction: Click to filter
- Legend: On right side

### Chart 3: Resolution Status (Stacked Bar)

```
Department    Pending    In-Progress    Resolved
─────────────────────────────────────────────
Facilities    ░░░        ████           ██████████
IT & Tech     ░░         ███            ████████
Security      ░          ██             █████
Academic      ░░░░       ████████       █████
─────────────────────────────────────────────

Legend: [Pending] [In-Progress] [Resolved]
```

### Chart 4: Department Performance (Horizontal Bar)

```
Facilities    ████████████████████ 87%
IT & Tech     █████████████████░░░ 82%
Security      ████████████████░░░░ 76%
Academic      ██████████████░░░░░░ 71%
Student Svc   ██████████░░░░░░░░░░ 52%
─────────────────────────────
Target:       ────────────────── 80%
```

**Spec**:
- Shows: Resolution rate by department
- Target line: 80%
- Color: Green if above target, red if below
- Sortable by: Name, performance, trend

---

## 5. DEPARTMENT PERFORMANCE TABLE

### Table Layout

```
┌─────────────┬────────┬──────────┬────────┬─────────┬────────┐
│ Department  │ Issues │ Resolved │ Rate   │ Avg Day │ SLA %  │
├─────────────┼────────┼──────────┼────────┼─────────┼────────┤
│ Facilities  │ 987    │ 859      │ 87%    │ 8 days  │ 94%    │
│ IT & Tech   │ 712    │ 583      │ 82%    │ 10 days │ 91%    │
│ Security    │ 512    │ 388      │ 76%    │ 12 days │ 87%    │
│ Academic    │ 425    │ 301      │ 71%    │ 14 days │ 84%    │
│ Student Svc │ 211    │ 109      │ 52%    │ 18 days │ 75%    │
└─────────────┴────────┴──────────┴────────┴─────────┴────────┘
```

### Table Columns

| Column | Width | Data | Format |
|--------|-------|------|--------|
| Department | 120px | Dept name | Text |
| Issues | 80px | Total complaints | Number |
| Resolved | 80px | Completed complaints | Number |
| Rate | 80px | Resolution % | Percentage |
| Avg Days | 90px | Average resolution time | X days |
| SLA % | 80px | SLA compliance | Percentage |

### Row Interactions

**Hover**
```css
.dept-row:hover {
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
```

**Click**
```
Opens department detail view with:
- Full department analytics
- Staff performance
- Recent issues
- Trends
```

### Sorting

Sortable columns: All
Click header to toggle ASC/DESC
Sort indicator: ↑ ↓

---

## 6. SYSTEM HEALTH PANEL

### Health Monitoring

```
┌────────────────────────────────────────┐
│ System Health & Monitoring             │
├────────────────────────────────────────┤
│                                        │
│ API Status:            ✓ Healthy       │
│ ████████████████░░░░░  95% uptime     │
│                                        │
│ Database:              ✓ Healthy       │
│ ██████████████████░░   90% capacity    │
│                                        │
│ Message Queue:         ✓ Healthy       │
│ ██░░░░░░░░░░░░░░░░░░  10% utilization│
│                                        │
│ ML Models:             ⚠ Degraded      │
│ NLP: 94%  CV: 83%  Duplicate: 92%     │
│ [Retrain Models]                       │
│                                        │
│ Disk Usage:            ✓ Healthy       │
│ ██████████████░░░░░░░  70% used        │
│                                        │
│ Last Status Check: 2 minutes ago       │
│                                        │
└────────────────────────────────────────┘
```

### Status Indicators

```css
.status-healthy {
  color: #229954;
  icon: ✓
}

.status-degraded {
  color: #F39C12;
  icon: ⚠
}

.status-critical {
  color: #E74C3C;
  icon: ✕
  animation: pulse 1s infinite;
}
```

---

## 7. RECENT ESCALATIONS WIDGET

### Recent Activity

```
┌────────────────────────────────────────┐
│ Recent Escalations (Last 5)            │
├────────────────────────────────────────┤
│ 🔴 CRITICAL - Task #287                │
│    Water leak + structural damage      │
│    Escalated 30 minutes ago            │
│    HOD: Dr. Smith                      │
│    [Assign to Contractor]              │
│                                        │
│ 🟠 HIGH - Task #285                    │
│    WiFi down - entire building         │
│    Escalated 1 hour ago                │
│    HOD: Dr. Johnson                    │
│    [View Details]                      │
│                                        │
│ 🟡 MEDIUM - Task #283                  │
│    AC Maintenance                      │
│    Escalated 2 hours ago               │
│    HOD: Dr. Williams                   │
│    [View Details]                      │
│                                        │
│ [View All Escalations]                 │
└────────────────────────────────────────┘
```

---

## 8. ANALYTICS DETAIL VIEW

### Accessible from clicking metric cards

**Department Detail Example**

```
┌────────────────────────────────────────┐
│ Facilities Department Analytics        │
│ Period: May 2026                       │
├────────────────────────────────────────┤
│                                        │
│ Quick Stats:                           │
│ Total Issues: 987                      │
│ Resolved: 859 (87%)                    │
│ Avg Resolution Time: 8 days            │
│ SLA Compliance: 94%                    │
│ Average Satisfaction: 92%              │
│                                        │
│ Staff Breakdown:                       │
│ John Smith:    15 issues, 14 resolved  │
│ Sarah Jones:   20 issues, 18 resolved  │
│ Mike Chen:     12 issues, 10 resolved  │
│                                        │
│ Category Breakdown:                    │
│ Structural:    35%                     │
│ Electrical:    28%                     │
│ Plumbing:      22%                     │
│ Other:         15%                     │
│                                        │
│ Trends:                                │
│ Issues: ↑ +12% vs last month           │
│ Resolution Rate: ↑ +3%                 │
│ Avg Time: ↓ -2 days                    │
│                                        │
│ SLA Performance:                       │
│ Met: 94%  [████████████░░]             │
│ Breached: 6 (mostly category X)        │
│                                        │
│ [Export Report] [Email Report]         │
│                                        │
└────────────────────────────────────────┘
```

---

## 9. FILTERS & DATE RANGE SELECTOR

### Advanced Filters (Sidebar or Drawer)

```
Filters Applied: 2

Department:
☑ All Departments
  ○ Facilities
  ○ IT & Tech
  ○ Security
  ○ Academic
  ○ Student Services

Category:
☑ All Categories
  ○ Structural
  ○ Electrical
  ○ Plumbing
  ○ etc.

Status:
☑ All
  ○ Completed
  ○ In Progress
  ○ Pending
  ○ Escalated

Comparison:
○ None
○ vs Last Month
○ vs Last Year

[Apply] [Clear]
```

---

## 10. EXPORT & REPORTING

### Export Options

**Export Modal**

```
┌────────────────────────────────────┐
│ Export Report                  [✕] │
├────────────────────────────────────┤
│ Export Format:                     │
│ ○ CSV                             │
│ ○ PDF                             │
│ ○ Excel Dashboard                 │
│ ○ Email                           │
│                                    │
│ Include:                           │
│ ☑ Key Metrics                     │
│ ☑ Charts                          │
│ ☑ Department Table                │
│ ☑ Escalations                     │
│                                    │
│ Period:                            │
│ [Date Range]                       │
│                                    │
│ Recipients (for email):            │
│ [email1@example.com]               │
│ [email2@example.com]               │
│ [+ Add More]                       │
│                                    │
├────────────────────────────────────┤
│ [Cancel]  [Export]                │
└────────────────────────────────────┘
```

---

## 11. RESPONSIVE DESIGN

### Desktop (1024px+)
- Full dashboard visible
- 6 metric cards in row
- Side-by-side charts
- Full-width table
- Sidebar always visible

### Tablet (768px - 1024px)
- 3 metric cards per row
- Charts stacked vertically
- Table scrollable
- Sidebar collapses

### Mobile (< 768px)
- 1-2 metric cards per row
- All charts single column
- Table collapses to cards
- Filters in drawer
- Top controls in modal

---

## 12. PERMISSIONS & CONDITIONAL DISPLAY

### Admin View
- Can: See all data
- Can: Export all reports
- Can: Access all escalations
- Can: View all departments
- Can: See all staff metrics

### Department Head (HOD) View
- Can: See own department data
- Can: See own staff metrics
- Cannot: See other departments
- Cannot: Export other dept data

### System Admin View
- Can: View system health
- Can: Access all escalations
- Can: See all departments
- Can: Export any data
- Can: Manage system settings

---

## Implementation Checklist

- [ ] Date range picker
- [ ] Export functionality
- [ ] Key metrics cards (6)
- [ ] Trend line chart
- [ ] Pie chart (categories)
- [ ] Stacked bar chart (status)
- [ ] Horizontal bar chart (performance)
- [ ] Department performance table
- [ ] System health panel
- [ ] Recent escalations widget
- [ ] Detail view modals
- [ ] Advanced filters
- [ ] Responsive layout
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Real-time updates (optional)
- [ ] Scheduled reports (optional)

---

**Status**: ✅ Complete
**Version**: 1.0
**Date**: May 13, 2026
