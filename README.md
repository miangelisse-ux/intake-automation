# Walk-In Intake Automation

Production-deployed Google Workspace automation for scheduling and managing walk-in intake appointments using Google Forms, Google Calendar, and Google Apps Script.

---

## Production Use

This system was deployed to streamline client intake scheduling, reduce manual coordination, prevent double-booking, and automate communication between clients and staff.

It functions as a lightweight workflow automation system for managing structured intake requests in real time.

---

## Problem

Manual intake appointment scheduling led to:

- Booking conflicts and double-booking  
- Missed or delayed confirmations  
- Inefficient staff coordination  
- Lack of standardized scheduling rules  
- Increased administrative overhead  

This automation solves these issues by enforcing scheduling rules, validating input, and fully automating the intake workflow.

---

## Usage

1. User submits a Google Form with intake appointment details  
2. Google Sheets stores the submission  
3. Apps Script trigger (`onFormSubmit`) processes the entry  
4. System validates date, time, and scheduling rules  
5. Calendar conflict checks are performed  
6. If valid, a Google Calendar event is created  
7. Confirmation email is sent to the client (if email is provided)  
8. Admin receives error alerts if any failure occurs  

---

## Sample Confirmation Email

```text
Walk-In Intake Appointment Confirmation

Client: Jane Doe
Date: Tuesday, February 20, 2026
Time: 10:00 AM – 11:00 AM
Location: Business Name - 1234 Street Ave, Miami, FL 33034

Please bring your insurance card and ID.
```

---

## Tech Stack

- Google Apps Script  
- Google Calendar API  
- Google Forms Triggers  
- Google Sheets (data storage layer)  
- Gmail API (email notifications)  
- LockService (concurrency control)  

---

## Core Features

- Triggered automatically on form submission  
- Input normalization and validation  
- Appointment date and time parsing  
- Enforces allowed scheduling days  
- Enforces allowed appointment time windows  
- Calendar conflict detection to prevent double-booking  
- Automatic Google Calendar event creation  
- Client confirmation email notifications  
- Admin error alert system  
- Optional scheduling buffers between appointments  
- Concurrency-safe execution using `LockService`  

---

## System Logic Overview

1. `onFormSubmit` trigger fires when a form is submitted  
2. Lock is acquired to prevent concurrent execution conflicts  
3. Appointment data is parsed and normalized  
4. Scheduling rules are validated:
   - Allowed days  
   - Allowed time windows  
5. Existing calendar events are checked for conflicts  
6. If valid:
   - Calendar event is created  
   - Confirmation email is sent  
7. If an error occurs:
   - Admin alert email is triggered  

---

## Engineering Considerations

- **Concurrency Control:** Uses `LockService` to prevent race conditions and overlapping bookings  
- **Fault Tolerance:** Errors are isolated to avoid interrupting other submissions  
- **Input Normalization:** Ensures consistent handling of form responses  
- **Automated Communication:** Clients and staff receive real-time notifications  
- **Scheduling Integrity:** Prevents invalid or overlapping appointments  
- **Event-Driven Design:** Built around trigger-based workflow execution  

---

## Future Improvements

- Admin dashboard for appointment management  
- Analytics on intake volume and scheduling trends  
- Dynamic appointment duration by service type  
- CRM or client database integration  
- Rescheduling and cancellation workflows  
- SMS notifications (Twilio integration)  
- Multi-location support  
- Role-based access controls  

---

## Setup

1. Open the Google Sheet linked to your intake Google Form  
2. Navigate to **Extensions → Apps Script**  
3. Copy the contents of `src/intake_automation.gs` into the project  

---

## Configure Environment

```javascript
const CALENDAR_ID = "your-calendar-id";
const ROOT_FOLDER_ID = "your-drive-folder-id"; // optional
const ADMIN_EMAIL = "example@example.com";
```

---

## Set Up Triggers

- Install trigger: `onFormSubmit` → Form Submission Event  
- Optional: Time-driven trigger for summaries, monitoring, or reporting  

---

## Flow Overview

```text
Google Form → Google Sheets → Apps Script → Google Calendar → Email Notifications
```

---

## How to Run

### Automatic Execution (Recommended)

The system executes automatically when a Google Form submission triggers the `onFormSubmit` function.

Optional scheduled triggers can also run reporting or monitoring workflows.

---

### Manual Testing

1. Open the Apps Script editor from the Google Sheet  
2. Select the `onFormSubmit` function or a test function  
3. Click **Run ▶**  
4. Verify:
   - Calendar event creation  
   - Email delivery  
   - Execution logs  

> Note: Manual execution may require a mock event object for `onFormSubmit`.

---
