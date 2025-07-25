import { 
    Controller, 
    Inject, 
    Get, 
    HttpException, 
    HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { HealthResponse } from '@health/interfaces/health-response.interface';
import { HealthService } from '@health/services/health.service';
import { LoggerContract } from '@ericshantos/logger';
import { LOGGER } from '@/shared/providers/tokens';
import { HealthResponseDto } from './dtos';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Health')
@ApiExtraModels(HealthResponseDto)
@Controller('health')
export class HealthController {

    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        private readonly healthService: HealthService
    ) {}

    @Get()
    @Throttle({ default: { limit: 1, ttl: 60000 } })
    @ApiOperation({
        summary: 'Performs a system health check, including connectivity, scraper, and model status',
        description: '⚠️ Rate limit: 1 requests per minute per IP.',
    })
    @ApiOkResponse({
        description: 'Healthy system status',
        type: HealthResponseDto,
    })
    @ApiResponse({ status: 429, description: 'Too many requests - rate limit exceeded' })
    @ApiResponse({ status: 503, description: 'Service unavailable' })
    @ApiResponse({ status: 500, description: 'Error performing the health check' })
    async allOk(): Promise<HealthResponse> {
        try {
            const result = await this.healthService.run();

            this.logger[result.status === "healthy" ? "info" : "warn"](
                `[RESULT] /health - Status: ${result.status}`
            );

            if (result.status !== 'healthy') {
                throw new HttpException(result, HttpStatus.SERVICE_UNAVAILABLE);
            }

            return result;

        } catch (error: any) {
            this.logger.error(`/health - Failed to execute check: ${error.message}`);

            throw new HttpException({
                status: 'error',
                message: 'An unexpected error occurred in healthController.',
                details: error.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
