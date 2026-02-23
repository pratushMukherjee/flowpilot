import { Integration } from "@/types/integration";

export const integrations: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Schedule events, manage calendars, and automate meeting workflows.",
    icon: "Calendar",
    color: "#4285F4",
    category: "calendar",
    connected: true,
    actions: [
      {
        id: "create_event",
        name: "Create Event",
        description: "Create a new calendar event with attendees and recurrence.",
        parameters: [
          { name: "title", type: "string", required: true, description: "Event title" },
          { name: "startTime", type: "datetime", required: true, description: "Start time (ISO 8601)" },
          { name: "endTime", type: "datetime", required: true, description: "End time (ISO 8601)" },
          { name: "attendees", type: "string[]", required: false, description: "Attendee emails" },
          { name: "recurrence", type: "string", required: false, description: "Recurrence rule (daily, weekly, monthly)" },
          { name: "description", type: "string", required: false, description: "Event description" },
        ],
      },
      {
        id: "update_event",
        name: "Update Event",
        description: "Update an existing calendar event.",
        parameters: [
          { name: "eventId", type: "string", required: true, description: "Event ID" },
          { name: "title", type: "string", required: false, description: "New title" },
          { name: "startTime", type: "datetime", required: false, description: "New start time" },
        ],
      },
      {
        id: "list_events",
        name: "List Events",
        description: "List upcoming calendar events.",
        parameters: [
          { name: "maxResults", type: "number", required: false, description: "Max events to return" },
          { name: "timeMin", type: "datetime", required: false, description: "Start of time range" },
        ],
      },
    ],
    triggers: [
      { id: "event_created", name: "Event Created", description: "Fires when a new event is created." },
      { id: "event_starting", name: "Event Starting", description: "Fires before an event starts." },
    ],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send messages, create channels, and manage team communications.",
    icon: "MessageSquare",
    color: "#4A154B",
    category: "communication",
    connected: true,
    actions: [
      {
        id: "send_message",
        name: "Send Message",
        description: "Send a message to a Slack channel or user.",
        parameters: [
          { name: "channel", type: "string", required: true, description: "Channel name or ID" },
          { name: "message", type: "string", required: true, description: "Message text (supports markdown)" },
          { name: "thread_ts", type: "string", required: false, description: "Thread timestamp for replies" },
        ],
      },
      {
        id: "create_channel",
        name: "Create Channel",
        description: "Create a new Slack channel.",
        parameters: [
          { name: "name", type: "string", required: true, description: "Channel name" },
          { name: "isPrivate", type: "boolean", required: false, description: "Whether channel is private" },
          { name: "topic", type: "string", required: false, description: "Channel topic" },
        ],
      },
    ],
    triggers: [
      { id: "message_received", name: "Message Received", description: "Fires when a message is posted." },
      { id: "reaction_added", name: "Reaction Added", description: "Fires when a reaction is added to a message." },
    ],
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send emails, manage inbox, and automate email workflows.",
    icon: "Mail",
    color: "#EA4335",
    category: "communication",
    connected: true,
    actions: [
      {
        id: "send_email",
        name: "Send Email",
        description: "Send an email via Gmail.",
        parameters: [
          { name: "to", type: "string", required: true, description: "Recipient email" },
          { name: "subject", type: "string", required: true, description: "Email subject" },
          { name: "body", type: "string", required: true, description: "Email body (HTML supported)" },
          { name: "cc", type: "string", required: false, description: "CC recipients" },
        ],
      },
      {
        id: "search_emails",
        name: "Search Emails",
        description: "Search emails by query.",
        parameters: [
          { name: "query", type: "string", required: true, description: "Search query" },
          { name: "maxResults", type: "number", required: false, description: "Max results" },
        ],
      },
    ],
    triggers: [
      { id: "email_received", name: "Email Received", description: "Fires when a new email is received." },
    ],
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Create meetings, manage recordings, and automate video workflows.",
    icon: "Video",
    color: "#0B5CFF",
    category: "communication",
    connected: true,
    actions: [
      {
        id: "create_meeting",
        name: "Create Meeting",
        description: "Create a new Zoom meeting.",
        parameters: [
          { name: "topic", type: "string", required: true, description: "Meeting topic" },
          { name: "startTime", type: "datetime", required: true, description: "Start time" },
          { name: "duration", type: "number", required: true, description: "Duration in minutes" },
          { name: "agenda", type: "string", required: false, description: "Meeting agenda" },
        ],
      },
      {
        id: "get_recording",
        name: "Get Recording",
        description: "Get meeting recording and transcript.",
        parameters: [
          { name: "meetingId", type: "string", required: true, description: "Meeting ID" },
        ],
      },
    ],
    triggers: [
      { id: "meeting_ended", name: "Meeting Ended", description: "Fires when a Zoom meeting ends." },
      { id: "recording_ready", name: "Recording Ready", description: "Fires when a recording is available." },
    ],
  },
  {
    id: "notion",
    name: "Notion",
    description: "Create pages, manage databases, and organize team knowledge.",
    icon: "FileText",
    color: "#000000",
    category: "productivity",
    connected: true,
    actions: [
      {
        id: "create_page",
        name: "Create Page",
        description: "Create a new Notion page.",
        parameters: [
          { name: "title", type: "string", required: true, description: "Page title" },
          { name: "content", type: "string", required: true, description: "Page content (markdown)" },
          { name: "parentId", type: "string", required: false, description: "Parent page or database ID" },
        ],
      },
      {
        id: "update_page",
        name: "Update Page",
        description: "Update an existing Notion page.",
        parameters: [
          { name: "pageId", type: "string", required: true, description: "Page ID" },
          { name: "content", type: "string", required: true, description: "Updated content" },
        ],
      },
      {
        id: "query_database",
        name: "Query Database",
        description: "Query a Notion database.",
        parameters: [
          { name: "databaseId", type: "string", required: true, description: "Database ID" },
          { name: "filter", type: "string", required: false, description: "Filter expression" },
        ],
      },
    ],
    triggers: [
      { id: "page_created", name: "Page Created", description: "Fires when a new page is created." },
    ],
  },
  {
    id: "jira",
    name: "Jira",
    description: "Create issues, manage sprints, and track project progress.",
    icon: "ClipboardList",
    color: "#0052CC",
    category: "project-management",
    connected: true,
    actions: [
      {
        id: "create_issue",
        name: "Create Issue",
        description: "Create a new Jira issue.",
        parameters: [
          { name: "project", type: "string", required: true, description: "Project key" },
          { name: "summary", type: "string", required: true, description: "Issue summary" },
          { name: "description", type: "string", required: false, description: "Issue description" },
          { name: "type", type: "string", required: true, description: "Issue type (Task, Bug, Story, Epic)" },
          { name: "priority", type: "string", required: false, description: "Priority (Low, Medium, High, Critical)" },
          { name: "assignee", type: "string", required: false, description: "Assignee email" },
        ],
      },
      {
        id: "update_issue",
        name: "Update Issue",
        description: "Update a Jira issue status or fields.",
        parameters: [
          { name: "issueKey", type: "string", required: true, description: "Issue key (e.g., PROJ-123)" },
          { name: "status", type: "string", required: false, description: "New status" },
          { name: "assignee", type: "string", required: false, description: "New assignee" },
        ],
      },
      {
        id: "list_issues",
        name: "List Issues",
        description: "List issues with JQL query.",
        parameters: [
          { name: "jql", type: "string", required: true, description: "JQL query string" },
          { name: "maxResults", type: "number", required: false, description: "Max results" },
        ],
      },
    ],
    triggers: [
      { id: "issue_created", name: "Issue Created", description: "Fires when a new issue is created." },
      { id: "issue_updated", name: "Issue Updated", description: "Fires when an issue is updated." },
    ],
  },
];

export function getIntegration(id: string): Integration | undefined {
  return integrations.find((i) => i.id === id);
}

export function getIntegrationActions(id: string) {
  return getIntegration(id)?.actions ?? [];
}
