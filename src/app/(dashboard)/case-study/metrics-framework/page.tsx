"use client";

import Link from "next/link";
import { ArrowLeft, Star, ArrowUpRight, Shield, TrendingUp } from "lucide-react";

const metricCategories = [
  {
    title: "North Star Metric",
    icon: Star,
    color: "#0B5CFF",
    description: "The single metric that best captures the value FlowPilot delivers to users.",
    metrics: [
      {
        name: "Workflow Automation Hours Saved per Week",
        definition: "Total hours saved across all users through automated workflow executions, compared to manual task completion time.",
        howToMeasure: "Sum of (estimated manual time per workflow × execution count) across all active workflows. Estimated manual time is benchmarked via user surveys and time-motion studies.",
        target: "> 1,000 hours/week (across all users)",
        current: "312 hours/week",
        rationale: "This metric directly reflects user value — every hour saved is an hour redirected to higher-value work.",
      },
    ],
  },
  {
    title: "Input Metrics",
    icon: ArrowUpRight,
    color: "#10b981",
    description: "Leading indicators that drive the North Star. If these improve, hours saved should follow.",
    metrics: [
      {
        name: "Workflows Created per Week",
        definition: "Number of new workflows created (both from NL builder and templates).",
        howToMeasure: "COUNT(workflows) WHERE created_at > 7 days ago.",
        target: "> 50 workflows/week",
        current: "24 total",
        rationale: "More workflows = more automation opportunities = more time saved.",
      },
      {
        name: "Template Adoption Rate",
        definition: "Percentage of new users who deploy at least one template within their first week.",
        howToMeasure: "(Users who deployed template in first 7 days) / (Total new users in period).",
        target: "> 40%",
        current: "—",
        rationale: "Templates lower the barrier to first value. High adoption signals good onboarding.",
      },
      {
        name: "NL Builder Conversion Rate",
        definition: "Percentage of NL inputs that result in a saved workflow.",
        howToMeasure: "(Workflows saved from NL builder) / (Total NL parse requests).",
        target: "> 70%",
        current: "—",
        rationale: "Indicates AI quality — if users don't save, the AI output wasn't useful.",
      },
      {
        name: "Integration Connections per User",
        definition: "Average number of integrations connected per active user.",
        howToMeasure: "AVG(connected_integrations) WHERE user.isActive = true.",
        target: "> 3 per user",
        current: "6 (demo)",
        rationale: "More connections enable more complex workflows and increase switching costs.",
      },
    ],
  },
  {
    title: "Quality Metrics",
    icon: Shield,
    color: "#f59e0b",
    description: "Metrics that ensure the product is reliable and trustworthy.",
    metrics: [
      {
        name: "Execution Success Rate",
        definition: "Percentage of workflow executions that complete all steps without errors.",
        howToMeasure: "(Successful executions) / (Total executions) × 100.",
        target: "> 95%",
        current: "94.7%",
        rationale: "Users won't trust automation if it fails. This is our reliability bar.",
      },
      {
        name: "AI Parse Accuracy",
        definition: "Percentage of NL inputs correctly parsed into valid, executable workflows.",
        howToMeasure: "Human evaluation of random sample — are the right integrations and actions selected?",
        target: "> 85%",
        current: "—",
        rationale: "Measures core AI quality. Incorrect parsing wastes user time and erodes trust.",
      },
      {
        name: "Error Recovery Rate",
        definition: "Percentage of step failures that are automatically recovered via retry logic.",
        howToMeasure: "(Steps recovered after retry) / (Total step failures) × 100.",
        target: "> 60%",
        current: "—",
        rationale: "Agentic AI should handle transient failures gracefully, demonstrating resilience.",
      },
      {
        name: "Mean Time to First Workflow",
        definition: "Average time from a user's first visit to their first workflow execution.",
        howToMeasure: "Median(first_execution_timestamp - first_visit_timestamp).",
        target: "< 5 minutes",
        current: "—",
        rationale: "Measures onboarding friction. Faster time-to-value improves retention.",
      },
    ],
  },
  {
    title: "Growth Metrics",
    icon: TrendingUp,
    color: "#8b5cf6",
    description: "Metrics that indicate sustainable business growth and user engagement.",
    metrics: [
      {
        name: "Weekly Active Users (WAU)",
        definition: "Users who executed at least one workflow in the past 7 days.",
        howToMeasure: "COUNT(DISTINCT user_id) WHERE execution.created_at > 7 days ago.",
        target: "Week-over-week growth > 5%",
        current: "—",
        rationale: "Core engagement metric. Active users create network effects as they share workflows.",
      },
      {
        name: "DAU/WAU Ratio",
        definition: "Daily active users divided by weekly active users — measures daily engagement stickiness.",
        howToMeasure: "AVG(daily DAU) / WAU over a 7-day period.",
        target: "> 0.3 (30%)",
        current: "—",
        rationale: "Indicates habitual use. Automation tools should run daily, so 30%+ is healthy.",
      },
      {
        name: "Week 4 Retention",
        definition: "Percentage of users still active 4 weeks after signup.",
        howToMeasure: "(Users active in week 4) / (Users who signed up in week 0) × 100.",
        target: "> 25%",
        current: "—",
        rationale: "Month-long retention validates that FlowPilot delivers sustained value.",
      },
      {
        name: "Workflow Sharing Rate",
        definition: "Percentage of users who share at least one workflow with a teammate.",
        howToMeasure: "(Users who shared) / (Total active users) × 100.",
        target: "> 15%",
        current: "— (feature not yet built)",
        rationale: "Viral coefficient. Shared workflows drive organic growth.",
      },
    ],
  },
];

export default function MetricsFrameworkPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/case-study" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Study
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Metrics Framework</h1>
        <p className="mt-2 text-base text-muted-foreground">
          A structured framework for measuring FlowPilot&apos;s success across user value, product quality, and business growth.
        </p>
      </div>

      {/* Metric Hierarchy Visualization */}
      <div className="rounded-xl border border-border bg-card p-5 text-center">
        <p className="text-xs font-semibold text-muted-foreground mb-3">METRIC HIERARCHY</p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="rounded-lg bg-primary/10 border border-primary/30 px-4 py-2">
            <p className="text-xs font-bold text-primary">North Star</p>
            <p className="text-[10px] text-primary/70">Hours Saved/Week</p>
          </div>
          <span className="text-muted-foreground">←</span>
          <div className="rounded-lg bg-success/10 border border-success/30 px-4 py-2">
            <p className="text-xs font-bold text-success">Input Metrics</p>
            <p className="text-[10px] text-success/70">Workflows, Templates, NL Conversion</p>
          </div>
          <span className="text-muted-foreground">+</span>
          <div className="rounded-lg bg-warning/10 border border-warning/30 px-4 py-2">
            <p className="text-xs font-bold text-warning">Quality Metrics</p>
            <p className="text-[10px] text-warning/70">Success Rate, Accuracy, Recovery</p>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="rounded-lg bg-purple-500/10 border border-purple-500/30 px-4 py-2">
            <p className="text-xs font-bold text-purple-500">Growth Metrics</p>
            <p className="text-[10px] text-purple-500/70">WAU, Retention, Virality</p>
          </div>
        </div>
      </div>

      {/* Metric Categories */}
      {metricCategories.map((category) => (
        <section key={category.title} className="space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${category.color}15` }}>
              <category.icon className="h-4 w-4" style={{ color: category.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {category.metrics.map((metric) => (
              <div key={metric.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-foreground">{metric.name}</h3>
                  <span className="shrink-0 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                    Target: {metric.target}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">DEFINITION</p>
                    <p className="text-xs text-foreground">{metric.definition}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">HOW TO MEASURE</p>
                    <p className="text-xs text-foreground font-mono bg-background rounded p-2 border border-border">{metric.howToMeasure}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">RATIONALE</p>
                    <p className="text-xs text-muted-foreground">{metric.rationale}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-muted-foreground">CURRENT</p>
                    <p className="text-sm font-bold text-foreground">{metric.current}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
