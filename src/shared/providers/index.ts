import { Provider } from "@nestjs/common";

import { CONNECTOR_PROVIDERS } from "./connector.provider";
import { GLOBAL_SERVICES_PROVIDERS } from "./global-services.provider";
import { EXTRACTOR_PROVIDERS } from "./extractor.provider";
import { FETCHER_PROVIDERS } from "./fetcher.provider";
import { JSON_READER_PROVIDERS } from "./json-reader.provider";


export const SHARED_PROVIDERS: Provider[] = [
    ...CONNECTOR_PROVIDERS,
    ...GLOBAL_SERVICES_PROVIDERS,
    ...EXTRACTOR_PROVIDERS,
    ...FETCHER_PROVIDERS,
    ...JSON_READER_PROVIDERS
];
