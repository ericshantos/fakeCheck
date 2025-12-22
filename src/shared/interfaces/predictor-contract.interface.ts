export interface PredictorContract {
    predict: (text: string) => Promise<number>;
}