import { Provider } from "@nestjs/common";
import { READ_FILE } from "./tokens";
import { promises as fs } from "fs";

export const JSON_READER_PROVIDERS: Provider[] = [{
    provide: READ_FILE,
    useValue: fs.readFile,
}];