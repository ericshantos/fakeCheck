export interface Predictor {
    predict(text: string): Promise<string>;
}