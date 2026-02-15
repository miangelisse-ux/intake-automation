// ---------------------- CONFIGURATION ----------------------
const ADMIN_EMAIL = "your-admin-email@example.com"; // Admin for error notifications
const BUFFER_MINUTES = 0; // Optional buffer before/after events
const CALENDAR_ID = "your-calendar-id@group.calendar.google.com"; // Google Calendar ID for appointments
const ROOT_FOLDER_ID = "your-folder-id"; // Optional: Google Drive folder ID for storing uploaded files

// ---------------------- FORM SUBMISSION HANDLER ----------------------
function onFormSubmit(e) {
  if (!e || !e.namedValues) return;

  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // Prevent simultaneous form submissions

  try {
    const r = e.namedValues;

    // ---------------------- UTILITY FUNCTIONS ----------------------
    const norm = (s) => (s || "").toString().replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
    
    // Picks a value from the form by label
    const pick = (label) => {
      const target = label.toLowerCase();
      const keys = Object.keys(r).map(k => ({ raw: k, k: norm(k).toLowerCase() }));
      const exact = keys.find(x => x.k === target);
      if (exact) return norm(r[exact.raw]?.[0]);
      const partial = keys.find(x => x.k.includes(target));
      if (partial) return norm(r[partial.raw]?.[0]);
      return "";
    };

    // Parses time string in "hh:mm AM/PM" format
    const parseTime = (t) => {
      t = norm(t);
      const m = t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!m) throw new Error("Unrecognized time format: " + t);
      let h = +m[1], min = +m[2], ap = m[4].toUpperCase();
      if (ap === "PM" && h !== 12) h += 12;
      if (ap === "AM" && h === 12) h = 0;
      return { h, m: min };
    };

    // ---------------------- FORM VALUES ----------------------
    const clientName = pick("Client Name");
    const dob = pick("D.O.B.");
    const phoneNumber = pick("Phone Number");
    const insuranceFile = pick("Insurance Card");
    const idFile = pick("ID");
    const referralSource = pick("Referral Source");
    const services = pick("Services Requested");
    const language = pick("Language");
    const preferences = pick("Preferences");
    const dateStr = pick("Appointment Date");
    const startTimeStr = pick("Appointment Time");
    const clientEmail = pick("Email Address");

    if (!dateStr || !startTimeStr) throw new Error("Missing appointment date or time");

    // ---------------------- SAFE DATE HANDLING ----------------------
    let dateString = dateStr;
    if (!/\d{4}/.test(dateString)) {
      dateString += `, ${new Date().getFullYear()}`;
    }
    const day = new Date(dateString);
    if (isNaN(day)) throw new Error("Invalid appointment date: " + dateString);

    const st = parseTime(startTimeStr);
    const start = new Date(day);
    start.setHours(st.h, st.m, 0, 0);

    // Default 1-hour appointment
    const end = new Date(start.getTime() + 60 * 60000);

    // ---------------------- CHECK DAY & TIME ----------------------
    const weekday = start.getDay();
    // Example: appointments only allowed on Tue/Wed
    if (![2, 3].includes(weekday)) throw new Error("Appointments can only be scheduled on allowed days.");

    if (start.getHours() < 9 || end.getHours() > 17) throw new Error("Appointments must be within business hours.");

    // ---------------------- CHECK CALENDAR CONFLICTS ----------------------
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    const events = calendar.getEvents(
      new Date(start.getTime() - BUFFER_MINUTES * 60000),
      new Date(end.getTime() + BUFFER_MINUTES * 60000)
    );

    const MAX_EVENTS = 4; // Max concurrent appointments
    if (events.length >= MAX_EVENTS) throw new Error("Selected time slot is full. Please choose another.");

    // ---------------------- CREATE CALENDAR EVENT ----------------------
    const title = `Intake: ${clientName}`;
    const description =
      `Client Name: ${clientName}\n` +
      `DOB: ${dob}\n` +
      `Email: ${clientEmail}\n` +
      `Phone: ${phoneNumber}\n` +
      `Referral Source: ${referralSource}\n` +
      `Services: ${services}\n` +
      `Language: ${language}\n` +
      `Preferences: ${preferences}\n` +
      `Insurance File: ${insuranceFile}\n` +
      `ID File: ${idFile}`;

    calendar.createEvent(title, start, end, {
      description,
      sendInvites: false
    });

    // ---------------------- SEND CONFIRMATION EMAIL ----------------------
    if (clientEmail) {
      const subject = "Appointment Confirmation";
      const body =
        `Hi ${clientName},\n\n` +
        `Your appointment has been scheduled:\n` +
        `Date: ${start.toLocaleDateString()}\n` +
        `Time: ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}\n` +
        `Location: [Your Location or Address Here]\n\n` +
        `Please bring any required documents.\n\nThank you!`;
      MailApp.sendEmail(clientEmail, subject, body);
    }

  } catch (err) {
    const msg = `Intake automation error:\n\n${err && err.stack ? err.stack : err}`;
    try { MailApp.sendEmail(ADMIN_EMAIL, "Intake Automation ERROR", msg); } catch (_) {}
    throw err;
  } finally {
    lock.releaseLock();
  }
}
