import { Module } from '@nestjs/common';
import { CheckController } from '@check/check.controller';
import { CheckService } from '@check/services';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CheckController],
  providers: [CheckService]
})
export class CheckModule {}
