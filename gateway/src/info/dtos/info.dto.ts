import { ApiProperty } from "@nestjs/swagger";

export class InfoResponseDto {
    @ApiProperty({ example: "1.5.0" })
    api_version: string;

    @ApiProperty({ example: "TensorFlow 2.14" })
    framework: string[]

    @ApiProperty({ example: "LSTM + Embedding Layer" })
    model_achitecture: string;

    @ApiProperty({ example: "MIT" })
    license: string;
}