import { getAnalyticsData } from "@/lib/analytics/mock-data";

export async function GET() {
  return Response.json(getAnalyticsData());
}
