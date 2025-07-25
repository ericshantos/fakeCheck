import { Provider } from "@nestjs/common";
import { JsonReader, TextExtractor } from "../services";
import { ObjectValidator } from "../services";
import { PredictionRequester } from "../services";
import { EXTRACTOR, VALIDATION, PREDICTOR, LOGGER, JSON_READER } from "./tokens";
import { Logger } from "@ericshantos/logger";

export const ServiceProviders: Provider[] = [
    {
        provide: EXTRACTOR,
        useClass: TextExtractor
    }, {
        provide: VALIDATION,
        useClass: ObjectValidator
    }, {
        provide: PREDICTOR,
        useClass: PredictionRequester
    }, {
        provide: LOGGER,
        useClass: Logger
    }, {
        provide: JSON_READER,
        useClass: JsonReader
    }
]