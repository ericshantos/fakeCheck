import { 
    Controller, 
    Post, 
    Body, 
    Inject,
    BadRequestException
} from '@nestjs/common';
import { UrlValidator, CheckRequestDto, CheckResponseDto } from '@check/dto';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckResponse } from '@check/interfaces';
import { CheckService } from '@check/services';
import { LoggerContract } from '@ericshantos/logger';
import { Throttle } from '@nestjs/throttler';
import { LOGGER } from '@/shared/providers/tokens';

@ApiTags('Check')
@Controller('check')
export class CheckController {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        private readonly checkService: CheckService
    ) {}

    @Post()
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @ApiOperation({ summary: 'Verifies the authenticity of a news article' })
    @ApiBody({ type: CheckRequestDto })
    @ApiResponse({ 
        status: 200,
        description: 'Reesult of the news verfication',
        type: CheckResponseDto
    })
    @ApiResponse({ status: 400, description: 'Invalid URL' })
    @ApiResponse({ status: 429, description: 'Too many request - rate Limits excceded' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async checkNews(@Body() body: UrlValidator): Promise<CheckResponse> {
        try {
            const report = await this.checkService.run(body.url);
            this.logger.info(`[SUCCESS] Verification completed for URL: ${body.url} | Veracity: ${report.veracity} | Confidence: ${report.confidence}`);
            return report;
        } catch(err) {
            this.logger.error(`Error in checkNews: ${err.stack}`);
            throw new BadRequestException({
                message: err.message,
                statusCode: 400,
                error: 'Validation Error',
                details: {
                    url: body.url,
                    timestamp: new Date().toISOString()
                }
            });
        }
    }
}