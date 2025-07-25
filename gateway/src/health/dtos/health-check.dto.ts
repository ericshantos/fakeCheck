import { ApiProperty } from "@nestjs/swagger";

class HealthDetailDto {
    @ApiProperty({ example: 'ok' })
    status: string;

    @ApiProperty({ example: 'All system nominal' })
    message: string;
}

class HealthCheckDto {
  @ApiProperty({ type: HealthDetailDto })
  internet: HealthDetailDto;

  @ApiProperty({ type: HealthDetailDto })
  scraper: HealthDetailDto;

  @ApiProperty({ type: HealthDetailDto })
  systemResources: HealthDetailDto;

  @ApiProperty({ type: HealthDetailDto })
  model: HealthDetailDto;
}

export class HealthResponseDto {
    @ApiProperty({ enum: ['healthy', 'unhealthy'], example: 'healthy' })
    status: 'healthy' | 'unhealthy';

    @ApiProperty({ type: HealthCheckDto })
    checks: HealthCheckDto;
}