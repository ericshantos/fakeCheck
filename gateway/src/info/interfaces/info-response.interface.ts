export interface InfoResponse {
    version: string;
    framework: string;
    model_architecture: string;
    license: string;
    model_metadata?: {
        framework?: string;
        model_architecture?: string;
    };
    architecture?: string;
}