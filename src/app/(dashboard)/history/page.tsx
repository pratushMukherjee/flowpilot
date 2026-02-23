"use client";

import { useEffect, useState } from "react";
import { Execution } from "@/types/workflow";
import { cn, formatDuration, formatDate } from "@/lib/utils";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Loader2,
  History,
} from "lucide-react";

export default function HistoryPage() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/executions")
      .then((r) => r.json())
      .then((data) => {
        setExecutions(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Execution History</h1>
        <p className="text-sm text-muted-foreground">
          Timeline of all workflow executions
        </p>
      </div>

      {executions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <History className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            No executions yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Execute a workflow to see its history here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {executions.map((exec) => {
            const isExpanded = expanded === exec.id;
            return (
              <div
                key={exec.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : exec.id)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        exec.status === "completed" ? "bg-success/10" : "bg-destructive/10"
                      )}
                    >
                      {exec.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {exec.workflowName}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatDate(exec.startedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exec.duration ? formatDuration(exec.duration) : "—"}
                        </span>
                        <span>{exec.stepResults.length} steps</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        exec.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {exec.status}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-background p-4">
                    <h4 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                      Step Results
                    </h4>
                    <div className="space-y-2">
                      {exec.stepResults.map((result, i) => (
                        <div
                          key={result.stepId}
                          className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                              {i + 1}
                            </span>
                            <span className="text-sm text-foreground">
                              {result.stepLabel}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground capitalize">
                              {result.integrationId}
                            </span>
                            {result.status === "completed" ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                            ) : (
                              <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
