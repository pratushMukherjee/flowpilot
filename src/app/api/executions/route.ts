import { getExecutions } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") || undefined;
  return Response.json(getExecutions(workflowId));
}
