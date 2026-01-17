import { Controller, Body, Post, Logger, BadRequestException } from '@nestjs/common';
import { CheckResponse } from '@check/contracts';
import { CheckService } from '@check/services';
import { UrlValidator } from '@check/dtos';

import { Throttle } from '@nestjs/throttler';

import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CheckRequestDto, CheckResponseDto } from '@check/dtos';

@ApiTags('Check')
@Controller('check')
export class CheckController {
    private readonly logger: Logger = new Logger(CheckController.name);
    
    constructor (private readonly service: CheckService) {}

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
    async CheckNews(@Body() body: UrlValidator): Promise<CheckResponse> {
        try { 
            const report = await this.service.run(body.url);  
            this.logger.log(`
                [SUCCESS] Verification completed for URL: ${body.url} | 
                Veracity: ${report.veracity} | 
                Confidence: ${report.confidence}`
            );
            return report
        } catch (err: any) {
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
        };
    };
};
