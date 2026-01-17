import { Provider } from "@nestjs/common";
import { SELECTORS, VALIDATION } from "./tokens";

import { ObjectValidator } from "../services";

export const EXTRACTOR_PROVIDERS: Provider[] = [{
        provide: VALIDATION,
        useClass: ObjectValidator
    }, {
        provide: SELECTORS,
        useValue: {
            title: 'h1',
            paragraphs: 'article p'
        },
    },
]