import Anthropic from "@anthropic-ai/sdk";

export const workflowParserTools: Anthropic.Tool[] = [
  {
    name: "create_workflow_step",
    description:
      "Create a single step in a workflow. Call this for each step needed.",
    input_schema: {
      type: "object" as const,
      properties: {
        label: {
          type: "string",
          description: "Human-readable step name (e.g., 'Send meeting agenda')",
        },
        type: {
          type: "string",
          enum: ["trigger", "action", "condition", "delay"],
          description: "Step type",
        },
        integration: {
          type: "string",
          enum: [
            "google-calendar",
            "slack",
            "gmail",
            "zoom",
            "notion",
            "jira",
          ],
          description: "Which integration this step uses",
        },
        action: {
          type: "string",
          description:
            "The specific action ID (e.g., create_event, send_message)",
        },
        description: {
          type: "string",
          description: "Brief description of what this step does",
        },
        config: {
          type: "object",
          description:
            "Action-specific configuration with parameter values",
        },
        dependsOn: {
          type: "array",
          items: { type: "string" },
          description: "Labels of steps this depends on",
        },
        conditionExpression: {
          type: "string",
          description:
            "For condition type steps, the expression to evaluate",
        },
        delayMinutes: {
          type: "number",
          description: "For delay type steps, how many minutes to wait",
        },
      },
      required: ["label", "type", "integration", "action", "description"],
    },
  },
];

export const executionTools: Anthropic.Tool[] = [
  {
    name: "google_calendar_create_event",
    description: "Create a new Google Calendar event",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string", description: "Event title" },
        startTime: { type: "string", description: "ISO 8601 start time" },
        endTime: { type: "string", description: "ISO 8601 end time" },
        recurrence: {
          type: "string",
          enum: ["none", "daily", "weekly", "monthly"],
        },
        attendees: {
          type: "array",
          items: { type: "string" },
          description: "Attendee emails",
        },
        description: { type: "string" },
      },
      required: ["title", "startTime", "endTime"],
    },
  },
  {
    name: "google_calendar_list_events",
    description: "List upcoming calendar events",
    input_schema: {
      type: "object" as const,
      properties: {
        maxResults: { type: "number" },
        timeMin: { type: "string" },
      },
      required: [],
    },
  },
  {
    name: "slack_send_message",
    description: "Send a message to a Slack channel",
    input_schema: {
      type: "object" as const,
      properties: {
        channel: { type: "string", description: "Channel name" },
        message: { type: "string", description: "Message text" },
        thread_ts: { type: "string" },
      },
      required: ["channel", "message"],
    },
  },
  {
    name: "slack_create_channel",
    description: "Create a new Slack channel",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        isPrivate: { type: "boolean" },
        topic: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "gmail_send_email",
    description: "Send an email via Gmail",
    input_schema: {
      type: "object" as const,
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        cc: { type: "string" },
      },
      required: ["to", "subject", "body"],
    },
  },
  {
    name: "zoom_create_meeting",
    description: "Create a Zoom meeting",
    input_schema: {
      type: "object" as const,
      properties: {
        topic: { type: "string" },
        startTime: { type: "string" },
        duration: { type: "number", description: "Duration in minutes" },
        agenda: { type: "string" },
      },
      required: ["topic", "startTime", "duration"],
    },
  },
  {
    name: "zoom_get_recording",
    description: "Get a Zoom meeting recording and transcript",
    input_schema: {
      type: "object" as const,
      properties: {
        meetingId: { type: "string" },
      },
      required: ["meetingId"],
    },
  },
  {
    name: "notion_create_page",
    description: "Create a page in Notion",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string" },
        content: { type: "string" },
        parentId: { type: "string" },
      },
      required: ["title", "content"],
    },
  },
  {
    name: "notion_update_page",
    description: "Update an existing Notion page",
    input_schema: {
      type: "object" as const,
      properties: {
        pageId: { type: "string" },
        content: { type: "string" },
      },
      required: ["pageId", "content"],
    },
  },
  {
    name: "jira_create_issue",
    description: "Create a Jira issue",
    input_schema: {
      type: "object" as const,
      properties: {
        project: { type: "string" },
        summary: { type: "string" },
        description: { type: "string" },
        type: { type: "string", enum: ["Task", "Bug", "Story", "Epic"] },
        priority: {
          type: "string",
          enum: ["Low", "Medium", "High", "Critical"],
        },
        assignee: { type: "string" },
      },
      required: ["project", "summary", "type"],
    },
  },
  {
    name: "jira_list_issues",
    description: "List Jira issues with JQL",
    input_schema: {
      type: "object" as const,
      properties: {
        jql: { type: "string" },
        maxResults: { type: "number" },
      },
      required: ["jql"],
    },
  },
  {
    name: "evaluate_condition",
    description: "Evaluate a conditional expression for workflow branching",
    input_schema: {
      type: "object" as const,
      properties: {
        condition: { type: "string", description: "The condition to evaluate" },
        context: {
          type: "object",
          description: "Variables available for evaluation",
        },
      },
      required: ["condition"],
    },
  },
  {
    name: "wait_delay",
    description: "Wait for a specified duration",
    input_schema: {
      type: "object" as const,
      properties: {
        duration: { type: "number", description: "Duration in minutes" },
        reason: { type: "string" },
      },
      required: ["duration"],
    },
  },
];
