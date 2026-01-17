import { Provider } from "@nestjs/common";
import { PREDICTOR, EXTRACTOR, READER } from "./tokens";

import {
    JsonReader,
    PredictionRequester,
    TextExtractor
} from "@shared/services";


export const GLOBAL_SERVICES_PROVIDERS: Provider[] = [{
        provide: PREDICTOR,
        useClass: PredictionRequester,
    }, {
        provide: EXTRACTOR,
        useClass: TextExtractor
    }, {
        provide: READER,
        useClass: JsonReader
    },
];