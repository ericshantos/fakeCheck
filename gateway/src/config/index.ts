import * as dotenv from 'dotenv';
dotenv.config();

import { default as devConfig } from './environment/development.config';
import { default as prodConfig } from './environment/production.config';

const env = process.env.NODE_ENV || 'development';

export const AppConfig = env === 'production' ? prodConfig : devConfig;

export { createSwaggerConfig } from './swagger.config';
export { ThrottlerModule } from './throttler.module';
export { ConfigModule } from './config.module';