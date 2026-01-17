export interface PredictorContract {
    predict(url: string): Promise<number>;
};