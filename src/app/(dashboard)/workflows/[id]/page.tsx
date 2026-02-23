"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { Workflow } from "@/types/workflow";
import { cn, formatDuration } from "@/lib/utils";
import {
  Play,
  Loader2,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Mail,
  Video,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Zap,
  Trash2,
} from "lucide-react";

const integrationIcons: Record<string, string> = {
  "google-calendar": "Calendar",
  slack: "Slack",
  gmail: "Gmail",
  zoom: "Zoom",
  notion: "Notion",
  jira: "Jira",
};

const integrationColors: Record<string, string> = {
  "google-calendar": "#4285F4",
  slack: "#4A154B",
  gmail: "#EA4335",
  zoom: "#0B5CFF",
  notion: "#191919",
  jira: "#0052CC",
};

const typeColors: Record<string, string> = {
  trigger: "#0B5CFF",
  action: "#10b981",
  condition: "#f59e0b",
  delay: "#6b7280",
};

function layoutNodes(workflow: Workflow) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", ranksep: 80, nodesep: 50 });

  const nodes: Node[] = workflow.steps.map((step, i) => {
    g.setNode(step.id, { width: 250, height: 80 });
    return {
      id: step.id,
      type: "default",
      position: { x: 0, y: 0 },
      data: {
        label: (
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: typeColors[step.type] }}
              />
              <span className="text-[10px] font-medium uppercase opacity-60">
                {step.type}
              </span>
            </div>
            <div className="text-xs font-semibold">{step.label}</div>
            <div className="text-[10px] opacity-60 capitalize mt-0.5">
              {step.integrationId.replace("-", " ")}
            </div>
          </div>
        ),
      },
      style: {
        background: "var(--card)",
        border: `2px solid ${integrationColors[step.integrationId] || "#666"}`,
        borderRadius: "10px",
        padding: "10px 14px",
        width: 250,
        fontSize: "12px",
        color: "var(--foreground)",
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    };
  });

  const edges: Edge[] = [];
  for (let i = 0; i < workflow.steps.length - 1; i++) {
    const step = workflow.steps[i];
    const nextStep = workflow.steps[i + 1];
    g.setEdge(step.id, nextStep.id);
    edges.push({
      id: `e-${step.id}-${nextStep.id}`,
      source: step.id,
      target: nextStep.id,
      animated: true,
      style: { stroke: "var(--primary)", strokeWidth: 2 },
    });
  }

  dagre.layout(g);

  nodes.forEach((node) => {
    const pos = g.node(node.id);
    node.position = { x: pos.x - 125, y: pos.y - 40 };
  });

  return { nodes, edges };
}

export default function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [executing, setExecuting] = useState(false);
  const [executionStatus, setExecutionStatus] = useState<string | null>(null);
  const [executionResults, setExecutionResults] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/workflows/${id}`)
      .then((r) => r.json())
      .then(setWorkflow);
  }, [id]);

  const handleExecute = useCallback(async () => {
    if (!workflow) return;
    setExecuting(true);
    setExecutionStatus(null);
    setExecutionResults({});

    // Animate steps running
    for (const step of workflow.steps) {
      setExecutionResults((prev) => ({ ...prev, [step.id]: "running" }));
      await new Promise((r) => setTimeout(r, 200));
    }

    try {
      const res = await fetch("/api/ai/execute-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps: workflow.steps, workflowName: workflow.name }),
      });

      const data = await res.json();

      const resultMap: Record<string, string> = {};
      workflow.steps.forEach((step, i) => {
        resultMap[step.id] = data.results?.[i]?.status || "completed";
      });
      setExecutionResults(resultMap);
      setExecutionStatus(data.status);
    } catch {
      workflow.steps.forEach((step) => {
        setExecutionResults((prev) => ({ ...prev, [step.id]: "failed" }));
      });
      setExecutionStatus("failed");
    } finally {
      setExecuting(false);
    }
  }, [workflow]);

  const handleDelete = async () => {
    if (!workflow) return;
    await fetch(`/api/workflows/${id}`, { method: "DELETE" });
    router.push("/workflows");
  };

  if (!workflow) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { nodes, edges } = layoutNodes(workflow);

  // Update node styles based on execution
  const styledNodes = nodes.map((node) => {
    const result = executionResults[node.id];
    let borderColor = (node.style as Record<string, string>)?.borderColor || "#666";

    if (result === "running") borderColor = "#0B5CFF";
    if (result === "completed") borderColor = "#10b981";
    if (result === "failed") borderColor = "#ef4444";

    return {
      ...node,
      style: {
        ...node.style,
        border: `2px solid ${borderColor}`,
        boxShadow: result === "running" ? `0 0 12px ${borderColor}40` : "none",
      },
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/workflows")}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">
                {workflow.name}
              </h1>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                  workflow.status === "active"
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {workflow.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {workflow.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExecute}
            disabled={executing}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {executing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {executing ? "Executing..." : "Execute"}
          </button>
          <button
            onClick={handleDelete}
            className="rounded-lg border border-destructive/30 p-2 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Execution Status */}
      {executionStatus && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg p-3",
            executionStatus === "completed"
              ? "border border-success/30 bg-success/5 text-success"
              : "border border-destructive/30 bg-destructive/5 text-destructive"
          )}
        >
          {executionStatus === "completed" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            Workflow execution {executionStatus}
          </span>
        </div>
      )}

      {/* Visual Canvas */}
      <div className="h-[500px] rounded-xl border border-border bg-card overflow-hidden">
        <ReactFlow
          nodes={styledNodes}
          edges={edges}
          fitView
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="var(--border)" gap={20} />
          <Controls
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <MiniMap
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
            nodeColor={(n) => {
              const result = executionResults[n.id];
              if (result === "completed") return "#10b981";
              if (result === "failed") return "#ef4444";
              if (result === "running") return "#0B5CFF";
              return "var(--muted)";
            }}
          />
        </ReactFlow>
      </div>

      {/* Step Details */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Workflow Steps ({workflow.steps.length})
        </h3>
        <div className="space-y-2">
          {workflow.steps.map((step, i) => {
            const result = executionResults[step.id];
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-border bg-background p-3",
                  result === "completed" && "border-success/50",
                  result === "failed" && "border-destructive/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: typeColors[step.type] }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.integrationId} / {step.actionId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize">
                    {step.type}
                  </span>
                  {result === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                  {result === "failed" && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  {result === "running" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
