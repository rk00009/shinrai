# SHINRAI Workflow Architecture

## Complete Issue Lifecycle

```
START
  │
  ├─ [1] SUBMISSION ────────────────────────────────────────┐
  │                                                           │
  ├─ [2] VERIFICATION (AI Analysis) ────────────────────────┤
  │                                                           │
  ├─ [3] ROUTING (Intelligent Assignment) ──────────────────┤
  │                                                           │
  ├─ [4] ASSIGNMENT (Manual by Faculty) ─────────────────────┤
  │                                                           │
  ├─ [5] WORK IN PROGRESS (Operational Team) ────────────────┤
  │         │                                                 │
  │         ├─ [5a] SLA MONITORING ──────────────────────┐  │
  │         │         (Escalation if breach) ◄──────┐    │  │
  │         │                                        │    │  │
  │         ├─ [5b] STATUS UPDATES ──────────────────┤   │  │
  │         │                                        │    │  │
  │         ├─ [5c] ESCALATION (if needed) ────────┼────┼──┤
  │         │                                        │    │  │
  │         └─ [5d] CUSTOMER NOTIFICATIONS ──────────┤    │  │
  │                                                   │    │  │
  ├─ [6] RESOLUTION ──────────────────────────────────────────┤
  │                                                            │
  ├─ [7] FEEDBACK ────────────────────────────────────────────┤
  │                                                            │
  ├─ [8] CLOSURE ─────────────────────────────────────────────┤
  │                                                            │
  END
```

---

## Detailed Workflow Stages

### STAGE 1: SUBMISSION

**Duration**: 5-10 minutes
**Actors**: Student
**System**: Submission Portal

**Process**:

```
Student Login
    ↓
Dashboard → "New Complaint"
    ↓
Fill Form:
├─ Title (required)
├─ Description (required)
├─ Category (dropdown)
├─ Location (required)
├─ Photos (optional, multiple)
└─ Additional Details (optional)
    ↓
Submit Button
    ↓
Confirmation: "Complaint #XXXX submitted"
```

**Form Fields**:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | Text | ✅ | Max 100 chars |
| Description | TextArea | ✅ | Max 2000 chars |
| Category | Select | ⚠️ | AI can pre-fill |
| Location | AutoComplete | ✅ | Campus locations |
| Photos | File Upload | ❌ | JPG/PNG, max 5MB each |
| Priority | Select | ❌ | User suggestion only |
| Contact | Email | ✅ | Auto-filled |

**Output**:
- Complaint ID generated
- Status: "Submitted"
- Timestamp recorded
- Email confirmation sent

---

### STAGE 2: VERIFICATION (AI Analysis)

**Duration**: 30 seconds - 2 minutes
**Actors**: AI Engine, System
**System**: Backend Processing

**Processes**:

#### 2.1 NLP Categorization
```
Input: Complaint text
    ↓
Preprocessing: Clean, tokenize, lemmatize
    ↓
Feature Extraction: TF-IDF, Word embeddings
    ↓
Classification Model: BERT multi-class
    ↓
Output: Category + Confidence
├─ Facilities (95%)
├─ IT Services (3%)
├─ Other (2%)
    ↓
Store: Top 3 predictions
```

**Categories**:
- Facilities & Infrastructure
- IT & Technology
- Security & Safety
- Academic Affairs
- Student Services
- Other

#### 2.2 Computer Vision Analysis
```
Input: Uploaded photo(s)
    ↓
Image Preprocessing: Resize, normalize
    ↓
Object Detection: YOLOv8
    ↓
Damage Assessment: CNN classifier
    ↓
Output: Damage severity + Objects detected
├─ Severity: Low / Medium / High / Critical
├─ Objects: [Broken light, Stained wall, ...]
└─ Confidence: 0-100%
    ↓
Store: Analysis results
```

#### 2.3 Duplicate Detection
```
Input: Complaint text + metadata
    ↓
Generate Embeddings: Sentence-BERT
    ↓
Search Similar Complaints: Cosine similarity
    ↓
Calculate Similarity Score
    ↓
Output: Top 5 similar complaints
├─ Complaint #100: 92% similar
├─ Complaint #87: 87% similar
├─ Complaint #65: 78% similar
    ↓
If > 85% similar: Flag as duplicate
Store: Related complaints list
```

#### 2.4 Priority Prediction
```
Input: Category, damage, text sentiment, location
    ↓
Feature Engineering
    ↓
Predictive Models: Random Forest + XGBoost
    ↓
Ensemble Prediction
    ↓
Output: Priority + Score
├─ Critical: 90%
├─ High: 8%
├─ Medium: 2%
    ↓
Auto-assign: Critical priority
```

#### 2.5 SLA Assignment
```
Input: Category, priority, location
    ↓
SLA Lookup Table:
├─ Security + Critical: 24 hours
├─ Facilities + High: 5 days
├─ IT + Medium: 7 days
    ↓
Output: SLA deadline
├─ Deadline: May 18, 10:00 AM
├─ Escalation Alert: May 17, 10:00 AM
    ↓
Store: Deadline & tracking
```

**Verification Output Summary**:
- ✅ Category assigned (with confidence)
- ✅ Damage assessed (if photos provided)
- ✅ Duplicates checked (if any)
- ✅ Priority determined
- ✅ SLA deadline set
- ✅ Status: "Verified"
- ✅ Ready for routing

---

### STAGE 3: ROUTING (Intelligent Assignment)

**Duration**: < 1 second
**Actors**: System (Routing Engine)
**System**: Automatic

**Decision Logic**:

```
Routing Decision Tree:

┌─ Category?
│  ├─ Facilities
│  │  └─ Department ID: 001 (Facilities Mgmt)
│  ├─ IT Services
│  │  └─ Department ID: 002 (IT Services)
│  ├─ Security
│  │  └─ Department ID: 003 (Security)
│  └─ [Other categories...]
│
├─ Priority Queue?
│  ├─ Critical → Queue #1 (Urgent)
│  ├─ High → Queue #2 (Important)
│  ├─ Medium → Queue #3 (Standard)
│  └─ Low → Queue #4 (Backlog)
│
└─ Special Handling?
   ├─ Duplicate? → Mark as related
   ├─ Escalation-prone? → Flag for review
   ├─ Outside campus? → Redirect
   └─ Sensitive? → Escalate to HOD
```

**Output**:
- Department assigned
- Queue assigned
- Status: "Routed"
- HOD notified: "New complaint in Facilities"
- System ready for manual assignment

---

### STAGE 4: ASSIGNMENT (Manual)

**Duration**: 5-30 minutes
**Actors**: Faculty/Department Staff
**System**: Dashboard & Notifications

**Process**:

```
HOD/Faculty Receives Alert
    ↓
Dashboard → "New Complaints" (1)
    ↓
View Complaint Details:
├─ Title, Description, Photos
├─ AI Analysis: Category, Priority, SLA
├─ Estimated Resolution Time
├─ Similar Complaints (if any)
    ↓
Decision 1: Valid complaint?
├─ Yes → Continue
└─ No → Reject (explain reason)
    ↓
Decision 2: Can we handle internally?
├─ Yes → Select operative
├─ No → Escalate to external vendor
└─ Unsure → Assign to supervisor
    ↓
Select Operative from Team:
├─ Show: Name, Availability, Expertise
├─ Current Workload: 3/5 tasks
├─ Estimated Completion: This week
    ↓
Set Details:
├─ Priority: Confirm AI suggestion or adjust
├─ Deadline: Set based on SLA
├─ Special Instructions: Add notes
├─ Equipment/Resources: List if needed
    ↓
Assign Button
    ↓
Notifications Sent:
├─ Operative: "New task assigned"
├─ Student: "Your complaint is assigned"
└─ HOD: "Assignment complete - now tracking"
    ↓
Status: "Assigned"
```

**Status Update**:
- Assigned To: [Operative Name]
- Assigned Date: May 13, 2:30 PM
- Expected Completion: May 17
- Priority: High
- SLA Deadline: May 18

---

### STAGE 5: WORK IN PROGRESS

**Duration**: 1-7 days (depends on issue)
**Actors**: Operative, Faculty, System
**System**: Mobile App + Backend

**5.1 Work Execution**:

```
Operative Views Assignment
    ↓
Reviews Details & Instructions
    ↓
Navigates to Location
    ↓
Assesses Situation
    ↓
Executes Work:
├─ Install, repair, fix, etc.
├─ Follow safety procedures
├─ Document process
    ↓
Capture Evidence:
├─ Before photo
├─ Work-in-progress photos
├─ After photo
├─ Video (optional)
    ↓
Log Information:
├─ Time started
├─ Time spent
├─ Materials used
├─ Work notes
    ↓
Upload to System
```

**5.2 Status Updates**:

```
System: Every 24 hours or manual update

Update Types:
├─ Started: "Arrived at location"
├─ In Progress: "Currently fixing..."
├─ On Hold: "Waiting for parts"
├─ Completed: "Work finished, awaiting inspection"
├─ Issues: "Encountered problem, needs escalation"
    ↓
Student Receives Notification:
├─ Status updated to "In Progress"
├─ Estimated completion: May 16
├─ Latest update: "Currently replacing fixture"
└─ Photos available: [2 images]
```

**5.3 SLA Monitoring**:

```
Background Task: Every hour

Check: Issue status + SLA deadline
    ├─ Days remaining: 4
    ├─ Escalation threshold: 24 hours
    ├─ Status: "On track"
    │
    When threshold crossed (24 hours remaining):
    ├─ Alert to Faculty: "SLA Breach Alert"
    ├─ Alert to HOD: "SLA Breach Alert"
    ├─ Alert to Operative: "Urgent - Complete ASAP"
    ├─ Flag in System: Red
    ├─ Priority bump: Increase visibility
    │
    If deadline passes without completion:
    ├─ Status: "SLA Breached"
    ├─ Auto-escalate to HOD
    ├─ Escalate to Admin if needed
    ├─ Generate report
```

**5.4 Escalation (if needed)**:

```
Escalation Triggers:
├─ SLA breach imminent
├─ Operative unable to complete
├─ Issue more complex than expected
├─ Safety concern
├─ Requires external resources
├─ Awaiting parts/approvals
    ↓
Escalation Process:
├─ Operative/Faculty → Escalation Request
├─ Select Reason: [Dropdown]
├─ Add Details: [Free text]
├─ Escalate To: HOD (automatic)
    ↓
HOD Reviews:
├─ Reads escalation reason
├─ Assesses situation
├─ Options:
│  ├─ Add more resources
│  ├─ Bring in specialist
│  ├─ Extend SLA (with approval)
│  ├─ Escalate to Admin
│  ├─ Hire external vendor
├─ Takes action
├─ Updates operative
    ↓
Status: "Escalated" + Action taken
```

**5.5 Notifications**:

```
During Work in Progress:

To Operative:
├─ Assignment confirmed
├─ Daily reminders (if due soon)
├─ Escalation alerts
├─ Resource requests

To Faculty:
├─ Work started
├─ Daily status
├─ Escalation alerts
├─ Completion notification

To Student:
├─ Work started
├─ Status updates
├─ Estimated completion date
├─ Final completion
```

---

### STAGE 6: RESOLUTION

**Duration**: 5 minutes
**Actors**: Operative, Faculty
**System**: Mobile App

**Process**:

```
Operative Completes Work
    ↓
Captures Final Photos
    ↓
Logs Time & Materials
    ↓
App → "Mark Complete"
    ↓
Submits:
├─ Completion photos
├─ Time spent
├─ Materials used
├─ Work description
├─ Quality notes
    ↓
System Notifies Faculty:
├─ "Completion awaiting approval"
├─ Photos for review
├─ Details summary
    ↓
Faculty Reviews:
├─ Inspects photos
├─ Assesses work quality
├─ Checks completeness
    ├─ Approve → Status: "Resolved"
    ├─ Reject → Request rework
    ├─ Conditional → Request minor fix
    │
Status: "Resolved"
├─ Resolved Date: May 16, 3:00 PM
├─ Total Time: 1.5 days
├─ Cost: $150
└─ Quality Rating: Excellent
```

---

### STAGE 7: FEEDBACK

**Duration**: Optional, up to 7 days
**Actors**: Student
**System**: Feedback Portal

**Process**:

```
System Sends: "Your complaint is resolved!"
    ↓
Student Receives Email/Notification
    ↓
Views Resolution Details:
├─ What was done
├─ Photos of completed work
├─ Time taken
├─ Resolution date
    ↓
Options:
├─ [A] Satisfied → Provide feedback
├─ [B] Not satisfied → Escalate
└─ [C] Skip for now → Remind later
    ↓
Feedback Form:
├─ Rating: ⭐⭐⭐⭐⭐ (1-5)
├─ Satisfaction: Very satisfied / Satisfied / Neutral / Unsatisfied / Very unsatisfied
├─ Comments: [Optional text]
├─ Follow-up contact: Yes / No
    ↓
Submit Feedback
    ↓
System Stores:
├─ Rating & Comments
├─ Timestamp
├─ Associated with complaint
├─ Used for analytics
```

**If Not Satisfied**:

```
Student Selects: "Not Satisfied"
    ↓
Reason: [Dropdown]
├─ Work not completed
├─ Poor quality
├─ Unsafe
├─ Other
    ↓
Detailed Explanation: [Text]
    ↓
Request Rework
    ↓
Auto-Escalate to HOD
    ├─ Alert: "Complaint not satisfied"
    ├─ Review details
    ├─ Schedule rework or meeting
    │
Status: "Reopened" (if applicable)
```

---

### STAGE 8: CLOSURE & ARCHIVING

**Duration**: 1 day after feedback
**Actors**: System
**System**: Automatic

**Process**:

```
7 days after resolution:

System Checks:
├─ Feedback received OR 7 days passed?
├─ Yes → Continue
└─ No → Wait
    ↓
Archive Complaint:
├─ Move to archive database
├─ Maintain all details
├─ Keep for reference
├─ Use for analytics
    ↓
Final Status: "Closed"
├─ Closed Date: May 24
├─ Resolution Time: 11 days
├─ Satisfaction: ⭐⭐⭐⭐ (4/5)
├─ Feedback: "Great job, very satisfied!"
    ↓
Store Analytics:
├─ Category trend
├─ Resolution time average
├─ Operative performance
├─ Department metrics
├─ Budget tracking
    ↓
Generate Insights:
├─ Similar issues trend
├─ Bottlenecks identified
├─ Recommendations
└─ Report to Admin & HOD
```

---

## Workflow Statistics

| Stage | Avg Time | Status | Next |
|-------|----------|--------|------|
| Submission | 10 min | Open | Verification |
| Verification | 1 min | Verified | Routing |
| Routing | <1 sec | Routed | Assignment |
| Assignment | 30 min | Assigned | In Progress |
| In Progress | 3-5 days | Active | Resolution |
| Resolution | 5 min | Resolved | Feedback |
| Feedback | Optional | Optional | Closure |
| Closure | Automatic | Closed | Archive |
| **TOTAL** | **4-7 days** | - | - |

---

**Status**: ✅ Complete
**Last Updated**: May 13, 2026
