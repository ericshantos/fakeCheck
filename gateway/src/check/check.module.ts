import { Module } from '@nestjs/common';
import { CheckController } from "@check/check.controller";
import { ChecksProvider } from '@check/providers';
import { SharedModule } from '@shared/shared.module';
import { CheckService } from '@check/services';

@Module({
  controllers: [CheckController],
  providers: [
    CheckService,
    ...ChecksProvider
  ],
  exports: ChecksProvider,
  imports: [SharedModule]
})
export class CheckModule {}
