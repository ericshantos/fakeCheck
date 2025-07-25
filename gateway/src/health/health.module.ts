import { Module } from "@nestjs/common";
import { HealthController } from "@health/health.controller";
import { HealthService } from "@health/services/health.service";
import { HealthProvider } from "@health/providers/health.provider";
import { SharedModule } from "@shared/shared.module";

@Module({
  controllers: [HealthController],
  providers: [HealthService, ...HealthProvider],
  imports: [SharedModule]
})
export class HealthModule {}