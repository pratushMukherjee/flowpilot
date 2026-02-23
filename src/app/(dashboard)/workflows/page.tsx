"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Workflow } from "@/types/workflow";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Workflow as WorkflowIcon,
  Calendar,
  MessageSquare,
  Mail,
  Video,
  FileText,
  ClipboardList,
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

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then(setWorkflows);
  }, []);

  const filtered = workflows.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || w.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
          <p className="text-sm text-muted-foreground">
            Manage your automated workflows
          </p>
        </div>
        <Link
          href="/workflows/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Workflow
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {["all", "active", "draft", "paused"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <WorkflowIcon className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No workflows yet
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Create your first AI-powered workflow
          </p>
          <Link
            href="/workflows/new"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Create Workflow
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workflow) => {
            const integrationIds = [
              ...new Set(workflow.steps.map((s) => s.integrationId)),
            ];
            return (
              <Link
                key={workflow.id}
                href={`/workflows/${workflow.id}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      workflow.status === "active"
                        ? "bg-success/10 text-success"
                        : workflow.status === "draft"
                        ? "bg-muted text-muted-foreground"
                        : "bg-warning/10 text-warning"
                    )}
                  >
                    {workflow.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {workflow.steps.length} steps
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {workflow.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-xs text-muted-foreground">
                  {workflow.description}
                </p>
                <div className="flex items-center gap-1.5">
                  {integrationIds.map((intId) => {
                    const Icon = integrationIcons[intId] || WorkflowIcon;
                    return (
                      <div
                        key={intId}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${integrationColors[intId]}20` }}
                        title={intId}
                      >
                        <Icon
                          className="h-3 w-3"
                          style={{ color: integrationColors[intId] }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
