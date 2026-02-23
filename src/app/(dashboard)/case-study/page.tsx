"use client";

import Link from "next/link";
import { BarChart3, Users, ClipboardList, Target, ArrowRight, FileText } from "lucide-react";

const sections = [
  {
    title: "Competitive Analysis",
    description: "How FlowPilot compares to Zapier, Make, Power Automate, and n8n across AI capabilities, ease of use, and agentic features.",
    href: "/case-study/competitive-analysis",
    icon: BarChart3,
  },
  {
    title: "User Personas",
    description: "Four key user personas representing our target market: Operations Manager, Product Manager, Executive Assistant, and Developer.",
    href: "/case-study/user-personas",
    icon: Users,
  },
  {
    title: "Product Requirements Document",
    description: "Full PRD with problem statement, goals, user stories, technical requirements, success metrics, and risk analysis.",
    href: "/case-study/prd",
    icon: ClipboardList,
  },
  {
    title: "Metrics Framework",
    description: "North Star metric, input metrics, quality metrics, and growth metrics with definitions, targets, and measurement strategies.",
    href: "/case-study/metrics-framework",
    icon: Target,
  },
];

export default function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Product Case Study</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          FlowPilot: AI Workflow Automation
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          A comprehensive product case study demonstrating product management thinking
          for an AI-powered workflow automation platform. This analysis covers market
          positioning, user research, product strategy, and metrics-driven decision making.
        </p>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="mb-2 text-sm font-semibold text-primary">Key Thesis</h3>
        <p className="text-sm text-foreground">
          Current workflow automation tools (Zapier, Make) require manual step-by-step
          configuration. By leveraging agentic AI, FlowPilot enables users to describe
          their automation goals in natural language and have an AI agent build, optimize,
          and execute workflows autonomously — reducing setup time by 90% and unlocking
          automation for non-technical users.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {section.title}
            </h3>
            <p className="mb-3 text-sm text-muted-foreground">
              {section.description}
            </p>
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              Read more <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
