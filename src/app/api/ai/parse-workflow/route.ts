import Anthropic from "@anthropic-ai/sdk";
import { WORKFLOW_PARSER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { workflowParserTools } from "@/lib/ai/tool-definitions";
import { generateId } from "@/lib/utils";
import { WorkflowStep } from "@/types/workflow";

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== "string") {
      return Response.json(
        { error: "Input is required" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      system: WORKFLOW_PARSER_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Create a workflow for: "${input}"`,
        },
      ],
      tools: workflowParserTools,
    });

    // Extract tool calls to build workflow steps
    const steps: WorkflowStep[] = [];
    let order = 0;

    for (const block of message.content) {
      if (block.type === "tool_use" && block.name === "create_workflow_step") {
        const inp = block.input as Record<string, unknown>;
        steps.push({
          id: generateId(),
          order: order++,
          type: (inp.type as WorkflowStep["type"]) || "action",
          label: (inp.label as string) || "Untitled Step",
          description: (inp.description as string) || "",
          integrationId: (inp.integration as string) || "",
          actionId: (inp.action as string) || "",
          config: (inp.config as Record<string, unknown>) || {},
          retryPolicy: { maxRetries: 2, delayMs: 1000 },
        });
      }
    }

    // Extract any text summary from Claude
    const textBlocks = message.content.filter((b) => b.type === "text");
    const summary = textBlocks.map((b) => {
      if (b.type === "text") return b.text;
      return "";
    }).join("\n");

    // Identify integrations used
    const usedIntegrations = [...new Set(steps.map((s) => s.integrationId))];

    return Response.json({
      steps,
      integrations: usedIntegrations,
      summary,
      stepCount: steps.length,
    });
  } catch (error) {
    console.error("Workflow parse error:", error);
    return Response.json(
      { error: "Failed to parse workflow. Please try again." },
      { status: 500 }
    );
  }
}
