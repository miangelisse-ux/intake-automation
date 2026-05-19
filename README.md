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
7. Confirmation email is sent to the client (if email provided)  
8. Admin receives error alerts if any failure occurs  

---

## Sample Confirmation Email

```javascript
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
- Google Forms triggers  
- Google Sheets (data storage layer)  
- LockService (concurrency control)  
- Gmail API (email notifications)  

---

## Core Features

- Triggered automatically on form submission  
- Input normalization and validation  
- Appointment date/time parsing  
- Enforces allowed days (e.g., Tuesdays and Wednesdays)  
- Enforces allowed time ranges (e.g., 9 AM – 5 PM)  
- Calendar conflict detection to prevent double-booking  
- Automatic Google Calendar event creation  
- Client confirmation emails  
- Admin error notifications  
- Optional buffer time between appointments  
- Concurrency-safe execution using `LockService`  

---

## System Logic Overview

1. `onFormSubmit` trigger fires when form is submitted  
2. Lock is acquired to prevent concurrent execution conflicts  
3. Appointment data is parsed and normalized  
4. System validates scheduling rules:
   - Allowed days  
   - Allowed time windows  
5. Calendar is checked for conflicts  
6. If valid:
   - Calendar event is created  
   - Confirmation email is sent  
7. If failure occurs:
   - Admin error email is triggered  

---

## Engineering Considerations

- **Concurrency control:** Uses `LockService` to prevent race conditions and double-bookings  
- **Fault tolerance:** Errors are isolated so one failure does not break the pipeline  
- **Input normalization:** Ensures consistent parsing of form responses  
- **Automated communication:** Clients and admins are notified in real time  
- **Scheduling integrity:** Prevents overlapping or invalid appointments  
- **Event-driven design:** Built around trigger-based execution flow  

---

## Future Improvements

- Admin dashboard for viewing scheduled appointments  
- Analytics on intake volume and peak time trends  
- Dynamic appointment duration per service type  
- Integration with CRM or client database  
- Rescheduling and cancellation workflow  
- SMS notifications (Twilio integration)  
- Multi-location support  
- Role-based admin controls  

---

## Setup

1. Open the Google Sheet linked to your intake Google Form  
2. Go to **Extensions → Apps Script**  
3. Copy contents of `src/intake_automation.gs` into the project  

---

### Configure environment

```javascript
const CALENDAR_ID = "your-calendar-id";
const ROOT_FOLDER_ID = "your-drive-folder-id"; // optional
const ADMIN_EMAIL = "example@example.com";
```
### Set up triggers


Install trigger: onFormSubmit → Form submission event
Optional: time-driven trigger for daily summaries or monitoring

---
## Flow Overview

Form submission → Google Sheets → Apps Script → Google Calendar → Email notifications

### How to Run

Automatic (Recommended)

The system runs automatically when a Google Form is submitted via the onFormSubmit trigger.

Optional scheduled triggers can run reporting or validation functions.

### Manual Testing

Open Apps Script editor from the Google Sheet
Select function (onFormSubmit or test function)

Click Run ▶

Verify:

- Calendar event creation
- Email delivery
- Execution logs
---
Note: Manual execution may require a mock event object for onFormSubmit
