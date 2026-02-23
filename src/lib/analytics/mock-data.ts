import { AnalyticsData } from "@/types/analytics";

export function getAnalyticsData(): AnalyticsData {
  const today = new Date();
  const trend = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    trend.push({
      date: date.toISOString().split("T")[0],
      successful: Math.floor(Math.random() * 15) + 5,
      failed: Math.floor(Math.random() * 3),
    });
  }

  return {
    totalWorkflows: 24,
    totalExecutions: 1847,
    successRate: 94.7,
    timeSavedHours: 312,
    activeIntegrations: 6,
    executionTrend: trend,
    integrationUsage: [
      { name: "Slack", count: 543, color: "#4A154B" },
      { name: "Google Calendar", count: 412, color: "#4285F4" },
      { name: "Zoom", count: 389, color: "#0B5CFF" },
      { name: "Notion", count: 287, color: "#191919" },
      { name: "Gmail", count: 234, color: "#EA4335" },
      { name: "Jira", count: 198, color: "#0052CC" },
    ],
    templatePopularity: [
      { name: "Meeting Follow-up", value: 35, color: "#0B5CFF" },
      { name: "Weekly Report", value: 25, color: "#10b981" },
      { name: "Customer Onboarding", value: 22, color: "#f59e0b" },
      { name: "Sprint Planning", value: 18, color: "#8b5cf6" },
    ],
    recentExecutions: [
      { id: "e1", workflowName: "Meeting Follow-up", status: "completed", duration: 4200, startedAt: new Date(Date.now() - 1800000).toISOString() },
      { id: "e2", workflowName: "Weekly Report", status: "completed", duration: 8500, startedAt: new Date(Date.now() - 3600000).toISOString() },
      { id: "e3", workflowName: "Sprint Planning", status: "completed", duration: 5100, startedAt: new Date(Date.now() - 7200000).toISOString() },
      { id: "e4", workflowName: "Meeting Follow-up", status: "failed", duration: 2300, startedAt: new Date(Date.now() - 10800000).toISOString() },
      { id: "e5", workflowName: "Customer Onboarding", status: "completed", duration: 12400, startedAt: new Date(Date.now() - 14400000).toISOString() },
    ],
  };
}
