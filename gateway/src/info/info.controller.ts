import { LOGGER } from '@/shared/providers/tokens';
import { LoggerContract } from '@ericshantos/logger';
import { Controller, Inject, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InfoService } from './services/info.service';
import { InfoResponse } from './interfaces/info-response.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoResponseDto } from './dtos/info.dto';

@ApiTags('Info')
@Controller('info')
export class InfoController {
    constructor(
        @Inject(LOGGER) private readonly logger: LoggerContract,
        private readonly infoService: InfoService
    ) {}
    
    @Get()
    @ApiOperation({
        summary: "Retrieves the API information, such as version and model architecture"
    })
    @ApiResponse({
        status: 200,
        description: "API and model information",
        type: InfoResponseDto
    })
    @ApiResponse({
        status: 500,
        description: "Error retrieving information"
    })
    async inform(): Promise<InfoResponse> {
        try {
            const reponse = await this.infoService.run();
            this.logger.info("[SUCCESS] /info - Information returned successfully!");
            return reponse
        } catch(err: any) {
            this.logger.error(`/info - Error fetching information: ${err.message}`);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal server error',
                message: err.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
