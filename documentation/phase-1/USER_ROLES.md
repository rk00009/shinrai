# SHINRAI User Roles & Workflows

## User Role Hierarchy

```
┌─────────────────────────────────────────────────┐
│  ADMIN (System Administrator)                   │
│  - User management                              │
│  - System configuration                         │
│  - Campus-wide analytics                        │
│  - Emergency controls                           │
└──────────────┬──────────────────────────────────┘
               │
    ┌──────────┴───────────┐
    │                      │
┌───▼──────────────┐  ┌────▼──────────────────┐
│ HOD              │  │ Faculty/Department    │
│ (Admin)          │  │ Staff                 │
│ - Team management│  │ - Issue assignment    │
│ - Performance    │  │ - Status updates      │
│ - Escalations    │  │ - Team coordination   │
│ - Reports        │  │ - Resolution notes    │
└───┬──────────────┘  └────┬──────────────────┘
    │                       │
    └───────────┬───────────┘
                │
        ┌───────┴────────┐
        │                │
    ┌───▼──────────┐  ┌─▼────────────────┐
    │ Operational  │  │ Student          │
    │ Team         │  │ (General User)   │
    │ - Field work │  │ - Submit issues  │
    │ - Updates    │  │ - Track status   │
    │ - Photos     │  │ - Feedback       │
    │ - Closure    │  │ - View history   │
    └──────────────┘  └──────────────────┘
```

---

## Role Definitions

### 1. ADMIN (System Administrator)

**Permissions**:
- Full system access
- User management
- System configuration
- Global analytics
- Emergency shutdown

**Key Workflows**:

| Task | Action |
|------|--------|
| Create User | Admin → User Registration |
| Assign Role | Admin → User Role Assignment |
| Configure SLA | Admin → SLA Settings |
| View Analytics | Admin → System Dashboard |
| Monitor System | Admin → Health Checks |

**Dashboard Access**:
- System health
- All departments
- All users
- All complaints
- Configuration panel

---

### 2. HOD (Head of Department)

**Permissions**:
- Manage department staff
- View department analytics
- Handle escalations
- Set department policies
- Approve high-priority escalations

**Responsibilities**:
- Monitor team performance
- Approve escalations
- Resource planning
- Performance reviews
- Budget management

**Key Workflows**:

| Task | Action |
|------|--------|
| View Team Workload | HOD → Department Dashboard |
| Monitor Performance | HOD → KPI Dashboard |
| Handle Escalation | Escalation Alert → HOD Decision |
| Assign Staff | HOD → Staff Assignment |
| Generate Reports | HOD → Report Generation |

**Dashboard Access**:
- Department metrics
- Team workload
- Performance KPIs
- Escalation queue
- Department reports

---

### 3. FACULTY/DEPARTMENT STAFF

**Permissions**:
- Assign issues to operatives
- Update issue status
- Add resolution notes
- Escalate issues
- View department dashboard

**Responsibilities**:
- Review incoming issues
- Assign to operational team
- Coordinate resolution
- Provide updates
- Recommend escalation

**Key Workflows**:

| Task | Action |
|------|--------|
| Review New Complaint | Complaint Alert → Faculty View |
| Assign Issue | Faculty → Select Operative → Assign |
| Update Status | Operative Update → Faculty Approval |
| Add Resolution Note | Faculty → Add Note → Save |
| Escalate | Faculty → Escalation Request → HOD |

**Dashboard Access**:
- New issues queue
- Assigned issues
- Team workload
- Status tracking
- Escalation history

---

### 4. OPERATIONAL TEAM (Maintenance/Field Workers)

**Permissions**:
- View assigned issues
- Update progress
- Upload photos
- Mark as complete
- View assignment details

**Responsibilities**:
- Execute work orders
- Update status regularly
- Provide photo evidence
- Note time spent
- Complete assignments

**Key Workflows**:

| Task | Action |
|------|--------|
| View Assignment | Mobile/Web → My Tasks |
| Update Progress | Operative → Status Update |
| Upload Evidence | Photo Capture → Upload |
| Mark Complete | Operative → Complete → Submit |
| Time Tracking | Log hours → Save |

**Dashboard Access**:
- Assigned tasks
- Task details
- Progress history
- Time tracking
- Completion history

---

### 5. STUDENT (Issue Reporter)

**Permissions**:
- Submit complaints
- Track status
- View history
- Provide feedback
- View estimated resolution time

**Responsibilities**:
- Clear problem description
- Provide photos
- Respond to questions
- Provide feedback
- Accept resolution

**Key Workflows**:

| Task | Action |
|------|--------|
| Submit Complaint | Student → Form → Submit |
| Upload Photos | Student → Select Images → Upload |
| Track Status | Student → Dashboard → View Status |
| Receive Updates | Notification → Student |
| Provide Feedback | Resolution Complete → Feedback Form |

**Dashboard Access**:
- My issues
- Status tracking
- Timeline history
- AI insights (estimated time)
- Feedback form

---

## Complete User Workflows

### Workflow 1: Complaint Submission & Routing

```
1. STUDENT SUBMITS
   Student → Portal → Fill Form
   - Title: "Broken light in Building A"
   - Description: "Light fixture damaged"
   - Category: [Select/AI suggests]
   - Upload Photo: [Image of damage]
   - Location: Building A, Room 201

2. SYSTEM VERIFICATION
   System → NLP → Categorize: "Facilities"
   System → CV → Severity: "Medium"
   System → Duplicate Check → Similar: 0
   System → Predict Priority: "High"
   System → Assign SLA: "5 days"

3. AUTO-ROUTING
   System → Route to "Facilities Department"
   System → Notify HOD: "New complaint"
   System → Queue Status: "Pending Assignment"

4. FACULTY REVIEW
   HOD → Dashboard → View New Complaints
   Faculty → Review Details & AI Insights
   Faculty → Assign to "John (Electrician)"
   Faculty → Notify John: "New assignment"

5. OPERATIONAL TEAM
   John → Mobile App → View Assignment
   John → Confirm Receipt
   John → Navigate to Location
   John → Perform Work
   John → Upload Completion Photo
   John → Mark Complete: "Fixed & Tested"

6. STUDENT FEEDBACK
   System → Notify Student: "Issue resolved"
   Student → View Details & Photo
   Student → Rate Experience: ⭐⭐⭐⭐⭐
   Student → Add Comment: "Great job!"
   System → Archive: Complete
```

---

### Workflow 2: Escalation Due to SLA Breach

```
1. ISSUE CREATED
   Created: May 13, 2:00 PM
   SLA: 5 days → Deadline: May 18, 2:00 PM

2. MONITORING
   System → Background Task → Every Hour
   Check: SLA Status
   
3. ESCALATION TRIGGER
   May 17, 10:00 AM
   Time Remaining: 16 hours
   Escalation Threshold: 24 hours
   
4. AUTOMATIC ESCALATION
   System → Alert to HOD: "SLA Breach Alert"
   System → Change Priority: Medium → High
   System → Flag for Escalation
   
5. HOD RESPONSE
   HOD → Alert Notification
   HOD → View Complaint Details
   HOD → Options:
      a) Add more resources
      b) Fast-track resolution
      c) Extend SLA (with reason)
      d) Escalate to Admin
   
6. RESOLUTION
   System → Implement Action
   System → Update Status: "Escalated"
   System → Notify All Parties
```

---

### Workflow 3: Admin System Management

```
1. USER MANAGEMENT
   Admin → User Management Panel
   Admin → Create User: "new_faculty@uni.edu"
   Admin → Assign Role: "Faculty"
   Admin → Set Department: "Facilities"
   Admin → Activate: Send Credentials

2. CONFIGURATION
   Admin → Settings Panel
   Admin → Set SLA by Category:
      - Facilities: 5 days
      - IT: 3 days
      - Security: 24 hours
   Admin → Configure Notifications
   Admin → Set Escalation Rules

3. MONITORING
   Admin → Dashboard
   Admin → View Metrics:
      - Total Issues: 247
      - Avg Resolution: 8 days
      - Satisfaction: 92%
      - SLA Compliance: 94%

4. REPORTING
   Admin → Generate Report:
      - Date Range: May 1-31
      - Department: All
      - Format: PDF
      - Include: Trends, bottlenecks, recommendations
```

---

## Permission Matrix

| Action | Admin | HOD | Faculty | Operative | Student |
|--------|-------|-----|---------|-----------|---------|
| Submit Complaint | ❌ | ❌ | ❌ | ❌ | ✅ |
| View All Complaints | ✅ | ✅ | ✅ | ❌ | ❌ |
| Assign Issue | ❌ | ✅ | ✅ | ❌ | ❌ |
| Update Status | ❌ | ✅ | ✅ | ✅ | ❌ |
| Escalate | ❌ | ✅ | ✅ | ❌ | ❌ |
| Handle Escalation | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Analytics | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configure System | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Own Complaints | ✅ | ❌ | ❌ | ❌ | ✅ |
| Provide Feedback | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Dashboard by Role

### Admin Dashboard
- System health
- All departments
- All users
- Global KPIs
- Configuration panel
- System logs

### HOD Dashboard
- Department metrics
- Team workload
- Performance KPIs
- New escalations
- Department reports
- Team assignments

### Faculty Dashboard
- New complaints queue
- My team's workload
- Current assignments
- Escalation queue
- Department analytics
- Quick actions

### Operative Dashboard
- My tasks
- Task details
- Progress tracking
- Time logging
- Photo uploads
- Task history

### Student Dashboard
- My complaints
- Status tracking
- Timeline view
- Estimated time
- AI insights
- Feedback form

---

**Status**: ✅ Complete
**Last Updated**: May 13, 2026
