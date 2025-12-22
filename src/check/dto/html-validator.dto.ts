import { IsString, IsNotEmpty } from 'class-validator';

export class HtmlValidator {

    @IsNotEmpty({ message: 'HTML is Emply!' })
    @IsString({ message: 'Invalid HTML input.' })
    html: string;
}
