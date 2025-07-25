import { Provider } from "@nestjs/common";
import { ExtractorProvider } from "./extractor.provider";
import { ValidationProvider } from "./validation.provider";
import { PredictorProvider } from "./predictor.provider";
import { ServiceProviders } from "./services.provider";
import { JsonReaderProvider } from "./json-reader.provider";
import { RequestLimiterProvider } from "./request-limiter.provider";

export const GlobalProviders: Provider[] = [
    ...ServiceProviders,
    ...ExtractorProvider,
    ...ValidationProvider,
    ...PredictorProvider,
    ...JsonReaderProvider,
    ...RequestLimiterProvider
];