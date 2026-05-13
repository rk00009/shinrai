# Operational Dashboard UI Specification

## Overview

The Operational Dashboard is designed for field workers and operational staff to view assigned tasks, log work progress, track SLA compliance, and update task status in real-time. It's optimized for mobile devices with offline capability.

**Primary Users**: Operational staff, field workers
**Purpose**: Task execution and progress tracking
**Access Level**: Operational team only
**Optimization**: Mobile-first responsive design

---

## 1. PAGE LAYOUT

### Mobile-First Layout (Primary)

```
┌──────────────────────────┐
│ NAVBAR (Mobile Optimized)│
│ [Menu] Logo [SLA Alert] │
├──────────────────────────┤
│ Today's Status:          │
│ 3/5 Tasks Complete      │
├──────────────────────────┤
│ Assigned Tasks Queue     │
│ [Task 1]                │
│ [Task 2]                │
│ [Task 3]                │
│ [Task 4]                │
│ [Task 5]                │
├──────────────────────────┤
│ SLA Status:              │
│ [SLA Gauge Widget]       │
│ On Track / At Risk       │
└──────────────────────────┘
```

### Desktop Layout (Tablet+)

```
┌──────────────────────────────────────┐
│ NAVBAR                               │
├─────────────┬──────────────────────┤
│             │                      │
│  SIDEBAR    │ Today's Summary      │
│             │ [3/5 Tasks Done]     │
│             │ [SLA Status]         │
│             │ [Work Hours: 6hrs]   │
│             │                      │
│             │ Assigned Tasks       │
│             │ [Task Queue]         │
│             │                      │
│             │ [Work Logging]       │
│             │ [Time Log]           │
│             │                      │
└─────────────┴──────────────────────┘
```

---

## 2. TOP NAVIGATION (MOBILE)

### Mobile Navbar (48px height)

```
┌──────────────────────────────────┐
│ [≡ Menu] Logo [⏰ SLA] [⚙ Settings] │
└──────────────────────────────────┘
```

**Components**:
- **Menu Button**: [≡] - Toggle sidebar
- **Logo**: "SHINRAI" or logo icon
- **SLA Alert**: [⏰] - Red dot if SLA at risk, badge with hours remaining
- **Settings**: [⚙] - Account menu

---

## 3. TODAY'S SUMMARY CARD

### Summary Widget

```
┌──────────────────────────────────┐
│ Today's Progress                 │
├──────────────────────────────────┤
│ Tasks:      ▓▓▓░░░░░░░  3/5      │
│ Completion: ▓▓▓▓▓░░░░░░  60%     │
│                                  │
│ Time Logged: 6h 30m / 8h        │
│ Next Task:  In 15 minutes        │
│                                  │
│ SLA Status: ✓ All On Track       │
│                                  │
└──────────────────────────────────┘
```

### Progress Bar CSS

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: --color-bg-secondary;
  border-radius: 4px;
  overflow: hidden;
  margin: 8px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2980B9, #229954);
  border-radius: 4px;
  transition: width 0.3s ease-out;
}

.progress-text {
  font-size: 12px;
  color: --color-text-secondary;
  margin-top: 4px;
}
```

---

## 4. ASSIGNED TASKS QUEUE

### Task Card Layout (Mobile View)

```
┌──────────────────────────────────┐
│ TASK #223                        │
│ Broken Water Leak - Building B   │
├──────────────────────────────────┤
│ Status: Assigned                 │
│ Priority: High ▓▓▓               │
│ SLA: 4 hours remaining           │
│                                  │
│ Location: Building B, Room 105   │
│ Distance: 250m away              │
│                                  │
│ Assigned: 2 hours ago            │
│ Started: Not yet started         │
│                                  │
│ [Start Work]  [Details]          │
└──────────────────────────────────┘
```

### Task Queue List (Stacked)

```
All tasks shown as stack of cards
User swipes/scrolls through tasks
Active/current task at top (highlighted)
```

### Task Card Components

**Header**
```
Task ID: #223 (top left)
Title: "Broken Water Leak - Building B" (truncated)
Status badge: "Assigned" (top right, colored)
```

**Details**
```
Priority: Visual bar (Low/Med/High/Critical)
SLA Timer: "4 hours remaining" (Red if < 1 hour)
Location: "Building B, Room 105" (clickable → maps)
Distance: "250m away" (show GPS distance)
```

**Timeline**
```
Assigned: "2 hours ago"
Started: "Not yet started" or timestamp
Expected Duration: "30 minutes estimated"
```

**Actions**
```
Primary: [Start Work] - Begins timer
Secondary: [Details] - Full task view
Tertiary: [Directions] - Open maps
```

### Task Status Colors

```css
.task-assigned { border-left: 4px solid #F39C12; }
.task-in-progress { border-left: 4px solid #2980B9; }
.task-completed { border-left: 4px solid #229954; }
.task-delayed { border-left: 4px solid #E74C3C; }
```

---

## 5. SLA TRACKING WIDGET

### SLA Gauge Display

```
        ◄─ 4h ─►
        ▓▓▓░░░░░░░░ 40% Used (4 of 10 hours)
        
        Status: ✓ On Track
        
        [Change SLA] [Request Extension]
```

### Desktop SLA View

```
┌────────────────────────┐
│ SLA Dashboard          │
├────────────────────────┤
│                        │
│      ╱─────────╲      │
│     ╱           ╲     │
│    │             │    │
│    │   40% Used  │    │
│    │             │    │
│     ╲           ╱     │
│      ╲─────────╱      │
│                        │
│ 4 hours used           │
│ 6 hours remaining      │
│ 10 hours total         │
│                        │
│ Status: On Track ✓     │
│                        │
└────────────────────────┘
```

### SLA Alert States

**On Track (Green)**
```
> 3 hours remaining
Color: #229954
Icon: ✓
Text: "On Track"
```

**At Risk (Orange)**
```
1-3 hours remaining
Color: #F39C12
Icon: ⚠
Text: "At Risk"
Pulsing animation
```

**Critical (Red)**
```
< 1 hour remaining
Color: #E74C3C
Icon: ✕
Text: "Critical"
Pulsing animation + notification
```

### SLA CSS

```css
.sla-gauge {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    var(--sla-color) 0deg 144deg,
    --color-bg-secondary 144deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
}

.sla-text {
  font-size: 18px;
  font-weight: 700;
  color: --color-text-primary;
}

.sla-warning {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

---

## 6. WORK LOGGING INTERFACE

### Time Logging Panel

```
┌────────────────────────────────┐
│ Work Logging                   │
├────────────────────────────────┤
│ Task: #223 - Water Leak        │
│ Status: In Progress            │
│ Elapsed Time: 00:45:30         │
│ [▐▌ Pause]  [⏹ Stop]            │
│                                │
│ Work Notes:                    │
│ [Text area - save as you type] │
│                                │
│ Time Breakdown:                │
│ - Diagnosis: 10 min            │
│ - Repair: 25 min               │
│ - Cleanup: 10 min              │
│                                │
│ [Save & Next] [Complete Task]  │
└────────────────────────────────┘
```

### Timer Display

```css
.timer-display {
  font-size: 48px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: --color-primary-base;
  text-align: center;
  letter-spacing: 4px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 1; }
}

.timer-running {
  animation: timer-pulse 0.5s ease-in-out infinite;
}

@keyframes timer-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

### Time Breakdown

```
- Diagnosis phase
- Active repair time
- Cleanup/documentation
- Travel time (calculated)

Each segment editable
Total locked to completion time
```

### Work Notes

```
Free-form text area
Auto-save every 30 seconds
Markdown support (optional)
Character count
Tags support (e.g., #photos #blocked-by-supply)
```

---

## 7. TASK DETAIL MODAL

### Full Task Details

```
┌────────────────────────────────────┐
│ Task #223: Water Leak          [✕] │
├────────────────────────────────────┤
│ Student: John Doe                  │
│ Contact: 555-0123 | john@uni.edu   │
│                                    │
│ Location:                          │
│ Building B, Room 105               │
│ Campus Map: [Embedded Map]         │
│ Distance: 250m away                │
│                                    │
│ Issue Description:                 │
│ "Water dripping from ceiling in    │
│  corner of room near window"       │
│                                    │
│ Photos: [Thumbnail] [Thumbnail]    │
│                                    │
│ Priority: High                     │
│ SLA: 4h remaining                  │
│ Materials Needed: [List]           │
│ Special Instructions: [Any]        │
│                                    │
│ History:                           │
│ • Reported: 2 hours ago            │
│ • Verified: 2 hours ago            │
│ • Assigned: 2 hours ago            │
│                                    │
├────────────────────────────────────┤
│ [Back]  [Start]  [Complete]        │
└────────────────────────────────────┘
```

---

## 8. PHOTO CAPTURE & UPLOAD

### Photo Capture Interface

```
┌──────────────────────────────────┐
│ Document Work Progress           │
├──────────────────────────────────┤
│                                  │
│ [📷 Take Photo]  [📁 Upload]     │
│                                  │
│ Before Photos:                   │
│ [Thumb] [Thumb] [+]              │
│                                  │
│ During Photos:                   │
│ [Thumb] [Thumb] [Thumb] [+]      │
│                                  │
│ After Photos:                    │
│ [+] Upload after work            │
│                                  │
│ [Save]                           │
└──────────────────────────────────┘
```

### Photo Sections
1. **Before**: Initial state of task site
2. **During**: Work in progress
3. **After**: Completed work

Each photo can be:
- Taken with device camera
- Annotated with notes
- Tagged with timestamp
- Required for task completion

---

## 9. TASK COMPLETION FLOW

### Completion Modal

```
┌────────────────────────────────────┐
│ Complete Task #223             [✕] │
├────────────────────────────────────┤
│ Are you sure you want to complete  │
│ this task?                         │
│                                    │
│ Task: Water Leak - Building B      │
│ Time Logged: 45 minutes            │
│ Quality Check:                     │
│ ○ Complete & Passed                │
│ ○ Complete & Needs Verification    │
│ ○ Incomplete - Needs Support       │
│                                    │
│ Issue Resolution:                  │
│ ○ Fixed                            │
│ ○ Partial Fix                      │
│ ○ Unable to Resolve                │
│                                    │
│ Next Steps (if incomplete):        │
│ [Description...]                   │
│                                    │
├────────────────────────────────────┤
│ [Cancel]  [Complete Task]          │
└────────────────────────────────────┘
```

### Post-Completion

```
✓ Task Completed
  Task #223 marked complete
  Time logged: 45 minutes
  Photos uploaded
  Notes saved
  
[Next Task: View]
[Dashboard: Return]
```

---

## 10. OFFLINE CAPABILITY

### Offline Features

```
⚠ You are offline
  Working locally. Will sync when connected.

Downloaded Tasks: 5 tasks
  - All task details cached
  - Photos cached
  - Notes saved locally

Status:
  ✓ Can take photos
  ✓ Can log time
  ✓ Can update status
  ✓ Can write notes
  
Sync Status:
  [Sync Now] - When connection restored
  
Last Sync: 5 minutes ago
```

### Offline Queue

```css
.offline-indicator {
  background: rgba(243, 156, 18, 0.1);
  border: 1px solid #F39C12;
  color: #F39C12;
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.sync-button {
  background: --color-primary-base;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

---

## 11. NOTIFICATIONS

### Push Notifications

**New Task Assigned**
```
🔔 New Task Assigned
Task #225 - Broken Door
High Priority - 2 hours SLA
[View Task] [Dismiss]
```

**SLA Warning**
```
⚠ SLA Alert
Task #223 - 30 minutes remaining
[Continue Work] [Dismiss]
```

**Task Verification**
```
✓ Task Completed
Task #223 verified as complete
Quality: Passed
[Next Task]
```

---

## 12. RESPONSIVE BREAKPOINTS

### Mobile (< 768px) - PRIMARY
- Full-screen task cards
- Large touch targets
- Vertical layout
- Bottom action buttons
- Expandable sections

### Tablet (768px - 1024px)
- Side-by-side layout: Tasks + Details
- More compact cards
- Horizontal layout for sections

### Desktop (1024px+)
- Dashboard view with sidebar
- Grid layout
- Multiple task preview
- Analytics panel

---

## 13. PERMISSIONS

### Operational Staff
- Can: View assigned tasks
- Can: Log time and notes
- Can: Upload photos
- Can: Update task status
- Can: See own performance metrics
- Cannot: Reassign tasks
- Cannot: Change priorities
- Cannot: View other staff's tasks

### Team Lead
- Can: See all team tasks
- Can: Access team analytics
- Can: View time logs
- Cannot: Override Faculty assignments
- Cannot: Delete tasks

---

## Implementation Checklist

- [ ] Mobile-first responsive layout
- [ ] Today's summary widget
- [ ] Task queue card display
- [ ] SLA gauge widget with alerts
- [ ] Time logging interface
- [ ] Timer display and controls
- [ ] Work notes textarea
- [ ] Task detail modal
- [ ] Photo capture/upload
- [ ] Offline mode support
- [ ] Task completion flow
- [ ] Push notifications
- [ ] Responsive across all screens
- [ ] Touch-optimized buttons
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Sync status indicator

---

**Status**: ✅ Complete
**Version**: 1.0
**Date**: May 13, 2026
