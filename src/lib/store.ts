import { Workflow, Execution } from "@/types/workflow";
import { generateId } from "./utils";

// In-memory store for demo purposes
// In production, this would be backed by a database

const workflows: Map<string, Workflow> = new Map();
const executions: Map<string, Execution> = new Map();

export function getWorkflows(): Workflow[] {
  return Array.from(workflows.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getWorkflow(id: string): Workflow | undefined {
  return workflows.get(id);
}

export function createWorkflow(data: Omit<Workflow, "id" | "createdAt" | "updatedAt">): Workflow {
  const workflow: Workflow = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  workflows.set(workflow.id, workflow);
  return workflow;
}

export function updateWorkflow(id: string, data: Partial<Workflow>): Workflow | null {
  const existing = workflows.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
  workflows.set(id, updated);
  return updated;
}

export function deleteWorkflow(id: string): boolean {
  return workflows.delete(id);
}

export function getExecutions(workflowId?: string): Execution[] {
  const all = Array.from(executions.values());
  const filtered = workflowId ? all.filter((e) => e.workflowId === workflowId) : all;
  return filtered.sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
}

export function getExecution(id: string): Execution | undefined {
  return executions.get(id);
}

export function createExecution(data: Omit<Execution, "id">): Execution {
  const execution: Execution = { ...data, id: generateId() };
  executions.set(execution.id, execution);
  return execution;
}

export function updateExecution(id: string, data: Partial<Execution>): Execution | null {
  const existing = executions.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data };
  executions.set(id, updated);
  return updated;
}

// Seed with demo data
function seedDemoData() {
  const demoWorkflow = createWorkflow({
    name: "Meeting Follow-up Automation",
    description: "Automatically create meeting notes, send summaries, and track action items after every Zoom meeting.",
    naturalLanguageInput: "After each Zoom meeting, get the transcript, create notes in Notion, send a summary to Slack, and create Jira tickets for action items",
    status: "active",
    steps: [
      {
        id: "s1",
        order: 0,
        type: "trigger",
        label: "Meeting Ends",
        description: "Triggered when a Zoom meeting ends",
        integrationId: "zoom",
        actionId: "get_recording",
        config: {},
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "s2",
        order: 1,
        type: "action",
        label: "Create Meeting Notes",
        description: "Create a Notion page with meeting notes and transcript",
        integrationId: "notion",
        actionId: "create_page",
        config: { title: "Meeting Notes - {{meeting.topic}}", content: "{{meeting.transcript}}" },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "s3",
        order: 2,
        type: "action",
        label: "Send Slack Summary",
        description: "Post meeting summary to the team Slack channel",
        integrationId: "slack",
        actionId: "send_message",
        config: { channel: "#team-updates", message: "Meeting summary: {{notes.summary}}" },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "s4",
        order: 3,
        type: "condition",
        label: "Has Action Items?",
        description: "Check if the meeting had any action items",
        integrationId: "zoom",
        actionId: "get_recording",
        config: {},
        conditions: { if: { field: "actionItems.length", operator: ">", value: 0 }, thenStepId: "s5" },
        retryPolicy: { maxRetries: 0, delayMs: 0 },
      },
      {
        id: "s5",
        order: 4,
        type: "action",
        label: "Create Jira Tickets",
        description: "Create Jira tickets for each action item",
        integrationId: "jira",
        actionId: "create_issue",
        config: { project: "TEAM", type: "Task", priority: "Medium" },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "s6",
        order: 5,
        type: "action",
        label: "Send Follow-up Email",
        description: "Send follow-up email with notes and action items to all attendees",
        integrationId: "gmail",
        actionId: "send_email",
        config: { subject: "Meeting Follow-up: {{meeting.topic}}", body: "{{notes.content}}" },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
    ],
  });

  createExecution({
    workflowId: demoWorkflow.id,
    workflowName: demoWorkflow.name,
    status: "completed",
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3595000).toISOString(),
    duration: 5000,
    stepResults: demoWorkflow.steps.map((s) => ({
      stepId: s.id,
      stepLabel: s.label,
      integrationId: s.integrationId,
      status: "completed" as const,
      startedAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 3599000).toISOString(),
      output: { success: true },
      retryCount: 0,
    })),
  });

  createExecution({
    workflowId: demoWorkflow.id,
    workflowName: demoWorkflow.name,
    status: "completed",
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86395000).toISOString(),
    duration: 4800,
    stepResults: demoWorkflow.steps.map((s) => ({
      stepId: s.id,
      stepLabel: s.label,
      integrationId: s.integrationId,
      status: "completed" as const,
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      completedAt: new Date(Date.now() - 86399000).toISOString(),
      output: { success: true },
      retryCount: 0,
    })),
  });

  // Second demo workflow
  createWorkflow({
    name: "Sprint Planning Assistant",
    description: "Automate sprint planning by pulling backlog items, scheduling meetings, and sending agendas.",
    naturalLanguageInput: "Pull Jira backlog items, schedule a sprint planning meeting on Google Calendar with Zoom link, and send the agenda to Slack",
    status: "active",
    steps: [
      {
        id: "sp1",
        order: 0,
        type: "trigger",
        label: "Sprint Start",
        description: "Triggered at the start of each sprint",
        integrationId: "jira",
        actionId: "list_issues",
        config: { jql: "project = TEAM AND status = 'To Do' ORDER BY priority DESC" },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "sp2",
        order: 1,
        type: "action",
        label: "Schedule Planning Meeting",
        description: "Create a calendar event for sprint planning",
        integrationId: "google-calendar",
        actionId: "create_event",
        config: { title: "Sprint Planning", duration: 60 },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "sp3",
        order: 2,
        type: "action",
        label: "Create Zoom Meeting",
        description: "Generate a Zoom meeting link for the planning session",
        integrationId: "zoom",
        actionId: "create_meeting",
        config: { topic: "Sprint Planning", duration: 60 },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
      {
        id: "sp4",
        order: 3,
        type: "action",
        label: "Send Agenda to Slack",
        description: "Post the sprint planning agenda with backlog items to Slack",
        integrationId: "slack",
        actionId: "send_message",
        config: { channel: "#engineering", message: "Sprint Planning Agenda: ..." },
        retryPolicy: { maxRetries: 2, delayMs: 1000 },
      },
    ],
  });
}

seedDemoData();
