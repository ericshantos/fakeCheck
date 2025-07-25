import { Provider } from "@nestjs/common";
import { SELECTORS } from "./tokens";

export const ExtractorProvider: Provider[] = [{
        provide: SELECTORS,
        useValue: {
            title: 'h1',
            paragraphs: 'article p'
        }
    }
];