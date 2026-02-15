# Walk-In Intake Automation

Production-deployed Google Workspace automation for scheduling and managing walk-in intake appointments using Google Forms, Google Calendar, and Apps Script.

## Production Use

This system was deployed to streamline client intake scheduling, reduce manual coordination, prevent double-booking, and automatically send confirmations to clients and alerts to admins.

## Problem

Manual intake appointment scheduling led to booking conflicts, missed confirmations, and inefficient staff communication. This automation standardizes scheduling, validates appointments, and sends automated notifications to clients and staff.

## Tech Stack

- Google Apps Script
- Google Calendar API
- Google Forms triggers
- LockService for concurrency control
- Automated email notifications

## Core Features

- Triggered on form submission
- Input normalization and validation
- Appointment date and time parsing
- Enforces allowed days (e.g., Tuesdays and Wednesdays)
- Enforces allowed time range (e.g., 9 AM – 5 PM)
- Conflict detection with calendar event limits
- Automatic calendar event creation
- Confirmation emails to clients
- Admin alert emails on errors
- Optional buffer before/after appointments

## System Logic Overview

1. Form submission triggers `onFormSubmit`.
2. Lock acquired to prevent simultaneous scheduling conflicts.
3. Appointment date and time parsed and validated.
4. Checks allowed days and time ranges.
5. Checks existing events in the calendar to prevent overbooking.
6. Creates the calendar event in the Walk-In Calendar.
7. Sends confirmation email to client.
8. Sends error email to admin if any issue occurs.

## Engineering Considerations

- Concurrency handled using `LockService`.
- Defensive error handling to prevent failures from stopping other submissions.
- Input normalization ensures consistent handling of form responses.
- Email notifications ensure both client and admin are informed.

## Future Improvements

- Admin dashboard for viewing scheduled appointments.
- Analytics on appointment trends.
- Customizable service duration.
- Integration with client records database.
- Option for rescheduling and cancellations.

## Setup

1. Open the Google Sheet linked to your intake Google Form (this Sheet stores form responses).
2. Go to Extensions → Apps Script in the Sheet.
3. Copy the contents of `src/intake_automation.gs` into your project.
4. Configure calendar and folder:
   - Replace `CALENDAR_ID` with your Google Calendar ID for intake appointments.
   - Replace `ROOT_FOLDER_ID` with your Google Drive folder ID for client files (optional).
5. Set admin email:
   ```javascript
   const ADMIN_EMAIL = "example@example.com";

6. Optional: Map client or staff emails if needed (not required for basic setup).
7. Set up triggers:
- Form submit trigger → onFormSubmit
- (Optional) Time-driven trigger → for daily or periodic summaries/notifications

 ## Flow Overview:
- Form submission → Google Sheet → Apps Script → Google Calendar → Confirmation Email

## How to Run

- **Automatic execution (recommended):**  
  1. The script runs automatically whenever a new form submission is received (`onFormSubmit`).  
  2. Any daily summary or reporting functions run automatically if a time-driven trigger is set.  

- **Manual execution (for testing):**  
  1. Open the Apps Script editor from the bound Google Sheet (**Extensions → Apps Script**).  
  2. Select the function `onFormSubmit` or any other test function from the dropdown.  
  3. Click **Run ▶** to execute manually.  
     - For `onFormSubmit`, you may need to provide a mock `e` object with test values.  
  4. Check the Google Calendar and email inbox to confirm the automation is working correctly.
