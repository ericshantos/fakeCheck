import { InspectorResponse } from "./response-inspector.interface";

type HealthlyType = 'healthy' | 'unhealthy';

export interface HealthResponse {
  status: HealthlyType;
  checks: InspectorResponse[]
}