"use client";

import { useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates/data";
import { cn } from "@/lib/utils";
import {
  Video,
  BarChart3,
  Users,
  ClipboardList,
  Calendar,
  MessageSquare,
  Mail,
  FileText,
  Search,
  Star,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";

const categoryIcons: Record<string, typeof Video> = {
  meetings: Video,
  reports: BarChart3,
  onboarding: Users,
  planning: ClipboardList,
};

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

const categories = ["all", "meetings", "reports", "onboarding", "planning"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Pre-built workflow templates to get started quickly
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((template) => {
          const CatIcon = categoryIcons[template.category] || Zap;
          return (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CatIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  {template.popularity}
                </div>
              </div>

              <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {template.description}
              </p>

              <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {template.steps.length} steps
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Saves {template.estimatedTimeSaved}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {template.integrations.map((intId) => {
                    const Icon = integrationIcons[intId] || Zap;
                    return (
                      <div
                        key={intId}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${integrationColors[intId] || "#666"}20` }}
                        title={intId}
                      >
                        <Icon className="h-3 w-3" style={{ color: integrationColors[intId] || "#666" }} />
                      </div>
                    );
                  })}
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Use template <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
