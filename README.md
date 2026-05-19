# 🧾 Walk-In Intake Automation

🚀 Production-deployed Google Workspace automation for scheduling and managing walk-in intake appointments using Google Forms, Google Calendar, and Google Apps Script.

---

## 🏭 Production Use

This system was deployed to streamline client intake scheduling, reduce manual coordination, prevent double-booking, and automate communication between clients and staff.

It functions as a lightweight workflow automation system for managing structured intake requests in real time.

---

## ⚠️ Problem

Manual intake appointment scheduling led to:

- ❌ Booking conflicts and double-booking  
- ❌ Missed or delayed confirmations  
- ❌ Inefficient staff coordination  
- ❌ Lack of standardized scheduling rules  
- ❌ Increased administrative overhead  

This automation solves these issues through structured validation and full workflow automation.

---

## 🧭 Usage Flow

1. 📋 User submits Google Form  
2. 📊 Google Sheets stores response  
3. ⚙️ Apps Script (`onFormSubmit`) triggers  
4. 🧠 System validates date/time rules  
5. 📅 Calendar conflict check runs  
6. ✅ If valid → event is created  
7. 📩 Confirmation email sent  
8. 🚨 Admin notified on error  

---

## 📧 Sample Confirmation Email

```text
🧾 Walk-In Intake Appointment Confirmation

👤 Client: Jane Doe  
📅 Date: Tuesday, February 20, 2026  
⏰ Time: 10:00 AM – 11:00 AM  
📍 Location: Business Name - 1234 Street Ave, Miami, FL 33034  

Please bring your insurance card and ID.
```

---

## 🧰 Tech Stack

- ⚙️ Google Apps Script  
- 📅 Google Calendar API  
- 📋 Google Forms  
- 📊 Google Sheets  
- 📩 Gmail API  
- 🔒 LockService (concurrency control)  

---

## ⚡ Core Features

- ⚡ Auto-triggered on form submission  
- 🧼 Input validation & normalization  
- 🕒 Date/time parsing  
- 📆 Allowed scheduling rules  
- 🚫 Conflict detection (no double-booking)  
- 📅 Automatic calendar event creation  
- 📩 Client confirmation emails  
- 🚨 Admin error alerts  
- 🔁 Optional buffer scheduling  
- 🔒 Concurrency-safe execution  

---

## 🧠 System Logic

1. ⚡ `onFormSubmit` triggered  
2. 🔒 Lock acquired  
3. 🧾 Data parsed & cleaned  
4. 🧭 Business rules validated  
5. 📆 Calendar checked for conflicts  
6. ✅ If valid:
   - 📅 Event created  
   - 📩 Email sent  
7. ❌ If error:
   - 🚨 Admin notified  

---

## 🏗️ Engineering Notes

- 🔒 Concurrency-safe execution  
- 🧯 Fault isolation per request  
- 🧼 Normalized input handling  
- 📩 Automated communication layer  
- 📆 Scheduling integrity enforcement  
- ⚡ Event-driven architecture  

---

## 🚀 Future Improvements

- 📊 Admin dashboard  
- 📈 Analytics on intake volume  
- 🔁 Rescheduling + cancellation system  
- 💬 SMS notifications (Twilio)  
- 🧠 CRM integration  
- 🏢 Multi-location support  

---

## ⚙️ Setup

1. 📊 Open Google Sheet  
2. ⚙️ Go to Extensions → Apps Script  
3. 📥 Paste `intake_automation.gs`  

---

## 🔐 Config

```javascript
const CALENDAR_ID = "your-calendar-id";
const ROOT_FOLDER_ID = "your-folder-id";
const ADMIN_EMAIL = "example@example.com";
```

---

## 🔄 Flow

```text
📋 Form → 📊 Sheets → ⚙️ Apps Script → 📅 Calendar → 📩 Email
```

---

## ▶️ Run

### 🤖 Automatic
Runs on form submission (`onFormSubmit`)

### 🧪 Manual
- Open Apps Script  
- Run function  
- Check logs, calendar, email  

---
