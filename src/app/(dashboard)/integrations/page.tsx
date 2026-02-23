"use client";

import { integrations } from "@/lib/integrations/registry";
import {
  Calendar,
  MessageSquare,
  Mail,
  Video,
  FileText,
  ClipboardList,
  CheckCircle2,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof Calendar> = {
  Calendar: Calendar,
  MessageSquare: MessageSquare,
  Mail: Mail,
  Video: Video,
  FileText: FileText,
  ClipboardList: ClipboardList,
};

export default function IntegrationsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
        <p className="text-sm text-muted-foreground">
          Connected services and available actions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = iconMap[integration.icon] || Zap;
          const isExpanded = expanded === integration.id;

          return (
            <div
              key={integration.id}
              className="rounded-xl border border-border bg-card overflow-hidden transition-all"
            >
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${integration.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: integration.color }} />
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    <span className="text-xs font-medium text-success">Connected</span>
                  </div>
                </div>

                <h3 className="mb-1 text-base font-semibold text-foreground">
                  {integration.name}
                </h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  {integration.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{integration.actions.length} actions</span>
                  <span>{integration.triggers.length} triggers</span>
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : integration.id)}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  {isExpanded ? "Hide" : "View"} Actions
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-border bg-background p-4 space-y-3">
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Actions
                    </h4>
                    {integration.actions.map((action) => (
                      <div key={action.id} className="mb-2 rounded-lg border border-border bg-card p-2.5">
                        <p className="text-xs font-medium text-foreground">{action.name}</p>
                        <p className="text-[10px] text-muted-foreground">{action.description}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                      Triggers
                    </h4>
                    {integration.triggers.map((trigger) => (
                      <div key={trigger.id} className="mb-2 rounded-lg border border-border bg-card p-2.5">
                        <p className="text-xs font-medium text-foreground">{trigger.name}</p>
                        <p className="text-[10px] text-muted-foreground">{trigger.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
