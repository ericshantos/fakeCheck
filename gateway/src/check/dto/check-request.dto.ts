import { ApiProperty } from "@nestjs/swagger";

export class CheckRequestDto {
    @ApiProperty({
        description: 'The URL of the news articles to be verefided',
        example: 'https://exemple.com/news',
    })
    url: string;
}