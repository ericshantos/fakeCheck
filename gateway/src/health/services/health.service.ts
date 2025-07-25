import { Injectable, Inject } from '@nestjs/common';
import { LoggerContract } from '@ericshantos/logger';
import { HealthResponse } from '@health/interfaces/health-response.interface';
import { Inspector } from '@health/interfaces/inspector.interface';
import { LOGGER } from '@/shared/providers/tokens';
import { 
  CHECK_INTERNET, 
  CHECK_MODEL, 
  CHECK_SCRAPER, 
  CHECK_SYSTEM_RESOURCES 
} from '@health/providers/token';

@Injectable()
export class HealthService {
  constructor(
    @Inject(LOGGER) private readonly logger: LoggerContract,
    @Inject(CHECK_INTERNET) private readonly internetCheck: Inspector,
    @Inject(CHECK_SCRAPER) private readonly scraperCheck: Inspector,
    @Inject(CHECK_SYSTEM_RESOURCES) private readonly systemResourcesCheck: Inspector,
    @Inject(CHECK_MODEL) private readonly modelCheck: Inspector,
  ) {}

  async run(): Promise<HealthResponse> {
    this.logger.info('Starting system health check...');

    const [internet, scraper, systemResources, model] = await Promise.all([
      this.internetCheck.run(),
      this.scraperCheck.run(),
      this.systemResourcesCheck.run(),
      this.modelCheck.run(),
    ]);

    const allChecks = [ internet, scraper, systemResources, model ];

    this.logger[internet.status === 'success' ? 'info' : 'warn'](
      `Internet check: ${internet.status} - ${internet.message}`
    );
    this.logger[scraper.status === 'success' ? 'info' : 'warn'](
      `Scraper check: ${scraper.status} - ${scraper.message}`
    );
    this.logger[systemResources.status === 'success' ? 'info' : 'warn'](
      `System check: ${systemResources.status} - ${systemResources.message}`
    );
    this.logger[model.status === 'success' ? 'info' : 'warn'](
      `Model check: ${model.status} - ${model.message}`
    );

    const overallStatus = Object.values(allChecks).every(
      (check) => check.status === 'success'
    )
      ? 'healthy'
      : 'unhealthy';

    this.logger[overallStatus === 'healthy' ? 'info' : 'error'](
      `Overall system status: ${overallStatus.toUpperCase()}`
    );

    return {
      status: overallStatus,
      checks: allChecks
    };
  }
}
