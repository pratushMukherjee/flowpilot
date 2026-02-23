import { getWorkflow, updateWorkflow, deleteWorkflow } from "@/lib/store";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const workflow = getWorkflow(id);
  if (!workflow) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(workflow);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  const updated = updateWorkflow(id, data);
  if (!updated) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  deleteWorkflow(id);
  return Response.json({ success: true });
}
