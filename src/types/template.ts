import { WorkflowStep } from "./workflow";

export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: "meetings" | "reports" | "onboarding" | "planning";
  icon: string;
  steps: WorkflowStep[];
  integrations: string[];
  popularity: number;
  tags: string[];
  estimatedTimeSaved: string;
}
