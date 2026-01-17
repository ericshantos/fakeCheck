import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { CheckModule } from './check/check.module';
import { CoreModule } from '@core/core.module';

import { DebugLoggerMiddleware } from '@core/middlewares';

@Module({
  imports: [
    SharedModule, 
    CheckModule,
    CoreModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DebugLoggerMiddleware)
      .forRoutes("*");
  };
};
