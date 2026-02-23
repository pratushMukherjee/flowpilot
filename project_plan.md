# FlowPilot — AI-Powered Workflow Automation Platform

## Purpose
Portfolio project for the **Zoom "Intern - AI Product Management, Agentic Workflows"** role (R18582, Seattle WA). Deadline: Feb 27, 2026.

This project directly mirrors Zoom AI Companion Workflows — demonstrating both technical ability and product management thinking.

---

## What This Project Does
FlowPilot lets users describe automation goals in natural language, and an AI agent (Claude) builds, orchestrates, and executes multi-step workflows across 6 integrations (Google Calendar, Slack, Gmail, Zoom, Notion, Jira).

**Key differentiator**: No existing platform combines NL workflow creation with agentic multi-step execution. Zapier/Make require manual step-by-step config. FlowPilot is AI-first.

---

## Tech Stack
- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** + Lucide icons
- **Claude API** (`@anthropic-ai/sdk`) — powers the agentic engine
- **React Flow** (`@xyflow/react`) — visual workflow canvas
- **Recharts** — analytics charts
- **Framer Motion** — animations
- **next-themes** — dark mode
- **dagre** — automatic graph layout

---

## Architecture

### AI Core (most important part)
```
User types NL goal
  → POST /api/ai/parse-workflow
    → Claude with tool_use (create_workflow_step tool)
    → Returns structured WorkflowStep[]

User clicks "Execute"
  → POST /api/ai/execute-workflow
    → Claude in agentic loop:
      1. Claude reasons about next step
      2. Calls integration tool (e.g., slack_send_message)
      3. Mock executor returns realistic response
      4. Result fed back to Claude
      5. Repeat until all steps done
    → Returns execution results with per-step status
```

### Integration System
6 integrations with mock executor (`src/lib/integrations/mock-executor.ts`):
- **Google Calendar**: create_event, update_event, list_events
- **Slack**: send_message, create_channel
- **Gmail**: send_email, search_emails
- **Zoom**: create_meeting, get_recording
- **Notion**: create_page, update_page, query_database
- **Jira**: create_issue, update_issue, list_issues

Each returns realistic fake data with simulated latency (300-800ms).

### Data Storage
In-memory store (`src/lib/store.ts`) with seeded demo data. No database required. Includes 2 pre-built demo workflows and sample execution history.

---

## File Structure
```
src/
  app/
    page.tsx                          — Landing page
    layout.tsx                        — Root layout + theme provider
    globals.css                       — Tailwind v4 + Zoom color theme

    (dashboard)/
      layout.tsx                      — Dashboard shell (sidebar + topbar)
      dashboard/page.tsx              — Analytics dashboard (charts)
      workflows/page.tsx              — Workflow list
      workflows/new/page.tsx          — ★ NL Workflow Builder (hero feature)
      workflows/[id]/page.tsx         — Workflow detail + React Flow canvas
      templates/page.tsx              — Template library
      templates/[slug]/page.tsx       — Template detail + deploy
      integrations/page.tsx           — Integration catalog
      history/page.tsx                — Execution history
      case-study/page.tsx             — Case study overview
      case-study/competitive-analysis — vs Zapier/Make/Power Automate/n8n
      case-study/user-personas        — 4 personas
      case-study/prd                  — Full PRD
      case-study/metrics-framework    — North Star + input/quality/growth metrics

    api/
      ai/parse-workflow/route.ts      — NL → structured workflow (Claude)
      ai/execute-workflow/route.ts    — Agentic execution loop (Claude)
      workflows/route.ts              — CRUD
      workflows/[id]/route.ts         — Single workflow CRUD
      templates/route.ts              — List templates
      templates/[slug]/route.ts       — Single template
      analytics/route.ts              — Dashboard data
      executions/route.ts             — Execution history

  lib/
    ai/
      prompts.ts                      — System prompts for parser + executor
      tool-definitions.ts             — Claude tool schemas (14 tools)
    integrations/
      registry.ts                     — 6 integrations with actions/triggers
      mock-executor.ts                — Mock tool execution
    templates/data.ts                 — 4 pre-built templates
    analytics/mock-data.ts            — Seeded analytics data
    store.ts                          — In-memory workflow/execution store
    utils.ts                          — cn(), generateId(), formatDate(), etc.

  components/
    layout/sidebar.tsx                — Collapsible sidebar nav
    layout/topbar.tsx                 — Top bar + theme toggle
    theme-provider.tsx                — next-themes wrapper

  types/
    workflow.ts                       — WorkflowStep, Execution, StepResult
    integration.ts                    — Integration, Action, Trigger
    template.ts                       — Template type
    analytics.ts                      — AnalyticsData type
```

---

## 4 Pre-built Templates
1. **Meeting Follow-up** — Zoom → Notion notes → Slack summary → Jira tickets → Gmail follow-up
2. **Weekly Report** — Jira completed tickets → Slack highlights → Notion report → Gmail to stakeholders
3. **Customer Onboarding** — Slack channel → Calendar kickoff → Zoom link → Notion project → Jira epic → Welcome email
4. **Sprint Planning** — Jira backlog → Notion sprint doc → Calendar meeting → Zoom (if remote) → Slack agenda

---

## Case Study Pages (PM Signal)

### Competitive Analysis
Comparison table across 10 features for FlowPilot, Zapier, Make, Power Automate, n8n. Key insight: no competitor combines NL creation + agentic execution.

### User Personas
- **Sarah Chen** (Ops Manager) — moderate tech comfort, wants to stop manual data copying
- **Alex Rivera** (PM) — high tech comfort, wants automated sprint planning
- **Jordan Williams** (EA) — low tech comfort, manages 40+ meetings/week
- **Priya Patel** (Developer) — very high tech comfort, wants rapid prototyping

### PRD
Full document: Problem Statement, Goals/Non-Goals, User Stories (P0-P2), Technical Requirements, Success Metrics, Timeline, Risks & Mitigations.

### Metrics Framework
- **North Star**: Workflow Automation Hours Saved/Week (target: >1,000h)
- **Input**: Workflows created, template adoption, NL conversion rate, integration connections
- **Quality**: Execution success rate (>95%), AI parse accuracy (>85%), error recovery, time-to-first-workflow
- **Growth**: WAU, DAU/WAU ratio, Week 4 retention, sharing rate

---

## How to Run
```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key to .env.local
ANTHROPIC_API_KEY=sk-ant-...

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## Key Demo Flow
1. **Landing page** → click "Create a Workflow"
2. **Workflow Builder** → type: "After each Zoom meeting, create notes in Notion, send a summary to Slack, and create Jira tickets for action items"
3. **Watch AI generate** → structured steps appear with integration badges
4. **Click Execute** → steps animate through running → completed states
5. **Click Save** → redirected to workflow detail with React Flow canvas
6. **Browse Templates** → deploy "Meeting Follow-up" template
7. **Dashboard** → see analytics charts
8. **Case Study** → show competitive analysis, personas, PRD, metrics

---

## Why This Gets You The Job
1. **Direct mirror** of Zoom AI Companion Workflows product
2. **Working agentic AI** — not just a mockup, real Claude API calls
3. **PM thinking** — competitive analysis, personas, PRD, metrics framework built into the app
4. **Technical depth** — plan-execute-verify agentic loop, tool_use API, React Flow canvas
5. **6 integrations** including Zoom itself
6. **Professional UI** — Zoom-inspired design, dark mode, animations, responsive

---

## Possible Enhancements (if time permits)
- [ ] Real OAuth for one integration (Google Calendar)
- [ ] Streaming execution updates via SSE
- [ ] Drag-and-drop canvas editing
- [ ] Workflow sharing/export
- [ ] Deployment to Vercel
- [ ] Add GitHub Actions integration
- [ ] User authentication
- [ ] Response caching for common prompts (reduce API costs)

---

## Environment
- Node.js 18+
- npm
- Anthropic API key required for AI features
- No database setup needed (in-memory store)
- Builds with `npm run build` — zero errors, 22 routes
