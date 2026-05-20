# Real-Time System — Intake Workflow

## 🧠 Purpose

Defines how scheduling updates propagate and remain consistent across users and systems.

---

## ⚡ Event Flow Architecture

```mermaid
sequenceDiagram
participant U as User
participant F as Form
participant S as Apps Script
participant C as Calendar API
participant N as Notification System

U->>F: Submit Intake Form
F->>S: Trigger Event (onFormSubmit)
S->>S: Validate + Process Workflow
S->>C: Create Calendar Event
C-->>S: Event Confirmation
S->>N: Send Email Notification
N-->>U: Confirmation Received
```

---

## 🧩 Real-Time Behavior

- Near-instant intake processing
- Event-driven workflow execution
- Immediate feedback on scheduling outcome
- Synchronous calendar + email updates

---

## 🎯 Design Goal

Ensure users receive immediate confirmation of scheduling decisions with no manual delay.
