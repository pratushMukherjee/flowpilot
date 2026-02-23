import Anthropic from "@anthropic-ai/sdk";
import { EXECUTION_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { executionTools } from "@/lib/ai/tool-definitions";
import { mockExecuteTool } from "@/lib/integrations/mock-executor";
import { generateId } from "@/lib/utils";
import { StepResult } from "@/types/workflow";

export async function POST(request: Request) {
  try {
    const { steps, workflowName } = await request.json();

    const anthropic = new Anthropic();
    const results: StepResult[] = [];
    const startTime = Date.now();

    const messages: Anthropic.MessageParam[] = [
      {
        role: "user",
        content: `Execute this workflow "${workflowName || "Workflow"}" step by step. Here are the steps:\n${JSON.stringify(steps, null, 2)}\n\nExecute each step in order using the appropriate tools. After completing all steps, provide a brief summary.`,
      },
    ];

    const MAX_ITERATIONS = 20;
    let iteration = 0;
    let done = false;

    while (iteration < MAX_ITERATIONS && !done) {
      iteration++;

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4096,
        system: EXECUTION_SYSTEM_PROMPT,
        messages,
        tools: executionTools,
      });

      const hasToolUse = response.content.some(
        (b) => b.type === "tool_use"
      );

      if (response.stop_reason === "end_turn" && !hasToolUse) {
        done = true;
        break;
      }

      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type === "tool_use") {
          const stepStart = new Date().toISOString();

          try {
            const result = await mockExecuteTool(
              block.name,
              block.input as Record<string, unknown>
            );

            results.push({
              stepId: block.id,
              stepLabel: block.name,
              integrationId: block.name.split("_")[0],
              status: "completed",
              startedAt: stepStart,
              completedAt: new Date().toISOString(),
              output: result,
              retryCount: 0,
            });

            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: JSON.stringify(result),
            });
          } catch (error) {
            const errMsg =
              error instanceof Error ? error.message : "Unknown error";

            results.push({
              stepId: block.id,
              stepLabel: block.name,
              integrationId: block.name.split("_")[0],
              status: "failed",
              startedAt: stepStart,
              completedAt: new Date().toISOString(),
              error: errMsg,
              retryCount: 0,
            });

            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: `Error: ${errMsg}`,
              is_error: true,
            });
          }
        }
      }

      if (toolResults.length > 0) {
        messages.push({ role: "assistant", content: response.content });
        messages.push({ role: "user", content: toolResults });
      } else {
        done = true;
      }
    }

    const duration = Date.now() - startTime;
    const allCompleted = results.every((r) => r.status === "completed");

    return Response.json({
      executionId: generateId(),
      status: allCompleted ? "completed" : "failed",
      results,
      duration,
      stepsExecuted: results.length,
      iterations: iteration,
    });
  } catch (error) {
    console.error("Execution error:", error);
    return Response.json(
      { error: "Workflow execution failed" },
      { status: 500 }
    );
  }
}
