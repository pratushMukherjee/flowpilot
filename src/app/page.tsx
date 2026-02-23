"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Brain, Plug, BarChart3, ArrowRight, Workflow } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Natural Language Builder",
    description: "Describe your workflow goal in plain English. Our AI agent breaks it into executable steps automatically.",
  },
  {
    icon: Workflow,
    title: "Agentic Execution",
    description: "AI reasons through multi-step workflows with branching logic, retries, and error recovery.",
  },
  {
    icon: Plug,
    title: "Smart Integrations",
    description: "Connect Google Calendar, Slack, Gmail, Zoom, Notion, and Jira with zero configuration.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track workflow performance, execution success rates, and time saved across your organization.",
  },
];

const integrations = [
  { name: "Zoom", color: "#0B5CFF" },
  { name: "Slack", color: "#4A154B" },
  { name: "Gmail", color: "#EA4335" },
  { name: "Calendar", color: "#4285F4" },
  { name: "Notion", color: "#000000" },
  { name: "Jira", color: "#0052CC" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">FlowPilot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/case-study" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Case Study
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Zap className="h-3.5 w-3.5" />
              Powered by Agentic AI
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground lg:text-7xl">
              Build Intelligent
              <br />
              <span className="text-primary">Workflows with AI</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Describe your automation goal in plain English. FlowPilot&apos;s AI agent
              builds, orchestrates, and executes multi-step workflows across your
              favorite tools.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/workflows/new"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create a Workflow
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Browse Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Describe Your Goal", desc: "Type what you want to automate in natural language." },
              { step: "2", title: "AI Builds Your Workflow", desc: "Our agent identifies integrations, creates steps, and adds logic." },
              { step: "3", title: "Execute & Monitor", desc: "Run your workflow with one click and track results in real-time." },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Number(item.step) * 0.15 }}
                className="relative rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-border bg-card/50 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Connects With Your Tools
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {integrations.map((intg) => (
              <div
                key={intg.name}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: intg.color }}
                />
                <span className="text-sm font-medium text-foreground">{intg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          <p>FlowPilot — AI-Powered Workflow Automation | Portfolio Project</p>
          <p className="mt-1">
            <Link href="/case-study" className="text-primary hover:underline">
              View Product Case Study
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
