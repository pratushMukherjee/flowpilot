"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WorkflowStep } from "@/types/workflow";
import {
  Sparkles,
  Loader2,
  ArrowRight,
  Calendar,
  MessageSquare,
  Mail,
  Video,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Zap,
  Play,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

const examplePrompts = [
  "After each Zoom meeting, create notes in Notion, send a summary to Slack, and create Jira tickets for action items",
  "Every Friday, generate a weekly report from Jira tickets and email it to stakeholders",
  "When a new customer signs up, create a Slack channel, schedule a kickoff meeting, and send a welcome email",
  "Pull the Jira backlog, schedule a sprint planning meeting with Zoom, and post the agenda to Slack",
];

const integrationIcons: Record<string, typeof Calendar> = {
  "google-calendar": Calendar,
  slack: MessageSquare,
  gmail: Mail,
  zoom: Video,
  notion: FileText,
  jira: ClipboardList,
};

const integrationColors: Record<string, string> = {
  "google-calendar": "#4285F4",
  slack: "#4A154B",
  gmail: "#EA4335",
  zoom: "#0B5CFF",
  notion: "#191919",
  jira: "#0052CC",
};

const stepTypeStyles: Record<string, string> = {
  trigger: "border-l-4 border-l-primary",
  action: "border-l-4 border-l-success",
  condition: "border-l-4 border-l-warning",
  delay: "border-l-4 border-l-muted-foreground",
};

export default function NewWorkflowPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [detectedIntegrations, setDetectedIntegrations] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);
  const [executionResults, setExecutionResults] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setSteps([]);
    setExecutionResults({});

    const stages = [
      "Analyzing your goal...",
      "Identifying integrations...",
      "Structuring workflow steps...",
      "Optimizing execution order...",
    ];

    let stageIdx = 0;
    setLoadingStage(stages[0]);
    const interval = setInterval(() => {
      stageIdx = Math.min(stageIdx + 1, stages.length - 1);
      setLoadingStage(stages[stageIdx]);
    }, 1500);

    try {
      const res = await fetch("/api/ai/parse-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) throw new Error("Failed to generate workflow");

      const data = await res.json();
      setSteps(data.steps);
      setDetectedIntegrations(data.integrations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      clearInterval(interval);
      setLoading(false);
      setLoadingStage("");
    }
  }

  async function handleExecute() {
    if (steps.length === 0) return;
    setExecuting(true);
    setExecutionResults({});

    // Mark steps as running one by one for visual effect
    for (let i = 0; i < steps.length; i++) {
      setExecutionResults((prev) => ({
        ...prev,
        [steps[i].id]: "running",
      }));
      await new Promise((r) => setTimeout(r, 300));
    }

    try {
      const res = await fetch("/api/ai/execute-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps, workflowName: "New Workflow" }),
      });

      const data = await res.json();

      // Map results back to step IDs
      const resultMap: Record<string, string> = {};
      steps.forEach((step, i) => {
        if (data.results && data.results[i]) {
          resultMap[step.id] = data.results[i].status;
        } else {
          resultMap[step.id] = "completed";
        }
      });
      setExecutionResults(resultMap);
    } catch {
      steps.forEach((step) => {
        setExecutionResults((prev) => ({ ...prev, [step.id]: "failed" }));
      });
    } finally {
      setExecuting(false);
    }
  }

  async function handleSave() {
    if (steps.length === 0) return;
    setSaving(true);

    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.slice(0, 60),
          description: input,
          naturalLanguageInput: input,
          status: "draft",
          steps,
        }),
      });

      const workflow = await res.json();
      router.push(`/workflows/${workflow.id}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Create New Workflow
        </h1>
        <p className="text-sm text-muted-foreground">
          Describe your automation goal and let AI build it for you
        </p>
      </div>

      {/* Input Area */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to automate..."
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Generating..." : "Generate Workflow"}
          </button>
        </div>

        {/* Example Prompts */}
        <div className="mt-3">
          <p className="mb-2 text-xs text-muted-foreground">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {prompt.slice(0, 50)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4"
          >
            <div className="relative">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div className="absolute inset-0 h-5 w-5 animate-ping rounded-full bg-primary/20" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{loadingStage}</p>
              <p className="text-xs text-muted-foreground">
                AI is analyzing your goal and building the workflow...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Detected Integrations */}
      <AnimatePresence>
        {detectedIntegrations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-medium text-muted-foreground">
              Detected integrations:
            </span>
            <div className="flex gap-2">
              {detectedIntegrations.map((intId) => {
                const Icon = integrationIcons[intId] || Zap;
                return (
                  <div
                    key={intId}
                    className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1"
                  >
                    <Icon
                      className="h-3 w-3"
                      style={{ color: integrationColors[intId] || "#666" }}
                    />
                    <span className="text-xs font-medium capitalize text-foreground">
                      {intId.replace("-", " ")}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Steps */}
      <AnimatePresence>
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Workflow Steps ({steps.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleExecute}
                  disabled={executing}
                  className="flex items-center gap-2 rounded-lg border border-success bg-success/10 px-4 py-2 text-sm font-medium text-success transition-colors hover:bg-success/20 disabled:opacity-50"
                >
                  {executing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {executing ? "Executing..." : "Execute"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Workflow
                </button>
              </div>
            </div>

            {steps.map((step, i) => {
              const Icon = integrationIcons[step.integrationId] || Zap;
              const result = executionResults[step.id];

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "relative rounded-lg border border-border bg-card p-4 transition-all",
                    stepTypeStyles[step.type],
                    result === "running" && "animate-pulse-glow",
                    result === "completed" && "border-success/50 bg-success/5",
                    result === "failed" && "border-destructive/50 bg-destructive/5"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                        <Icon
                          className="h-4 w-4"
                          style={{ color: integrationColors[step.integrationId] || "#666" }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium uppercase text-muted-foreground">
                            {step.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Step {i + 1}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground">
                          {step.label}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      {result === "completed" && (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                      {result === "failed" && (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                      {result === "running" && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                    </div>
                  </div>

                  {/* Connection line */}
                  {i < steps.length - 1 && (
                    <div className="absolute -bottom-3 left-7 flex h-3 items-center">
                      <ArrowRight className="h-3 w-3 rotate-90 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
