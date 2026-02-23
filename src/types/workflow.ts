export interface WorkflowStep {
  id: string;
  order: number;
  type: "trigger" | "action" | "condition" | "delay";
  label: string;
  description: string;
  integrationId: string;
  actionId: string;
  config: Record<string, unknown>;
  conditions?: {
    if: { field: string; operator: string; value: unknown };
    thenStepId: string;
    elseStepId?: string;
  };
  onSuccess?: string;
  onFailure?: string;
  retryPolicy: { maxRetries: number; delayMs: number };
  position?: { x: number; y: number };
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  naturalLanguageInput: string;
  status: "draft" | "active" | "paused" | "archived";
  steps: WorkflowStep[];
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StepResult {
  stepId: string;
  stepLabel: string;
  integrationId: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  output?: unknown;
  error?: string;
  retryCount: number;
}

export interface Execution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: "running" | "completed" | "failed" | "cancelled";
  startedAt: string;
  completedAt?: string;
  stepResults: StepResult[];
  error?: string;
  duration?: number;
}

export interface StepUpdate {
  type: "step_started" | "step_completed" | "step_failed" | "execution_completed";
  stepId?: string;
  toolName?: string;
  input?: unknown;
  output?: unknown;
  error?: string;
}
