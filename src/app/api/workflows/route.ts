import { getWorkflows, createWorkflow } from "@/lib/store";

export async function GET() {
  return Response.json(getWorkflows());
}

export async function POST(request: Request) {
  const data = await request.json();
  const workflow = createWorkflow(data);
  return Response.json(workflow, { status: 201 });
}
