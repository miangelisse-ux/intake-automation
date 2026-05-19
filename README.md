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
