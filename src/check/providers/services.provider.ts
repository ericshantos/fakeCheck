import { Provider } from "@nestjs/common";
import { CacheManager, NewsFetcher } from "@check/services";
import {
    CACHE,
    FETCHER
} from "@check/providers/token";

export const ServiceProvider: Provider[] = [
    {
        provide: CACHE,
        useClass: CacheManager
    }, {
        provide: FETCHER,
        useClass: NewsFetcher
    }
];