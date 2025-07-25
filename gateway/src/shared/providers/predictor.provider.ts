import { Provider } from "@nestjs/common";
import { PORT, HOST, TIMEOUT } from "./tokens";

export const PredictorProvider: Provider[] = [
    {
        provide: HOST,
        useValue: process.env.PREDICTION_SERVICE_URL || 'python_service'
    }, {
        provide: PORT,
        useValue: 9000
    }, {
        provide: TIMEOUT,
        useValue: 5000
    }
];