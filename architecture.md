# Architecture — Intake Automation Workflow Orchestration System

## 🧠 System Overview

This system is a workflow orchestration engine that processes intake submissions, validates structured data, applies business rules, and triggers downstream scheduling actions.

It follows an event-driven architecture with a centralized workflow decision layer.

---

## 🏗 AWS-Style System Architecture

```mermaid
flowchart TD

A[Google Form Submission / API Request] --> B[Google Sheets Event Trigger]
B --> C[Apps Script Intake Handler]

C --> D[Validation Engine]
D --> E{Valid Submission?}

E -->|No| F[Error Handler + Admin Alert]
E -->|Yes| G[Workflow Orchestrator]

G --> H[Scheduling Engine]
H --> I[Google Calendar API]

H --> J[Conflict Detection Module]
J -->|Conflict Found| K[Reject + Notification]
J -->|No Conflict| L[Create Appointment Event]

L --> M[Email Notification System]
M --> N[Client Confirmation Email]

F --> O[Logging System]
K --> O
L --> O
```

---

## ⚙️ Core Design Principles

- Event-driven execution model
- Stateless request processing where possible
- Centralized workflow orchestration layer
- Deterministic scheduling decisions
- Fail-safe validation before execution
