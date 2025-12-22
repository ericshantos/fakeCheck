import { Provider } from "@nestjs/common";
import { CacheProvider } from "./cache.provider";
import { FetcherProvider } from "./fetcher.provider";
import { ServiceProvider } from "./services.provider";

export const ChecksProvider: Provider[] = [
    ...CacheProvider,
    ...FetcherProvider,
    ...ServiceProvider
];