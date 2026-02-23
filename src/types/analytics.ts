export interface AnalyticsData {
  totalWorkflows: number;
  totalExecutions: number;
  successRate: number;
  timeSavedHours: number;
  activeIntegrations: number;
  executionTrend: { date: string; successful: number; failed: number }[];
  integrationUsage: { name: string; count: number; color: string }[];
  templatePopularity: { name: string; value: number; color: string }[];
  recentExecutions: {
    id: string;
    workflowName: string;
    status: string;
    duration: number;
    startedAt: string;
  }[];
}
