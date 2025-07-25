import { ApiProperty } from "@nestjs/swagger";

export class CheckResponseDto {
    @ApiProperty({ enum: ['real', 'fake' ] })
    veracity: 'real' | 'fake';

    @ApiProperty({ example: 0.85 })
    confidence: number;
};