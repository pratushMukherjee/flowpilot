<div align="center">

# FlowPilot

### AI-Powered Workflow Automation Platform

### [Try the Live Demo →](https://zoom1-beta.vercel.app)

Describe your automation goal in plain English — an AI agent builds, visualizes, and executes multi-step workflows across your favorite tools.

[Live Demo](https://zoom1-beta.vercel.app) · [Features](#features) · [Architecture](#architecture) · [Getting Started](#getting-started) · [Case Study](#product-case-study)

</div>

---

## The Problem

Knowledge workers spend **4+ hours per week** on repetitive operational tasks — copying data between tools, sending follow-up emails, compiling reports, and scheduling meetings. Existing automation platforms (Zapier, Make, Power Automate) require **manual step-by-step configuration** that is time-consuming and demands technical familiarity.

## The Solution

FlowPilot is the first workflow automation platform built **AI-first**. Instead of dragging and dropping steps manually, users describe their goal in natural language and an **agentic AI engine** autonomously:

1. **Parses** the goal into structured, executable workflow steps
2. **Identifies** the right integrations and actions needed
3. **Visualizes** the workflow as an interactive node graph
4. **Executes** each step with reasoning, error handling, and branching logic

> *"Schedule a weekly team standup, send the agenda via email 1 hour before, and create meeting notes in Notion after"*
>
> FlowPilot turns this sentence into a 5-step executable workflow in under 10 seconds.

---

## Demo

<!-- Add your screenshots and video here -->

### Screenshots

| Landing Page | Workflow Builder | Visual Canvas |
|:---:|:---:|:---:|
| <img width="600" alt="Landing Page" src="https://github.com/user-attachments/assets/19b34629-2103-4122-8f30-503c81bb9348" /> | <img width="600" alt="Workflow Builder" src="https://github.com/user-attachments/assets/4419198b-d6e2-4529-8b56-16aa63a33be8" /> | <img width="600" alt="Visual Canvas" src="https://github.com/user-attachments/assets/b88a380e-54db-42c5-a8da-72d8f2ede7dd" /> |

| Analytics Dashboard | Template Library | Execution History |
|:---:|:---:|:---:|
| <img width="600" alt="Analytics Dashboard" src="https://github.com/user-attachments/assets/8b020907-6a7a-4e6c-a0d3-8f666c67ee30" /> | <img width="600" alt="Template Library" src="https://github.com/user-attachments/assets/12e523dd-15f5-4755-a8de-c1141cc626bd" /> | <img width="600" alt="Execution History" src="https://github.com/user-attachments/assets/e8c16dac-80c9-447e-b8e1-6155679848d5" /> |

### Video Walkthrough

[![FlowPilot Demo](https://img.youtube.com/vi/EZEBizj6U_4/maxresdefault.jpg)](https://youtu.be/EZEBizj6U_4)

---

## Features

### Natural Language Workflow Builder
Type a workflow goal in plain English. The AI agent analyzes your intent, identifies required integrations, structures the steps, and presents them for review — all in seconds.

- Real-time AI processing with stage indicators
- Example prompt chips for quick starts
- Detected integrations displayed as badges
- One-click execution directly from the builder

### Agentic Execution Engine
The core differentiator. Unlike rule-based automation tools, FlowPilot uses Claude's tool_use API in an **agentic loop** — the AI reasons about each step, calls integration tools, processes results, and decides what to do next.

- **Plan-Execute-Verify** pattern for multi-step workflows
- **Branching logic** — conditional paths based on runtime data
- **Error recovery** — failures are fed back to the AI for reasoning
- **Retry policies** — configurable per step
- Max 20-iteration safety limit

### Visual Workflow Canvas
Every workflow is rendered as an interactive flowchart using React Flow with automatic layout via dagre.

- Color-coded nodes by type (trigger, action, condition, delay)
- Integration-branded borders and icons
- **Live execution visualization** — nodes animate through pending → running → completed/failed
- MiniMap for large workflows
- Zoom and pan controls

### 6 Third-Party Integrations
Each integration has defined actions, triggers, and parameter schemas with realistic mock responses.

| Integration | Actions | Use Cases |
|:---|:---|:---|
| **Google Calendar** | Create/update/list events | Meeting scheduling, reminders |
| **Slack** | Send messages, create channels | Team notifications, updates |
| **Gmail** | Send emails, search inbox | Follow-ups, reports, alerts |
| **Zoom** | Create meetings, get recordings | Video meetings, transcripts |
| **Notion** | Create/update pages, query databases | Documentation, knowledge base |
| **Jira** | Create/update issues, list with JQL | Task tracking, sprint management |

### Template Library
4 pre-built workflow templates for common automation scenarios:

- **Meeting Follow-up** — Zoom transcript → Notion notes → Slack summary → Jira tickets → Email follow-up
- **Weekly Report Generation** — Jira tickets → Slack highlights → Notion report → Email to stakeholders
- **Customer Onboarding** — Slack channel → Calendar kickoff → Zoom link → Notion project → Jira epic → Welcome email
- **Sprint Planning Assistant** — Jira backlog → Notion sprint doc → Calendar meeting → Zoom (if remote) → Slack agenda

### Analytics Dashboard
Track workflow performance with interactive charts powered by Recharts.

- Execution trend (30-day area chart)
- Integration usage (horizontal bar chart)
- Template popularity (donut chart)
- Recent execution timeline with status indicators
- Summary stat cards: total workflows, success rate, time saved, active integrations

### Dark Mode
Full dark mode with Zoom-inspired color palette. Toggle between themes with one click. Smooth transitions, no flash on load.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js App Router)                 │
│                                                                   │
│  Landing Page ─── Workflow Builder ─── Visual Canvas (React Flow) │
│  Dashboard (Recharts) ─── Templates ─── Integrations ─── History │
│  Case Study: Competitive Analysis │ Personas │ PRD │ Metrics     │
└──────────────────────────┬───────────────────────────────────────┘
                           │ REST API (fetch)
┌──────────────────────────▼───────────────────────────────────────┐
│                     Backend (Next.js API Routes)                  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ AI Engine                                                    │ │
│  │  Workflow Parser ── Claude tool_use ── WorkflowStep[]        │ │
│  │  Agentic Executor ── Claude loop ── Mock Tools ── Results    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Integration Registry (6) ── Mock Executor ── Realistic Responses │
│  In-Memory Store ── Workflows, Executions, Seeded Demo Data      │
│  Template Engine ── 4 Pre-built Templates                         │
│  Analytics Generator ── 30-day Trend Data                         │
└──────────────────────────┬───────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
     In-Memory Store   Mock Services    Claude API
     (Map-based)       (6 integrations) (Sonnet 4.5)
```

### Agentic Execution Flow

```
User clicks "Execute"
  │
  ▼
POST /api/ai/execute-workflow
  │
  ▼
Format steps into Claude message
  │
  ▼
┌─────────────────────────────────────┐
│         AGENTIC LOOP                │
│                                     │
│  Claude reasons about next step     │
│         │                           │
│         ▼                           │
│  Claude calls tool (tool_use)       │
│    e.g., slack_send_message         │
│         │                           │
│         ▼                           │
│  Mock executor returns response     │
│    e.g., { ok: true, ts: "..." }   │
│         │                           │
│         ▼                           │
│  Result fed back to Claude          │
│  as tool_result message             │
│         │                           │
│         ▼                           │
│  Claude decides: more steps?        │
│    YES → loop back                  │
│    NO  → end_turn                   │
│                                     │
│  Safety: max 20 iterations          │
└─────────────────────────────────────┘
  │
  ▼
Return: { status, results[], duration }
```

---

## Tech Stack

| Layer | Technology | Purpose |
|:---|:---|:---|
| Framework | Next.js 16 (App Router) | Full-stack React with API routes |
| Language | TypeScript | Type safety across frontend + backend |
| Styling | Tailwind CSS v4 | Utility-first, dark mode via CSS variables |
| AI | Claude API (@anthropic-ai/sdk) | Agentic workflow parsing and execution |
| Canvas | React Flow (@xyflow/react) | Interactive node-based workflow visualization |
| Charts | Recharts | Analytics dashboard visualizations |
| Animations | Framer Motion | Page transitions, loading states, micro-interactions |
| Layout | dagre | Automatic graph layout for workflow canvas |
| Dark Mode | next-themes | SSR-compatible theme switching |
| Icons | Lucide React | Consistent, tree-shakeable icon set |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/pratushMukherjee/flowpilot.git
cd flowpilot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
```

### Running

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) and try the workflow builder at [/workflows/new](http://localhost:3000/workflows/new).

### Quick Test

1. Navigate to `/workflows/new`
2. Type: *"After each Zoom meeting, create notes in Notion, send a summary to Slack, and create Jira tickets for action items"*
3. Click **Generate Workflow** — watch the AI parse it into steps
4. Click **Execute** — see each step run with status indicators
5. Click **Save Workflow** — view it on the React Flow canvas

---

## Product Case Study

FlowPilot includes a full product case study built directly into the application, demonstrating product management thinking alongside technical execution.

### [Competitive Analysis](/case-study/competitive-analysis)
Feature comparison across FlowPilot, Zapier, Make, Power Automate, and n8n. Evaluates 10 dimensions including AI capabilities, agentic execution, and no-code accessibility. Identifies FlowPilot's strategic positioning as the only AI-native workflow platform.

### [User Personas](/case-study/user-personas)
Four research-backed personas spanning the technical comfort spectrum:
- **Sarah Chen** (Ops Manager) — Moderate tech comfort, automates team processes
- **Alex Rivera** (Product Manager) — High tech comfort, automates sprint workflows
- **Jordan Williams** (Executive Assistant) — Low tech comfort, manages 40+ meetings/week
- **Priya Patel** (Senior Developer) — Very high tech comfort, rapid prototyping

### [Product Requirements Document](/case-study/prd)
Full PRD with: Problem Statement, Goals & Non-Goals, User Stories (P0–P2 prioritized), Technical Requirements, Success Metrics with targets, 4-phase Timeline, and Risk Analysis with mitigations.

### [Metrics Framework](/case-study/metrics-framework)
Structured measurement framework:
- **North Star**: Workflow Automation Hours Saved per Week
- **Input Metrics**: Workflows created, template adoption, NL conversion rate
- **Quality Metrics**: Execution success rate, AI parse accuracy, error recovery
- **Growth Metrics**: WAU, DAU/WAU ratio, Week 4 retention, viral coefficient

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                              # Landing page
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx                # Analytics dashboard
│   │   ├── workflows/new/page.tsx            # NL Workflow Builder
│   │   ├── workflows/[id]/page.tsx           # Workflow detail + canvas
│   │   ├── templates/page.tsx                # Template library
│   │   ├── integrations/page.tsx             # Integration catalog
│   │   ├── history/page.tsx                  # Execution history
│   │   └── case-study/                       # PM case study (4 pages)
│   └── api/
│       ├── ai/parse-workflow/route.ts        # NL → Claude → steps
│       ├── ai/execute-workflow/route.ts      # Agentic execution loop
│       ├── workflows/                        # Workflow CRUD
│       ├── templates/                        # Template endpoints
│       ├── analytics/route.ts                # Dashboard data
│       └── executions/route.ts               # Execution history
├── lib/
│   ├── ai/prompts.ts                         # System prompts
│   ├── ai/tool-definitions.ts                # 14 Claude tool schemas
│   ├── integrations/registry.ts              # 6 integrations
│   ├── integrations/mock-executor.ts         # Mock tool responses
│   ├── templates/data.ts                     # 4 templates
│   └── store.ts                              # In-memory data store
└── types/                                    # TypeScript interfaces
```

---

## Key Design Decisions

| Decision | Choice | Rationale |
|:---|:---|:---|
| AI Model | Claude (Anthropic) | tool_use API is ideal for agentic loops with structured tool calling |
| No separate backend | Next.js API Routes | Simplifies deployment, single codebase for frontend + backend |
| In-memory store | Map-based with seed data | Zero setup, instant demo experience, no database configuration |
| Mock integrations | Realistic fake responses | Demonstrates architecture without requiring OAuth setup for 6 services |
| React Flow | @xyflow/react + dagre | Industry standard for node-based UIs with automatic layout |
| Dark mode default | Zoom-inspired palette | Matches Zoom's brand identity, demonstrates attention to design |

---

## Roadmap

- [ ] Deploy to Vercel with live demo URL
- [ ] Real OAuth for Google Calendar
- [ ] Streaming execution via Server-Sent Events
- [ ] Drag-and-drop canvas editing
- [ ] Workflow sharing and export
- [ ] User authentication with NextAuth.js
- [ ] Response caching for common prompts

---

<div align="center">

Built by [Pratush Mukherjee](https://github.com/pratushMukherjee)

</div>
