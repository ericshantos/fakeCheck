import { Provider } from "@nestjs/common";
import { CheckModel } from "@health/services/checkModel.inspector";
import { CheckInternetConnection } from "@health/services/Internet.inspector";
import { CheckScraper } from "@health/services/scraper.inspector";
import { CheckSystemResources } from "@health/services/systemResources.inspector";
import { 
    CHECK_MODEL, 
    CHECK_INTERNET, 
    CHECK_SCRAPER, 
    CHECK_SYSTEM_RESOURCES 
} from "@health/providers/token";

export const InspectorProvider: Provider[] = [
    {
        provide: CHECK_INTERNET,
        useClass: CheckInternetConnection
    }, {
        provide: CHECK_SCRAPER,
        useClass: CheckScraper
    }, {
        provide: CHECK_MODEL,
        useClass: CheckModel
    }, {
        provide: CHECK_SYSTEM_RESOURCES,
        useClass: CheckSystemResources
    }
];