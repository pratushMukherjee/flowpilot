# FlowPilot — AI Workflow Automation Agent — Full Build Plan

## Project Overview

An AI-powered full-stack application that lets users describe automation goals in natural language, then uses an agentic Claude engine to build, visualize, and execute multi-step workflows across 6 third-party integrations — with a built-in product case study demonstrating PM thinking.

**Target:** Portfolio project for Zoom "Intern - AI Product Management, Agentic Workflows" (R18582, Seattle WA, deadline Feb 27 2026)

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 16 App Router)             │
│  LandingPage │ WorkflowBuilder │ VisualCanvas │ Dashboard       │
│  TemplateLib │ IntegrationsCatalog │ History │ CaseStudy        │
└──────────────────────────┬───────────────────────────────────────┘
                           │ REST (fetch)
┌──────────────────────────▼───────────────────────────────────────┐
│                   Backend (Next.js API Routes)                   │
│  /api/ai/parse-workflow  │  /api/ai/execute-workflow             │
│  /api/workflows (CRUD)   │  /api/templates  │  /api/analytics   │
│                                                                   │
│  WorkflowParser → Claude tool_use → WorkflowStep[]               │
│  AgenticExecutor → Claude loop → MockExecutor → StepResult[]     │
│  InMemoryStore → Workflows, Executions, Seeded Demo Data         │
└──────────────────────────┬───────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
     In-Memory Store   Mock Integrations   Anthropic Claude API
     (workflows,       (6 services with    (claude-sonnet-4-5
      executions,       realistic fake     via @anthropic-ai/sdk
      analytics)        responses)         with tool_use)
```

---

## Phase 1 — Foundation (Completed)

Project skeleton with all dependencies, theme system, layouts, and routing.

**Deliverables:**
- Next.js 16 + TypeScript + Tailwind v4 + App Router
- All 25 npm dependencies installed (see package.json)
- Zoom-inspired color theme (#0B5CFF primary, #00EDE7 accent, #00031F dark bg)
- Root layout with `next-themes` ThemeProvider (dark mode default)
- Dashboard shell layout: collapsible sidebar (12 nav items) + topbar + theme toggle
- All TypeScript types defined: WorkflowStep, Execution, StepResult, Integration, Template, AnalyticsData
- `.env.local` for ANTHROPIC_API_KEY, `.env.example` template
- `npm run build` passes — 0 errors, 22 routes generated

**Critical Files:**
- `src/app/layout.tsx` — Root layout, fonts, ThemeProvider
- `src/app/globals.css` — Tailwind v4 CSS theme with light/dark variables
- `src/app/(dashboard)/layout.tsx` — Dashboard shell (sidebar + topbar)
- `src/components/layout/sidebar.tsx` — Collapsible sidebar with main + case-study nav
- `src/components/layout/topbar.tsx` — Top bar with "New Workflow" CTA + theme toggle
- `src/components/theme-provider.tsx` — next-themes wrapper
- `src/lib/utils.ts` — cn(), generateId(), formatDate(), formatDuration(), delay()

---

## Phase 2 — Data Layer + Integration Registry (Completed)

In-memory data store, 6 integrations with mock execution, template data, analytics seed data.

**Deliverables:**
- `InMemoryStore`: workflow/execution CRUD with Map-based storage
- 2 seeded demo workflows + 2 sample executions on startup
- Integration registry: 6 integrations, each with typed actions/triggers/parameters
- Mock executor: returns realistic responses with 300-800ms simulated latency
- 4 pre-built templates with full step definitions
- Analytics mock data generator (30-day trend, integration usage, template popularity)
- All CRUD API routes functional: workflows, templates, executions, analytics

**Critical Files:**
- `src/lib/store.ts` — In-memory store with seed data (workflows, executions)
- `src/lib/integrations/registry.ts` — 6 integrations with actions[], triggers[], parameters[]
- `src/lib/integrations/mock-executor.ts` — Mock tool execution (14 tool handlers)
- `src/lib/templates/data.ts` — 4 templates: Meeting Follow-up, Weekly Report, Customer Onboarding, Sprint Planning
- `src/lib/analytics/mock-data.ts` — Seeded analytics (30-day trend, integration/template usage)
- `src/app/api/workflows/route.ts` — GET (list) + POST (create)
- `src/app/api/workflows/[id]/route.ts` — GET + PUT + DELETE
- `src/app/api/templates/route.ts` — GET with category filter
- `src/app/api/templates/[slug]/route.ts` — GET single template
- `src/app/api/analytics/route.ts` — GET dashboard data
- `src/app/api/executions/route.ts` — GET with optional workflowId filter

**Integration Details:**
| Integration | Actions | Triggers | Color |
|-------------|---------|----------|-------|
| Google Calendar | create_event, update_event, list_events | event_created, event_starting | #4285F4 |
| Slack | send_message, create_channel | message_received, reaction_added | #4A154B |
| Gmail | send_email, search_emails | email_received | #EA4335 |
| Zoom | create_meeting, get_recording | meeting_ended, recording_ready | #0B5CFF |
| Notion | create_page, update_page, query_database | page_created | #000000 |
| Jira | create_issue, update_issue, list_issues | issue_created, issue_updated | #0052CC |

---

## Phase 3 — AI Core: Workflow Parser + Agentic Executor (Completed)

The differentiator. Claude API with tool_use for NL parsing and an agentic execution loop.

**Deliverables:**
- Anthropic SDK client configured via ANTHROPIC_API_KEY env var
- Workflow parser system prompt (guides Claude to decompose NL into steps)
- Execution engine system prompt (guides Claude to execute steps in order)
- 14 Claude tool schemas: 1 parser tool + 11 integration tools + 2 flow control tools
- `POST /api/ai/parse-workflow`: NL input → Claude tool_use → WorkflowStep[]
- `POST /api/ai/execute-workflow`: Agentic loop (max 20 iterations) with mock tool execution
- Error handling: tool failures fed back to Claude for reasoning and recovery

**Critical Files:**
- `src/lib/ai/prompts.ts` — WORKFLOW_PARSER_SYSTEM_PROMPT + EXECUTION_SYSTEM_PROMPT
- `src/lib/ai/tool-definitions.ts` — workflowParserTools[] + executionTools[] (14 total)
- `src/app/api/ai/parse-workflow/route.ts` — NL → Claude → structured steps
- `src/app/api/ai/execute-workflow/route.ts` — Agentic execution loop

**Agentic Execution Flow:**
```
1. Client sends workflow steps to /api/ai/execute-workflow
2. Steps formatted into Claude message: "Execute this workflow step by step..."
3. Claude responds with tool_use calls (e.g., slack_send_message)
4. Each tool call → mockExecuteTool() → realistic fake response
5. Tool results fed back to Claude as tool_result messages
6. Claude reasons about next step, calls next tool
7. Loop continues until Claude says "end_turn" with no tool calls
8. Results aggregated: per-step status, duration, output
9. Max 20 iterations safety limit
```

**Tool Schema Categories:**
- **Parser Tool (1):** create_workflow_step — used during NL parsing phase
- **Integration Tools (11):** google_calendar_create_event, google_calendar_list_events, slack_send_message, slack_create_channel, gmail_send_email, zoom_create_meeting, zoom_get_recording, notion_create_page, notion_update_page, jira_create_issue, jira_list_issues
- **Flow Control Tools (2):** evaluate_condition, wait_delay

---

## Phase 4 — Frontend: Workflow Builder + Canvas + All Pages (Completed)

Full interactive UI across 22 routes with React Flow canvas and real-time execution visualization.

**Deliverables:**
- **Landing page** (`/`): Hero with gradient, "How it Works" 3-step, feature cards, integration badges, Framer Motion animations
- **Dashboard** (`/dashboard`): 4 stat cards, execution area chart (30-day), template pie chart, integration bar chart, recent executions list — all via Recharts
- **Workflow Builder** (`/workflows/new`): Textarea with example prompt chips, AI loading animation (4 stages), step preview cards with integration icons, detected integrations badges, Execute + Save buttons, per-step execution status (running/completed/failed indicators)
- **Workflow List** (`/workflows`): Search + status filter tabs, card grid with integration badges + step count
- **Workflow Detail** (`/workflows/[id]`): React Flow canvas with dagre auto-layout, custom styled nodes (color-coded by type + integration), animated edges, MiniMap, Controls, execution visualization (nodes change color), step details table, Execute + Delete buttons
- **Template Library** (`/templates`): Category tabs (all/meetings/reports/onboarding/planning), search, cards with popularity + time saved + integration badges
- **Template Detail** (`/templates/[slug]`): Long description, integration badges, step list, Deploy button (creates workflow + redirects)
- **Integrations Catalog** (`/integrations`): 6 cards with expandable action/trigger lists, "Connected" status badges
- **Execution History** (`/history`): Timeline with expandable per-step results, status badges, duration
- **Case Study** pages (4): see Phase 5

**Critical Files:**
- `src/app/(dashboard)/workflows/new/page.tsx` — ★ Hero feature, NL workflow builder
- `src/app/(dashboard)/workflows/[id]/page.tsx` — React Flow canvas + execution
- `src/app/(dashboard)/dashboard/page.tsx` — Analytics with Recharts
- `src/app/(dashboard)/templates/page.tsx` — Template library
- `src/app/(dashboard)/templates/[slug]/page.tsx` — Template detail + deploy
- `src/app/(dashboard)/integrations/page.tsx` — Integration catalog
- `src/app/(dashboard)/history/page.tsx` — Execution history

**React Flow Canvas Details:**
- dagre library for automatic node positioning (top-to-bottom layout)
- Custom node styling: colored borders per integration, type indicators (trigger=blue, action=green, condition=yellow, delay=gray)
- Animated edges with flowing style
- During execution: nodes transition gray→blue(running)→green(completed)/red(failed) with glow effects
- MiniMap with color-coded nodes by execution status
- Controls panel for zoom/pan

---

## Phase 5 — Case Study Pages: PM Signal (Completed)

Product management artifacts built directly into the app as navigable pages.

**Deliverables:**

### Competitive Analysis (`/case-study/competitive-analysis`)
- Comparison table: FlowPilot vs Zapier vs Make vs Power Automate vs n8n
- 10 features evaluated: NL Builder, Agentic Execution, Visual Canvas, Templates, Integrations, No-code, Conditions, Error Recovery, Analytics, Enterprise SSO
- Per-competitor cards: pricing, AI capability, strength, weakness
- Strategic positioning section: differentiation, target market, moat

### User Personas (`/case-study/user-personas`)
- **Sarah Chen** — Ops Manager, age 34, mid-size SaaS (200 ppl), moderate tech comfort
- **Alex Rivera** — Product Manager, age 29, growth startup (50 ppl), high tech comfort
- **Jordan Williams** — Executive Assistant, age 41, enterprise (2000+ ppl), low tech comfort
- **Priya Patel** — Senior Developer, age 27, tech company (500 ppl), very high tech comfort
- Each persona includes: quote, goals (4), pain points (4), how FlowPilot helps (4), tools used, tech comfort level

### PRD (`/case-study/prd`)
- Table of Contents with anchor links
- 7 sections: Problem Statement (with market opportunity), Goals & Non-Goals, User Stories (8 stories, P0-P2 prioritized), Technical Requirements (AI Engine, Integrations, Frontend, Performance), Success Metrics (6 with targets), Timeline (4 phases), Risks & Mitigations (4 risks with impact ratings)

### Metrics Framework (`/case-study/metrics-framework`)
- Visual metric hierarchy diagram
- **North Star**: Workflow Automation Hours Saved/Week — target >1,000h
- **Input Metrics (4)**: Workflows created/week (>50), template adoption rate (>40%), NL builder conversion (>70%), integration connections/user (>3)
- **Quality Metrics (4)**: Execution success rate (>95%), AI parse accuracy (>85%), error recovery rate (>60%), mean time to first workflow (<5min)
- **Growth Metrics (4)**: WAU (5% WoW growth), DAU/WAU (>0.3), Week 4 retention (>25%), sharing rate (>15%)
- Each metric includes: definition, how to measure (SQL-like query), target, current value, rationale

**Critical Files:**
- `src/app/(dashboard)/case-study/page.tsx` — Overview with 4 section cards
- `src/app/(dashboard)/case-study/competitive-analysis/page.tsx`
- `src/app/(dashboard)/case-study/user-personas/page.tsx`
- `src/app/(dashboard)/case-study/prd/page.tsx`
- `src/app/(dashboard)/case-study/metrics-framework/page.tsx`

---

## Phase 6 — Polish & Enhancements (Remaining)

Optional improvements if time permits before the Feb 27 deadline.

**Deliverables:**
- [ ] Deploy to Vercel (free tier) for a live demo URL
- [ ] Real OAuth for Google Calendar integration
- [ ] Streaming execution updates via Server-Sent Events (SSE)
- [ ] Drag-and-drop node editing on React Flow canvas
- [ ] Workflow sharing/export as JSON
- [ ] User authentication (NextAuth.js)
- [ ] Response caching for common NL prompts (reduce API costs)
- [ ] Add GitHub/Linear integrations
- [ ] README.md with screenshots
- [ ] Mobile hamburger menu for sidebar

---

## Key Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Framework | Next.js 16 (App Router) | Vite + React, Remix | App Router for API routes + RSC, no separate backend needed |
| AI Model | Claude Sonnet 4.5 via @anthropic-ai/sdk | OpenAI GPT-4o, Gemini | tool_use API perfect for agentic loops, shows Anthropic awareness |
| Styling | Tailwind v4 + CSS variables | shadcn/ui full install, CSS modules | Minimal setup, dark mode via CSS custom properties |
| Canvas | React Flow (@xyflow/react) | D3.js, vis.js, custom SVG | Industry standard for node-based UIs, free tier sufficient |
| Charts | Recharts | Chart.js, Nivo, Visx | Declarative, composable, works as client components |
| Animations | Framer Motion | CSS transitions, React Spring | Best DX for React animations, AnimatePresence for exit |
| Layout | dagre | ELKjs, custom algorithm | Lightweight graph layout, sufficient for auto-positioning |
| Database | In-memory Map + seed data | SQLite/Prisma, localStorage | Zero setup, seeded data provides instant demo experience |
| Dark Mode | next-themes | Manual class toggle | SSR-compatible, prevents theme flash, attribute="class" |
| Icons | Lucide React | Heroicons, Phosphor | Clean, consistent, tree-shakeable, excellent React support |

---

## Directory Structure

```
zoom1/
├── .env.local                              # ANTHROPIC_API_KEY (gitignored)
├── .env.example                            # Template for env vars
├── .gitignore                              # node_modules, .next, .env*
├── package.json                            # 25 deps, 8 devDeps
├── next.config.ts                          # Next.js config
├── postcss.config.mjs                      # @tailwindcss/postcss
├── tsconfig.json                           # TypeScript config
├── project_plan.md                         # Quick-reference plan
├── project_plan1.md                        # This file — full build plan
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # Root layout, fonts, ThemeProvider
│   │   ├── page.tsx                        # Landing page (hero, features, integrations)
│   │   ├── globals.css                     # Tailwind v4 theme (light + dark vars)
│   │   │
│   │   ├── (dashboard)/                    # Route group with sidebar shell
│   │   │   ├── layout.tsx                  # Dashboard shell (Sidebar + Topbar)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                # Analytics dashboard (4 charts)
│   │   │   ├── workflows/
│   │   │   │   ├── page.tsx                # Workflow list (search + filter + cards)
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx            # ★ NL Workflow Builder (hero feature)
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx            # Workflow detail (React Flow canvas)
│   │   │   ├── templates/
│   │   │   │   ├── page.tsx                # Template library (4 templates)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Template detail + deploy
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx                # Integration catalog (6 integrations)
│   │   │   ├── history/
│   │   │   │   └── page.tsx                # Execution history timeline
│   │   │   └── case-study/
│   │   │       ├── page.tsx                # Case study overview
│   │   │       ├── competitive-analysis/
│   │   │       │   └── page.tsx            # vs Zapier/Make/Power Automate/n8n
│   │   │       ├── user-personas/
│   │   │       │   └── page.tsx            # 4 user personas
│   │   │       ├── prd/
│   │   │       │   └── page.tsx            # Full PRD (7 sections)
│   │   │       └── metrics-framework/
│   │   │           └── page.tsx            # North Star + 12 metrics
│   │   │
│   │   └── api/
│   │       ├── ai/
│   │       │   ├── parse-workflow/
│   │       │   │   └── route.ts            # POST: NL → Claude → WorkflowStep[]
│   │       │   └── execute-workflow/
│   │       │       └── route.ts            # POST: Agentic execution loop
│   │       ├── workflows/
│   │       │   ├── route.ts                # GET (list) + POST (create)
│   │       │   └── [id]/
│   │       │       └── route.ts            # GET + PUT + DELETE
│   │       ├── templates/
│   │       │   ├── route.ts                # GET with category filter
│   │       │   └── [slug]/
│   │       │       └── route.ts            # GET single template
│   │       ├── analytics/
│   │       │   └── route.ts                # GET dashboard data
│   │       └── executions/
│   │           └── route.ts                # GET execution history
│   │
│   ├── components/
│   │   ├── theme-provider.tsx              # next-themes wrapper
│   │   └── layout/
│   │       ├── sidebar.tsx                 # Collapsible sidebar (12 nav items)
│   │       └── topbar.tsx                  # Top bar + New Workflow CTA + theme toggle
│   │
│   ├── lib/
│   │   ├── utils.ts                        # cn, generateId, formatDate, formatDuration, delay
│   │   ├── store.ts                        # In-memory CRUD store + seed data
│   │   ├── ai/
│   │   │   ├── prompts.ts                  # Parser + executor system prompts
│   │   │   └── tool-definitions.ts         # 14 Claude tool schemas
│   │   ├── integrations/
│   │   │   ├── registry.ts                 # 6 integrations definition
│   │   │   └── mock-executor.ts            # Mock tool responses
│   │   ├── templates/
│   │   │   └── data.ts                     # 4 template definitions
│   │   └── analytics/
│   │       └── mock-data.ts                # Seeded analytics generator
│   │
│   └── types/
│       ├── workflow.ts                     # WorkflowStep, Workflow, Execution, StepResult, StepUpdate
│       ├── integration.ts                  # Integration, IntegrationAction, IntegrationTrigger
│       ├── template.ts                     # Template
│       └── analytics.ts                    # AnalyticsData
│
└── public/
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key (required for AI features) | (required) |

---

## API Routes Summary

| Route | Method | Description | Request | Response |
|-------|--------|-------------|---------|----------|
| `/api/ai/parse-workflow` | POST | NL → structured workflow | `{ input: string }` | `{ steps: WorkflowStep[], integrations: string[], summary: string }` |
| `/api/ai/execute-workflow` | POST | Run agentic execution | `{ steps: WorkflowStep[], workflowName: string }` | `{ executionId, status, results: StepResult[], duration }` |
| `/api/workflows` | GET | List all workflows | — | `Workflow[]` |
| `/api/workflows` | POST | Create workflow | `Workflow` body | `Workflow` |
| `/api/workflows/[id]` | GET | Get single workflow | — | `Workflow` |
| `/api/workflows/[id]` | PUT | Update workflow | Partial `Workflow` | `Workflow` |
| `/api/workflows/[id]` | DELETE | Delete workflow | — | `{ success: true }` |
| `/api/templates` | GET | List templates | `?category=meetings` | `Template[]` |
| `/api/templates/[slug]` | GET | Get single template | — | `Template` |
| `/api/analytics` | GET | Dashboard analytics | — | `AnalyticsData` |
| `/api/executions` | GET | Execution history | `?workflowId=...` | `Execution[]` |

---

## TypeScript Data Models

### WorkflowStep
```typescript
{
  id: string
  order: number
  type: "trigger" | "action" | "condition" | "delay"
  label: string
  description: string
  integrationId: string       // "slack", "zoom", "google-calendar", etc.
  actionId: string             // "send_message", "create_meeting", etc.
  config: Record<string, unknown>
  conditions?: { if: { field, operator, value }, thenStepId, elseStepId? }
  onSuccess?: string
  onFailure?: string
  retryPolicy: { maxRetries: number, delayMs: number }
  position?: { x: number, y: number }
}
```

### Workflow
```typescript
{
  id: string
  name: string
  description: string
  naturalLanguageInput: string
  status: "draft" | "active" | "paused" | "archived"
  steps: WorkflowStep[]
  templateId?: string
  createdAt: string
  updatedAt: string
}
```

### Execution
```typescript
{
  id: string
  workflowId: string
  workflowName: string
  status: "running" | "completed" | "failed" | "cancelled"
  startedAt: string
  completedAt?: string
  stepResults: StepResult[]
  error?: string
  duration?: number
}
```

---

## Demo Flow (for interviews/presentations)

1. **Landing** (`/`) → "Create a Workflow" button
2. **Builder** (`/workflows/new`) → type: *"After each Zoom meeting, create notes in Notion, send a summary to Slack, and create Jira tickets for action items"*
3. **AI generates** → watch loading stages → step cards appear with integration icons
4. **Execute** → click Execute → steps animate running → completed
5. **Save** → click Save → redirected to detail page with React Flow canvas
6. **Canvas** (`/workflows/[id]`) → visual flowchart, click Execute again to see nodes light up
7. **Templates** (`/templates`) → browse 4 templates → deploy "Meeting Follow-up"
8. **Dashboard** (`/dashboard`) → charts showing execution trends, integration usage
9. **Case Study** (`/case-study`) → walk through competitive analysis, personas, PRD, metrics

---

## How to Resume Development

```bash
# Navigate to project
cd C:\Users\tsmm\Desktop\zoom1

# Install deps (if fresh clone)
npm install

# Add API key
# Edit .env.local → ANTHROPIC_API_KEY=sk-ant-...

# Start dev server
npm run dev

# Build (check for errors)
npm run build
```

**Current Status:** All 22 routes built and compiling. Build passes with zero errors. Ready for:
- Adding ANTHROPIC_API_KEY and testing the AI features live
- Optional polish (Phase 6 items above)
- Deployment to Vercel

---

## Why This Project Gets The Zoom Internship

| Job Requirement | How FlowPilot Demonstrates It |
|-----------------|-------------------------------|
| "AI Companion workflow automation features" | Entire project is an AI workflow automation platform |
| "Template creation and third-party integrations" | 4 templates + 6 integrations with action/trigger schemas |
| "Product specifications, requirements documents" | Full PRD built into the app at /case-study/prd |
| "Competitive analysis and user research" | Competitive analysis page + 4 user personas |
| "Usage metrics and user feedback" | Metrics framework with North Star + 12 supporting metrics |
| "Partner cross-functionally to support feature releases" | Architecture demonstrates understanding of eng/design/PM collaboration |
| "Strong interest in AI/ML technologies" | Built a working agentic AI system with Claude tool_use |
| "Basic understanding of software development processes" | Full-stack app: React, TypeScript, API design, data modeling |
| "Experience with collaboration tools" | Project integrates Zoom, Slack, Jira, Notion, Gmail, Calendar |
