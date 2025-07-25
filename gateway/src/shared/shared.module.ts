import { Module } from '@nestjs/common';
import { GlobalProviders } from './providers';

@Module({
    providers: GlobalProviders,
    exports: GlobalProviders
})
export class SharedModule {}
