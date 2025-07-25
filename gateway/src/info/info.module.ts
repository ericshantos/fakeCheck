import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './services/info.service';
import { SharedModule } from '@/shared/shared.module';

@Module({
  controllers: [InfoController],
  providers: [InfoService],
  imports: [SharedModule]
})
export class InfoModule {}
