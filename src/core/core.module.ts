import { Module } from '@nestjs/common';
import { ThrottlerConfig } from './throttler/throttler.config';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import configuration from "@config/index";

@Module({
    imports: [
        ThrottlerConfig,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
    ],
    providers: [{
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
    }]
})
export class CoreModule {}
