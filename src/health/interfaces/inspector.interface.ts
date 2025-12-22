import { InspectorResponse } from "./response-inspector.interface";

export interface Inspector {
  run(): Promise<InspectorResponse>;
}
