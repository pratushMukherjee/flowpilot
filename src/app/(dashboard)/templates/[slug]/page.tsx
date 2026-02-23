"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Template } from "@/types/template";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Mail,
  Video,
  FileText,
  ClipboardList,
  Zap,
  Star,
  Clock,
  Play,
  Loader2,
  CheckCircle2,
} from "lucide-react";

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

const typeColors: Record<string, string> = {
  trigger: "#0B5CFF",
  action: "#10b981",
  condition: "#f59e0b",
  delay: "#6b7280",
};

export default function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    fetch(`/api/templates/${slug}`)
      .then((r) => r.json())
      .then(setTemplate);
  }, [slug]);

  async function handleDeploy() {
    if (!template) return;
    setDeploying(true);

    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: template.name,
          description: template.description,
          naturalLanguageInput: template.description,
          status: "active",
          steps: template.steps,
          templateId: template.id,
        }),
      });
      const workflow = await res.json();
      router.push(`/workflows/${workflow.id}`);
    } finally {
      setDeploying(false);
    }
  }

  if (!template) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => router.push("/templates")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Templates
      </button>

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                {template.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-warning text-warning" />
                {template.popularity} uses
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Saves {template.estimatedTimeSaved}
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              {template.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {template.longDescription}
            </p>
          </div>
          <button
            onClick={handleDeploy}
            disabled={deploying}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {deploying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {deploying ? "Deploying..." : "Deploy Workflow"}
          </button>
        </div>

        {/* Integration badges */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Integrations:</span>
          {template.integrations.map((intId) => {
            const Icon = integrationIcons[intId] || Zap;
            return (
              <div
                key={intId}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1"
              >
                <Icon className="h-3 w-3" style={{ color: integrationColors[intId] }} />
                <span className="text-xs capitalize text-foreground">
                  {intId.replace("-", " ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Workflow Steps ({template.steps.length})
        </h2>
        <div className="space-y-3">
          {template.steps.map((step, i) => {
            const Icon = integrationIcons[step.integrationId] || Zap;
            return (
              <div
                key={step.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-background p-4"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: typeColors[step.type] }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      {step.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon className="h-3 w-3" style={{ color: integrationColors[step.integrationId] }} />
                      <span className="text-xs capitalize text-muted-foreground">
                        {step.integrationId.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {step.label}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Tags:</span>
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
