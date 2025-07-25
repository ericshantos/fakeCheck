import { IsUrl } from "class-validator";

export class UrlValidator {

    @IsUrl({}, { message: "URL ivalided!" })
    url: string;
}