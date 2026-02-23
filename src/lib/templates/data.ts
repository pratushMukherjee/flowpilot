import { Template } from "@/types/template";

export const templates: Template[] = [
  {
    id: "tmpl_1",
    slug: "meeting-followup",
    name: "Meeting Follow-up",
    description: "Automate post-meeting tasks: notes, summaries, and action items.",
    longDescription: "After each meeting ends, this workflow automatically retrieves the recording and transcript, generates structured meeting notes in Notion, sends a summary to your team's Slack channel, creates Jira tickets for each action item, and sends a follow-up email to all attendees. Never miss an action item again.",
    category: "meetings",
    icon: "Video",
    popularity: 847,
    estimatedTimeSaved: "45 min/meeting",
    tags: ["meetings", "notes", "automation", "follow-up"],
    integrations: ["zoom", "notion", "slack", "jira", "gmail"],
    steps: [
      { id: "mf1", order: 0, type: "trigger", label: "Meeting Ends", description: "Triggered when a Zoom meeting ends and recording is available", integrationId: "zoom", actionId: "get_recording", config: {}, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "mf2", order: 1, type: "action", label: "Create Meeting Notes", description: "Create a structured Notion page with meeting notes and transcript", integrationId: "notion", actionId: "create_page", config: { title: "Meeting Notes", content: "Auto-generated notes" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "mf3", order: 2, type: "action", label: "Send Slack Summary", description: "Post meeting summary to team channel", integrationId: "slack", actionId: "send_message", config: { channel: "#team-updates" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "mf4", order: 3, type: "condition", label: "Has Action Items?", description: "Check if the meeting had action items", integrationId: "zoom", actionId: "get_recording", config: {}, conditions: { if: { field: "actionItems.length", operator: ">", value: 0 }, thenStepId: "mf5" }, retryPolicy: { maxRetries: 0, delayMs: 0 } },
      { id: "mf5", order: 4, type: "action", label: "Create Jira Tickets", description: "Create Jira tickets for each action item", integrationId: "jira", actionId: "create_issue", config: { project: "TEAM", type: "Task" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "mf6", order: 5, type: "action", label: "Send Follow-up Email", description: "Send follow-up email with notes to all attendees", integrationId: "gmail", actionId: "send_email", config: { subject: "Meeting Follow-up" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
    ],
  },
  {
    id: "tmpl_2",
    slug: "weekly-report",
    name: "Weekly Report Generation",
    description: "Auto-generate weekly status reports from your team's activity.",
    longDescription: "Every Friday at 4 PM, this workflow pulls completed Jira tickets for the week, gathers highlights from your Slack channels, generates a comprehensive weekly report using AI, creates it in Notion, and emails it to stakeholders. Stay on top of team progress without manual report writing.",
    category: "reports",
    icon: "BarChart3",
    popularity: 623,
    estimatedTimeSaved: "2 hours/week",
    tags: ["reports", "weekly", "status", "analytics"],
    integrations: ["jira", "slack", "notion", "gmail"],
    steps: [
      { id: "wr1", order: 0, type: "trigger", label: "Weekly Schedule", description: "Triggered every Friday at 4 PM", integrationId: "jira", actionId: "list_issues", config: { jql: "status changed to Done DURING (startOfWeek(), now())" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "wr2", order: 1, type: "action", label: "Gather Slack Highlights", description: "Collect important messages from team channels", integrationId: "slack", actionId: "send_message", config: { channel: "#team" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "wr3", order: 2, type: "action", label: "Generate Report", description: "AI generates a weekly summary report", integrationId: "notion", actionId: "create_page", config: { title: "Weekly Report" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "wr4", order: 3, type: "action", label: "Email to Stakeholders", description: "Send the report to leadership and stakeholders", integrationId: "gmail", actionId: "send_email", config: { subject: "Weekly Status Report" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
    ],
  },
  {
    id: "tmpl_3",
    slug: "customer-onboarding",
    name: "Customer Onboarding",
    description: "Streamline new customer onboarding with automated setup tasks.",
    longDescription: "When a new customer is added, this workflow creates a dedicated Slack channel, schedules a kickoff meeting with a Zoom link, sets up an onboarding project in Notion, creates a Jira epic with all onboarding tasks, and sends a welcome email. Deliver a consistent, professional onboarding experience every time.",
    category: "onboarding",
    icon: "Users",
    popularity: 512,
    estimatedTimeSaved: "3 hours/customer",
    tags: ["onboarding", "customers", "setup", "welcome"],
    integrations: ["slack", "google-calendar", "zoom", "notion", "jira", "gmail"],
    steps: [
      { id: "co1", order: 0, type: "trigger", label: "New Customer Added", description: "Triggered when a new customer is registered", integrationId: "slack", actionId: "create_channel", config: { name: "customer-{{name}}" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "co2", order: 1, type: "action", label: "Schedule Kickoff", description: "Create kickoff meeting on Google Calendar", integrationId: "google-calendar", actionId: "create_event", config: { title: "Kickoff: {{customer}}", duration: 45 }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "co3", order: 2, type: "action", label: "Create Zoom Link", description: "Generate Zoom meeting for the kickoff", integrationId: "zoom", actionId: "create_meeting", config: { topic: "Customer Kickoff", duration: 45 }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "co4", order: 3, type: "action", label: "Setup Notion Project", description: "Create onboarding documentation in Notion", integrationId: "notion", actionId: "create_page", config: { title: "Onboarding: {{customer}}" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "co5", order: 4, type: "action", label: "Create Jira Epic", description: "Create epic with onboarding tasks in Jira", integrationId: "jira", actionId: "create_issue", config: { project: "CS", type: "Epic", summary: "Onboard: {{customer}}" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "co6", order: 5, type: "action", label: "Send Welcome Email", description: "Send welcome email with meeting link and resources", integrationId: "gmail", actionId: "send_email", config: { subject: "Welcome to FlowPilot!" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
    ],
  },
  {
    id: "tmpl_4",
    slug: "sprint-planning",
    name: "Sprint Planning Assistant",
    description: "Automate sprint planning with backlog analysis and team coordination.",
    longDescription: "At the start of each sprint, this workflow pulls your Jira backlog prioritized by importance, schedules a planning meeting with a Zoom link, creates a sprint document in Notion, and sends the agenda to your engineering Slack channel. For remote teams, it automatically adds a Zoom meeting link. Streamline your agile workflow.",
    category: "planning",
    icon: "ClipboardList",
    popularity: 438,
    estimatedTimeSaved: "1.5 hours/sprint",
    tags: ["sprint", "planning", "agile", "backlog"],
    integrations: ["jira", "google-calendar", "zoom", "slack", "notion"],
    steps: [
      { id: "sp1", order: 0, type: "trigger", label: "Sprint Start", description: "Triggered at the beginning of each sprint", integrationId: "jira", actionId: "list_issues", config: { jql: "project = TEAM AND status = 'To Do' ORDER BY priority DESC" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "sp2", order: 1, type: "action", label: "Create Sprint Doc", description: "Create a Notion page for sprint documentation", integrationId: "notion", actionId: "create_page", config: { title: "Sprint {{number}} Plan" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "sp3", order: 2, type: "action", label: "Schedule Meeting", description: "Create planning meeting on calendar", integrationId: "google-calendar", actionId: "create_event", config: { title: "Sprint Planning", duration: 60 }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "sp4", order: 3, type: "condition", label: "Remote Team?", description: "Check if team is remote to add Zoom link", integrationId: "zoom", actionId: "create_meeting", config: {}, conditions: { if: { field: "team.isRemote", operator: "==", value: true }, thenStepId: "sp5" }, retryPolicy: { maxRetries: 0, delayMs: 0 } },
      { id: "sp5", order: 4, type: "action", label: "Create Zoom Meeting", description: "Generate Zoom link for remote planning session", integrationId: "zoom", actionId: "create_meeting", config: { topic: "Sprint Planning", duration: 60 }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
      { id: "sp6", order: 5, type: "action", label: "Send Agenda", description: "Post sprint planning agenda to Slack", integrationId: "slack", actionId: "send_message", config: { channel: "#engineering" }, retryPolicy: { maxRetries: 2, delayMs: 1000 } },
    ],
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(category?: string) {
  if (!category || category === "all") return templates;
  return templates.filter((t) => t.category === category);
}
