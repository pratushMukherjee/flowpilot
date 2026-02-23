export interface IntegrationAction {
  id: string;
  name: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
}

export interface IntegrationTrigger {
  id: string;
  name: string;
  description: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: "communication" | "productivity" | "project-management" | "calendar";
  actions: IntegrationAction[];
  triggers: IntegrationTrigger[];
  connected: boolean;
}
