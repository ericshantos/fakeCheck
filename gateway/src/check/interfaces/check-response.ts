export interface CheckResponse {
    veracity: string;
    confidence: number;
    threshold: number;
    extracted_at: string;
}