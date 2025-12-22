import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DebugLogger } from '@shared/middlewares/debug-logger.middleware';
import { ConfigModule, ThrottlerModule } from '@config/index';
import { CheckModule } from '@check/check.module';
import { SharedModule } from '@shared/shared.module';
import { HealthModule } from '@health/health.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    CheckModule,
    SharedModule,
    HealthModule,
    InfoModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(DebugLogger)
    .forRoutes('*');
  }
}
