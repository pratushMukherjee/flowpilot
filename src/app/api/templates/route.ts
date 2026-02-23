import { templates } from "@/lib/templates/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category && category !== "all") {
    return Response.json(templates.filter((t) => t.category === category));
  }
  return Response.json(templates);
}
