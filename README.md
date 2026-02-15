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

1. Clone this repository:
   ```bash
   git clone https://github.com/miangelisse-ux/intake-automation.git
   ```

2. Navigate to the project folder:
```
cd intake-automation

```
3. Open Google Apps Script and create a new project.

4. Copy the contents of src/intake_automation.gs into the script project.

5. Configure:
```
  Replace ADMIN_EMAIL with your admin email.
  Replace CALENDAR_ID with your Google Calendar ID for intake appointments.
  Replace ROOT_FOLDER_ID with the folder ID where client files are stored     (optional).
```
## How to Run
```
Link the Google Form to the Apps Script as a trigger on form submission.
Clients submit intake information through the Google Form.
The script automatically schedules the appointment, creates a calendar event, and sends confirmation emails.
