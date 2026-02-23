import { generateId, delay } from "@/lib/utils";

export async function mockExecuteTool(
  toolName: string,
  input: Record<string, unknown>
): Promise<unknown> {
  // Simulate network latency
  await delay(300 + Math.random() * 500);

  switch (toolName) {
    case "google_calendar_create_event":
      return {
        eventId: `evt_${generateId()}`,
        htmlLink: `https://calendar.google.com/event/${generateId()}`,
        status: "confirmed",
        created: new Date().toISOString(),
        summary: input.title,
        start: { dateTime: input.startTime },
        end: { dateTime: input.endTime },
        attendees: input.attendees || [],
      };

    case "google_calendar_list_events":
      return {
        events: [
          { id: `evt_${generateId()}`, summary: "Team Standup", start: { dateTime: new Date().toISOString() } },
          { id: `evt_${generateId()}`, summary: "Sprint Review", start: { dateTime: new Date().toISOString() } },
        ],
      };

    case "slack_send_message":
      return {
        ok: true,
        ts: `${Date.now()}.000100`,
        channel: input.channel,
        message: { text: input.message },
      };

    case "slack_create_channel":
      return {
        ok: true,
        channel: {
          id: `C${generateId().toUpperCase().slice(0, 9)}`,
          name: input.name,
          created: Math.floor(Date.now() / 1000),
        },
      };

    case "gmail_send_email":
      return {
        id: `msg_${generateId()}`,
        threadId: `thread_${generateId()}`,
        labelIds: ["SENT"],
        status: "sent",
        to: input.to,
        subject: input.subject,
      };

    case "zoom_create_meeting":
      return {
        id: Math.floor(Math.random() * 9000000000) + 1000000000,
        join_url: `https://zoom.us/j/${Math.floor(Math.random() * 9000000000)}`,
        topic: input.topic,
        start_time: input.startTime,
        duration: input.duration,
        status: "waiting",
        password: Math.random().toString(36).slice(2, 8),
      };

    case "zoom_get_recording":
      return {
        meetingId: input.meetingId,
        recording_files: [
          { file_type: "MP4", download_url: "https://zoom.us/recording/download/mock", file_size: 52428800 },
          { file_type: "TRANSCRIPT", download_url: "https://zoom.us/recording/transcript/mock" },
        ],
        transcript: "Meeting transcript content would appear here...",
      };

    case "notion_create_page":
      return {
        id: `page_${generateId()}`,
        url: `https://notion.so/${generateId()}`,
        created_time: new Date().toISOString(),
        title: input.title,
        parent: input.parentId || "workspace",
      };

    case "notion_update_page":
      return {
        id: input.pageId,
        url: `https://notion.so/${input.pageId}`,
        last_edited_time: new Date().toISOString(),
        status: "updated",
      };

    case "notion_query_database":
      return {
        results: [
          { id: `page_${generateId()}`, properties: { Name: { title: [{ text: { content: "Sample Item 1" } }] } } },
          { id: `page_${generateId()}`, properties: { Name: { title: [{ text: { content: "Sample Item 2" } }] } } },
        ],
      };

    case "jira_create_issue":
      return {
        id: `${Math.floor(Math.random() * 90000) + 10000}`,
        key: `${input.project || "PROJ"}-${Math.floor(Math.random() * 900) + 100}`,
        self: `https://jira.example.com/rest/api/2/issue/${generateId()}`,
        summary: input.summary,
        status: { name: "To Do" },
        priority: { name: input.priority || "Medium" },
      };

    case "jira_list_issues":
      return {
        issues: [
          { key: "PROJ-101", summary: "Implement user auth", status: { name: "Done" }, priority: { name: "High" } },
          { key: "PROJ-102", summary: "Fix login bug", status: { name: "Done" }, priority: { name: "Critical" } },
          { key: "PROJ-103", summary: "Update API docs", status: { name: "In Progress" }, priority: { name: "Medium" } },
        ],
        total: 3,
      };

    case "evaluate_condition":
      return {
        result: Math.random() > 0.3,
        condition: input.condition,
        evaluatedAt: new Date().toISOString(),
      };

    case "wait_delay":
      return {
        waited: true,
        duration: input.duration,
        unit: "minutes",
        resumedAt: new Date().toISOString(),
      };

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
