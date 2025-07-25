import { Provider } from "@nestjs/common";
import { CustomThrottlerGuard } from "@shared/services/cutom-throttler.guard";
import { APP_GUARD } from "@shared/providers/tokens";

export const RequestLimiterProvider: Provider[] = [{
    provide: APP_GUARD,
    useClass: CustomThrottlerGuard
}];