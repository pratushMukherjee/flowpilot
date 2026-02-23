import { getTemplate } from "@/lib/templates/data";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(template);
}
