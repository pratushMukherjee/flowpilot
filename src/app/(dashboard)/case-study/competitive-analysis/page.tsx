"use client";

import { ArrowLeft, CheckCircle2, XCircle, Minus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const competitors = [
  {
    name: "FlowPilot",
    highlight: true,
    scores: {
      "NL Workflow Builder": "full",
      "Agentic Execution": "full",
      "Visual Canvas": "full",
      "Pre-built Templates": "full",
      "Third-party Integrations": "partial",
      "No-code Setup": "full",
      "Conditional Logic": "full",
      "Error Recovery": "full",
      "Analytics Dashboard": "full",
      "Enterprise SSO": "none",
    },
    pricing: "Free (Demo)",
    aiCapability: "Advanced — agentic multi-step reasoning with tool use",
    strength: "Natural language interface eliminates manual step configuration",
    weakness: "Early stage, limited production integrations",
  },
  {
    name: "Zapier",
    highlight: false,
    scores: {
      "NL Workflow Builder": "partial",
      "Agentic Execution": "none",
      "Visual Canvas": "full",
      "Pre-built Templates": "full",
      "Third-party Integrations": "full",
      "No-code Setup": "full",
      "Conditional Logic": "full",
      "Error Recovery": "partial",
      "Analytics Dashboard": "partial",
      "Enterprise SSO": "full",
    },
    pricing: "$19.99-$799/mo",
    aiCapability: "Basic — AI field mapping, no agentic reasoning",
    strength: "7,000+ integrations, market leader, massive template library",
    weakness: "Manual step-by-step configuration, no AI workflow generation",
  },
  {
    name: "Make (Integromat)",
    highlight: false,
    scores: {
      "NL Workflow Builder": "none",
      "Agentic Execution": "none",
      "Visual Canvas": "full",
      "Pre-built Templates": "full",
      "Third-party Integrations": "full",
      "No-code Setup": "partial",
      "Conditional Logic": "full",
      "Error Recovery": "full",
      "Analytics Dashboard": "partial",
      "Enterprise SSO": "full",
    },
    pricing: "$9-$299/mo",
    aiCapability: "None — fully manual configuration",
    strength: "Powerful visual builder, complex data transformations",
    weakness: "Steep learning curve, no AI capabilities whatsoever",
  },
  {
    name: "Power Automate",
    highlight: false,
    scores: {
      "NL Workflow Builder": "partial",
      "Agentic Execution": "none",
      "Visual Canvas": "full",
      "Pre-built Templates": "full",
      "Third-party Integrations": "full",
      "No-code Setup": "partial",
      "Conditional Logic": "full",
      "Error Recovery": "partial",
      "Analytics Dashboard": "full",
      "Enterprise SSO": "full",
    },
    pricing: "$15/user/mo",
    aiCapability: "Moderate — Copilot can suggest flows, no agentic execution",
    strength: "Deep Microsoft 365 integration, enterprise-grade",
    weakness: "Complex UI, vendor lock-in to Microsoft ecosystem",
  },
  {
    name: "n8n",
    highlight: false,
    scores: {
      "NL Workflow Builder": "none",
      "Agentic Execution": "partial",
      "Visual Canvas": "full",
      "Pre-built Templates": "partial",
      "Third-party Integrations": "full",
      "No-code Setup": "none",
      "Conditional Logic": "full",
      "Error Recovery": "full",
      "Analytics Dashboard": "none",
      "Enterprise SSO": "partial",
    },
    pricing: "Free (self-hosted)",
    aiCapability: "Basic — AI nodes for LLM calls, no workflow generation",
    strength: "Open source, self-hostable, developer-friendly",
    weakness: "Requires technical setup, no natural language interface",
  },
];

const features = Object.keys(competitors[0].scores);

function ScoreIcon({ score }: { score: string }) {
  if (score === "full") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (score === "partial") return <Minus className="h-4 w-4 text-warning" />;
  return <XCircle className="h-4 w-4 text-muted-foreground/40" />;
}

export default function CompetitiveAnalysisPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <Link href="/case-study" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Study
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Competitive Analysis</h1>
        <p className="mt-2 text-base text-muted-foreground">
          How FlowPilot&apos;s AI-first approach differentiates from existing workflow automation platforms.
        </p>
      </div>

      {/* Key Insight */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="mb-2 text-sm font-semibold text-primary">Key Insight</h3>
        <p className="text-sm text-foreground">
          No existing platform combines <strong>natural language workflow creation</strong> with{" "}
          <strong>agentic multi-step execution</strong>. Zapier and Make require manual configuration.
          Power Automate&apos;s Copilot can suggest steps but cannot autonomously execute.
          FlowPilot is the only platform where users describe a goal and the AI handles everything else.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="p-3 text-left text-xs font-semibold text-muted-foreground">Feature</th>
              {competitors.map((c) => (
                <th
                  key={c.name}
                  className={cn(
                    "p-3 text-center text-xs font-semibold",
                    c.highlight ? "bg-primary/5 text-primary" : "text-foreground"
                  )}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={feature} className={cn("border-b border-border", i % 2 === 0 && "bg-card/50")}>
                <td className="p-3 text-xs font-medium text-foreground">{feature}</td>
                {competitors.map((c) => (
                  <td
                    key={c.name}
                    className={cn("p-3 text-center", c.highlight && "bg-primary/5")}
                  >
                    <div className="flex justify-center">
                      <ScoreIcon score={c.scores[feature as keyof typeof c.scores]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Competitor Details */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {competitors.map((c) => (
          <div
            key={c.name}
            className={cn(
              "rounded-xl border bg-card p-5",
              c.highlight ? "border-primary" : "border-border"
            )}
          >
            <h3 className={cn("mb-3 text-lg font-bold", c.highlight ? "text-primary" : "text-foreground")}>
              {c.name}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-muted-foreground">Pricing:</span>
                <p className="text-foreground">{c.pricing}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">AI Capability:</span>
                <p className="text-foreground">{c.aiCapability}</p>
              </div>
              <div>
                <span className="font-semibold text-success">Strength:</span>
                <p className="text-foreground">{c.strength}</p>
              </div>
              <div>
                <span className="font-semibold text-destructive">Weakness:</span>
                <p className="text-foreground">{c.weakness}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Positioning */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-bold text-foreground">Strategic Positioning</h2>
        <div className="space-y-4 text-sm text-foreground">
          <div>
            <h4 className="font-semibold text-primary">Differentiation Strategy</h4>
            <p className="mt-1 text-muted-foreground">
              FlowPilot positions itself as the &quot;AI-native&quot; workflow automation platform.
              While incumbents bolt AI onto existing manual interfaces, FlowPilot is built AI-first:
              the natural language builder is the primary interface, not an add-on.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary">Target Market Entry</h4>
            <p className="mt-1 text-muted-foreground">
              Start with teams already using multiple SaaS tools (Slack + Jira + Google Workspace)
              who lack dedicated automation engineers. These teams want automation but find
              Zapier&apos;s manual configuration too time-consuming.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary">Moat</h4>
            <p className="mt-1 text-muted-foreground">
              The agentic execution engine — the ability for AI to reason about multi-step workflows,
              handle branching, and recover from errors — is a technical moat. As more workflows are
              executed, the system learns optimal patterns, creating a data flywheel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
