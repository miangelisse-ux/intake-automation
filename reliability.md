# Reliability — Workflow Scheduling System

## 🧠 Purpose

Ensures system correctness under failure, concurrency, and external API limitations (Google Calendar / Apps Script constraints).

---

## ⚙️ Reliability Model

```mermaid
flowchart TD

A[Incoming Request] --> B[Validation Layer]
B --> C{Valid?}

C -->|No| D[Reject Request Safely]
C -->|Yes| E[Scheduling Engine]

E --> F{External API Success?}

F -->|Yes| G[Commit Booking]
F -->|No| H[Retry + Rollback]

H --> I[Admin Alert System]
```

---

## 🔒 Reliability Guarantees

- No partial bookings
- Atomic scheduling operations
- Safe failure recovery
- Retry logic for external APIs

---

## 🧠 Failure Philosophy

Every workflow must result in:

- SUCCESS → fully committed booking
OR
- FAILURE → clean rejection with no side effects
