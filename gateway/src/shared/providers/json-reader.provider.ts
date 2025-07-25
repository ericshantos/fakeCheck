import { Provider } from "@nestjs/common";
import { READER } from "./tokens";
import { readFile } from "fs/promises";

export const JsonReaderProvider: Provider[] = [{
    provide: READER,
    useValue: readFile
}]