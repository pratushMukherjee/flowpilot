"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Workflow,
  LayoutTemplate,
  Plug,
  History,
  FileText,
  BarChart3,
  Users,
  ClipboardList,
  Target,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { useState } from "react";

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Workflows", href: "/workflows", icon: Workflow },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "History", href: "/history", icon: History },
];

const caseStudyNav = [
  { name: "Overview", href: "/case-study", icon: FileText },
  { name: "Competitive Analysis", href: "/case-study/competitive-analysis", icon: BarChart3 },
  { name: "User Personas", href: "/case-study/user-personas", icon: Users },
  { name: "PRD", href: "/case-study/prd", icon: ClipboardList },
  { name: "Metrics Framework", href: "/case-study/metrics-framework", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">FlowPilot</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
            collapsed && "mx-auto mt-2"
          )}
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        <div className={cn("mb-1 text-xs font-semibold uppercase text-muted-foreground", collapsed && "text-center")}>
          {collapsed ? "—" : "Main"}
        </div>
        {mainNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        <div className="my-3 border-t border-border" />

        <div className={cn("mb-1 text-xs font-semibold uppercase text-muted-foreground", collapsed && "text-center")}>
          {collapsed ? "—" : "Case Study"}
        </div>
        {caseStudyNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
