type StatusType = 'success' | 'error';

export interface InspectorResponse {
    status: StatusType;
    message: string;
}