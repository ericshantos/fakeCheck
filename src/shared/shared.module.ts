import { Module } from '@nestjs/common';
import { SHARED_PROVIDERS } from './providers';

@Module({
  providers: SHARED_PROVIDERS,
  exports: SHARED_PROVIDERS,
})
export class SharedModule {}
