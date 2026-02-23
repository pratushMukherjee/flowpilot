"use client";

import Link from "next/link";
import { ArrowLeft, Briefcase, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

const personas = [
  {
    name: "Sarah Chen",
    role: "Operations Manager",
    company: "Mid-size SaaS Company (200 employees)",
    age: 34,
    color: "#0B5CFF",
    quote: "I spend 3 hours every week manually copying data between our tools. There has to be a better way.",
    goals: [
      "Reduce manual, repetitive operational tasks",
      "Ensure consistent processes across the team",
      "Free up time for strategic planning",
      "Reduce human error in data transfer between tools",
    ],
    painPoints: [
      "Manually updating multiple tools after every meeting",
      "Inconsistent follow-up processes across team members",
      "No time to learn complex automation platforms like Zapier",
      "Current automation tools require too much technical configuration",
    ],
    howFlowPilotHelps: [
      "Describe workflows in plain English — no technical setup",
      "Meeting Follow-up template eliminates manual note-taking",
      "AI handles conditional logic she'd struggle to configure manually",
      "Analytics dashboard shows time saved to justify ROI to leadership",
    ],
    tools: ["Slack", "Google Calendar", "Zoom", "Notion", "Gmail"],
    techComfort: "Moderate — comfortable with SaaS tools, not with APIs or code",
  },
  {
    name: "Alex Rivera",
    role: "Product Manager",
    company: "Growth-stage Startup (50 employees)",
    age: 29,
    color: "#10b981",
    quote: "Sprint planning takes half my Monday. I wish I could automate the prep work so I can focus on strategy.",
    goals: [
      "Automate sprint planning preparation",
      "Generate weekly status reports without manual effort",
      "Keep stakeholders informed without writing update emails",
      "Track team velocity and identify bottlenecks",
    ],
    painPoints: [
      "Spends 2+ hours preparing for sprint planning meetings",
      "Weekly status reports take an hour to compile",
      "Context switching between Jira, Slack, and email for updates",
      "No centralized view of what got done vs. what was planned",
    ],
    howFlowPilotHelps: [
      "Sprint Planning template automates backlog review and meeting setup",
      "Weekly Report template pulls data from Jira and generates summaries",
      "AI identifies priority items and suggests sprint scope",
      "Execution history shows workflow reliability over time",
    ],
    tools: ["Jira", "Slack", "Zoom", "Notion", "Google Calendar"],
    techComfort: "High — can write basic scripts, prefers no-code solutions for speed",
  },
  {
    name: "Jordan Williams",
    role: "Executive Assistant",
    company: "Enterprise (2,000+ employees)",
    age: 41,
    color: "#f59e0b",
    quote: "I support 4 executives. If I could automate meeting prep and follow-ups, I'd have time for the work that actually matters.",
    goals: [
      "Automate meeting preparation (agendas, materials, reminders)",
      "Ensure follow-up emails are sent promptly after every meeting",
      "Maintain organized documentation for executive decisions",
      "Handle scheduling conflicts proactively",
    ],
    painPoints: [
      "Manages 40+ meetings per week across 4 executives",
      "Meeting notes are inconsistent when done manually",
      "Follow-up emails often delayed due to volume",
      "Finds Zapier too technical, gives up after 10 minutes",
    ],
    howFlowPilotHelps: [
      "Natural language interface — no technical barrier",
      "Meeting Follow-up template handles end-to-end post-meeting tasks",
      "Templates can be customized per executive's preferences",
      "Reliability tracking ensures nothing falls through the cracks",
    ],
    tools: ["Google Calendar", "Gmail", "Zoom", "Notion", "Slack"],
    techComfort: "Low — uses standard office tools, avoids technical interfaces",
  },
  {
    name: "Priya Patel",
    role: "Senior Developer",
    company: "Tech Company (500 employees)",
    age: 27,
    color: "#8b5cf6",
    quote: "I built a custom Slack bot for deployment notifications. It took 3 days. This should take 3 minutes.",
    goals: [
      "Automate deployment notifications and incident response",
      "Connect CI/CD pipeline events to team communication channels",
      "Reduce time spent on operational automation scripts",
      "Prototype workflow automations before building custom solutions",
    ],
    painPoints: [
      "Building custom integration scripts takes days, not minutes",
      "Maintaining homegrown automation tools is a burden",
      "Existing no-code tools lack the flexibility developers need",
      "n8n is powerful but requires self-hosting and maintenance",
    ],
    howFlowPilotHelps: [
      "Rapid prototyping — describe a workflow and see it working instantly",
      "Agentic execution handles complex logic without custom code",
      "Visual canvas provides clear documentation of workflow architecture",
      "Can transition prototyped workflows to production pipelines",
    ],
    tools: ["Jira", "Slack", "GitHub (future)", "Notion", "Gmail"],
    techComfort: "Very high — full-stack developer, prefers efficiency tools",
  },
];

export default function UserPersonasPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/case-study" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Study
        </Link>
        <h1 className="text-3xl font-bold text-foreground">User Personas</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Four key personas representing FlowPilot&apos;s target user segments, spanning technical comfort levels and use cases.
        </p>
      </div>

      <div className="space-y-6">
        {personas.map((persona) => (
          <div
            key={persona.name}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-border p-5" style={{ borderLeftWidth: 4, borderLeftColor: persona.color }}>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: persona.color }}
              >
                {persona.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{persona.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {persona.role} | {persona.company} | Age {persona.age}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-b border-border bg-background px-5 py-3">
              <p className="italic text-sm text-muted-foreground">
                &quot;{persona.quote}&quot;
              </p>
            </div>

            {/* Details */}
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-success" />
                  <h4 className="text-sm font-semibold text-foreground">Goals</h4>
                </div>
                <ul className="space-y-1.5">
                  {persona.goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-success">+</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <h4 className="text-sm font-semibold text-foreground">Pain Points</h4>
                </div>
                <ul className="space-y-1.5">
                  {persona.painPoints.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-warning">!</span>
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">How FlowPilot Helps</h4>
                </div>
                <ul className="grid gap-1.5 md:grid-cols-2">
                  {persona.howFlowPilotHelps.map((help, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-primary">✓</span>
                      {help}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold text-muted-foreground">Primary Tools</h4>
                <div className="flex flex-wrap gap-1">
                  {persona.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-semibold text-muted-foreground">Technical Comfort</h4>
                <p className="text-xs text-foreground">{persona.techComfort}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
