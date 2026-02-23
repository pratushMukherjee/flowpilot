"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PRDPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Link href="/case-study" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Study
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Product Requirements Document</h1>
        <p className="mt-1 text-sm text-muted-foreground">FlowPilot v1.0 — AI Workflow Automation Platform</p>
      </div>

      {/* TOC */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Table of Contents</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-primary">
          {["Problem Statement", "Goals & Non-Goals", "User Stories", "Technical Requirements", "Success Metrics", "Timeline", "Risks & Mitigations"].map((s) => (
            <li key={s}><a href={`#${s.toLowerCase().replace(/ & | /g, "-")}`} className="hover:underline">{s}</a></li>
          ))}
        </ol>
      </div>

      {/* 1. Problem Statement */}
      <section id="problem-statement" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">1. Problem Statement</h2>
        <p className="text-sm text-muted-foreground">
          Knowledge workers spend an average of <strong className="text-foreground">4.1 hours per week</strong> on repetitive operational tasks that could be automated — copying data between tools, sending follow-up emails, creating reports, and scheduling meetings. Existing automation platforms (Zapier, Make, Power Automate) require manual, step-by-step configuration that is time-consuming and requires technical familiarity.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">The core problem:</strong> There is no workflow automation tool that allows users to describe their automation goals in natural language and have an AI agent autonomously build, optimize, and execute the workflow.
        </p>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs font-semibold text-muted-foreground">MARKET OPPORTUNITY</p>
          <p className="text-sm text-foreground mt-1">The workflow automation market is projected to reach $26B by 2025 (Gartner). With the advent of agentic AI, a new paradigm in automation is emerging — one where AI doesn&apos;t just assist but autonomously executes complex, multi-step processes.</p>
        </div>
      </section>

      {/* 2. Goals & Non-Goals */}
      <section id="goals--non-goals" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">2. Goals & Non-Goals</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-success/30 bg-success/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-success">Goals</h4>
            <ul className="space-y-1.5 text-xs text-foreground">
              <li>+ Enable non-technical users to create automations via natural language</li>
              <li>+ Reduce workflow setup time from 30+ minutes to under 2 minutes</li>
              <li>+ Support 6 core integrations (Zoom, Slack, Gmail, Calendar, Notion, Jira)</li>
              <li>+ Provide visual workflow representation and execution monitoring</li>
              <li>+ Achieve 90%+ execution success rate on standard workflows</li>
              <li>+ Offer pre-built templates for common use cases</li>
            </ul>
          </div>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-destructive">Non-Goals (v1.0)</h4>
            <ul className="space-y-1.5 text-xs text-foreground">
              <li>- Full production-grade integration authentication (OAuth)</li>
              <li>- Multi-user collaboration and team management</li>
              <li>- Custom code execution within workflows</li>
              <li>- Real-time webhook triggers (use polling for v1)</li>
              <li>- Mobile application</li>
              <li>- Enterprise SSO/SAML integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. User Stories */}
      <section id="user-stories" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">3. User Stories</h2>
        <div className="space-y-2">
          {[
            { priority: "P0", story: "As a user, I want to describe my workflow goal in natural language so that the AI creates a structured, executable workflow for me." },
            { priority: "P0", story: "As a user, I want to execute my workflow with one click and see real-time progress so that I can monitor the automation." },
            { priority: "P0", story: "As a user, I want to browse pre-built templates so that I can quickly deploy common automations without writing a description." },
            { priority: "P1", story: "As a user, I want to see a visual canvas of my workflow so that I understand the flow and dependencies between steps." },
            { priority: "P1", story: "As a user, I want to view execution history so that I can track reliability and debug failures." },
            { priority: "P1", story: "As a user, I want an analytics dashboard so that I can measure time saved and workflow performance." },
            { priority: "P2", story: "As a user, I want to customize template workflows before deploying so that they match my specific needs." },
            { priority: "P2", story: "As a user, I want conditional logic in my workflows so that different paths execute based on conditions." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 rounded-lg border border-border bg-background p-3">
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${
                item.priority === "P0" ? "bg-destructive/10 text-destructive" :
                item.priority === "P1" ? "bg-warning/10 text-warning" :
                "bg-muted text-muted-foreground"
              }`}>
                {item.priority}
              </span>
              <p className="text-xs text-foreground">{item.story}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Technical Requirements */}
      <section id="technical-requirements" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">4. Technical Requirements</h2>
        <div className="space-y-3">
          {[
            { area: "AI Engine", reqs: ["Claude API with tool_use for workflow parsing and execution", "Support for multi-turn agentic conversations (plan-execute-verify loop)", "Structured output: NL input → WorkflowStep[] via tool calls", "Error handling: feed tool errors back to Claude for reasoning and retry"] },
            { area: "Integrations", reqs: ["Standardized integration interface: actions[], triggers[], config schema", "Mock execution layer for demo (realistic responses with simulated latency)", "Extensible registry pattern for adding new integrations", "Support for 6 integrations: Google Calendar, Slack, Gmail, Zoom, Notion, Jira"] },
            { area: "Frontend", reqs: ["Next.js 14+ with App Router, TypeScript, Tailwind CSS", "React Flow (@xyflow/react) for visual workflow canvas", "Recharts for analytics visualizations", "Dark mode support via next-themes", "Responsive design (mobile → desktop)"] },
            { area: "Performance", reqs: ["Workflow parsing response < 10 seconds", "Workflow execution < 30 seconds for 6-step workflows", "Dashboard load time < 2 seconds", "Canvas renders smoothly for workflows up to 20 steps"] },
          ].map((section) => (
            <div key={section.area} className="rounded-lg border border-border bg-background p-4">
              <h4 className="mb-2 text-sm font-semibold text-foreground">{section.area}</h4>
              <ul className="space-y-1">
                {section.reqs.map((req, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Success Metrics */}
      <section id="success-metrics" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">5. Success Metrics</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { metric: "Workflow Creation Success", target: "> 85%", desc: "% of NL inputs that produce a valid, executable workflow" },
            { metric: "Execution Success Rate", target: "> 90%", desc: "% of workflow executions that complete without errors" },
            { metric: "Setup Time Reduction", target: "< 2 min", desc: "Time from NL input to deployed workflow (vs 30+ min for manual tools)" },
            { metric: "Template Adoption", target: "> 40%", desc: "% of users who deploy at least one template workflow" },
            { metric: "Weekly Active Workflows", target: "> 3 per user", desc: "Average number of workflows executed per user per week" },
            { metric: "Time Saved", target: "> 5 hours/week", desc: "Average hours saved per user through automated workflows" },
          ].map((m) => (
            <div key={m.metric} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-foreground">{m.metric}</h4>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{m.target}</span>
              </div>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Timeline */}
      <section id="timeline" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">6. Timeline</h2>
        <div className="space-y-2">
          {[
            { phase: "Phase 1: Foundation", duration: "Week 1-2", items: "Project setup, integration registry, mock executor, database schema" },
            { phase: "Phase 2: AI Core", duration: "Week 3-4", items: "Workflow parser, agentic executor, tool definitions, prompt engineering" },
            { phase: "Phase 3: UI", duration: "Week 5-7", items: "Workflow builder, visual canvas, template library, analytics dashboard" },
            { phase: "Phase 4: Polish", duration: "Week 8", items: "Dark mode, responsive design, animations, case study pages, testing" },
          ].map((phase) => (
            <div key={phase.phase} className="flex items-start gap-4 rounded-lg border border-border bg-background p-3">
              <div className="shrink-0">
                <p className="text-xs font-bold text-primary">{phase.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{phase.phase}</h4>
                <p className="text-xs text-muted-foreground">{phase.items}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Risks */}
      <section id="risks--mitigations" className="space-y-3">
        <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">7. Risks & Mitigations</h2>
        <div className="space-y-2">
          {[
            { risk: "AI generates invalid or incomplete workflows", impact: "High", mitigation: "Structured tool_use output constrains Claude to valid step schemas. Validation layer catches malformed steps before execution." },
            { risk: "API rate limits during demos", impact: "Medium", mitigation: "Implement response caching for common prompts. Demo mode uses pre-computed responses." },
            { risk: "Mock integrations don't feel realistic", impact: "Medium", mitigation: "Add realistic latency, response structures matching real APIs, and occasional simulated failures to demonstrate error handling." },
            { risk: "Workflow execution takes too long", impact: "Low", mitigation: "Use Claude Haiku for parsing (faster, cheaper), Sonnet for execution. Implement timeout guards." },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold text-foreground">{item.risk}</h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  item.impact === "High" ? "bg-destructive/10 text-destructive" :
                  item.impact === "Medium" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>{item.impact}</span>
              </div>
              <p className="text-xs text-muted-foreground"><strong>Mitigation:</strong> {item.mitigation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
