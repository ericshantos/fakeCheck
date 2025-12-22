import { Provider } from "@nestjs/common";
import { FREE_MEMORY, LOAD_AVG } from "@health/providers/token";
import { freemem, loadavg } from "os";

export const ChecksystemResourceProvider: Provider[] = [
    {
        provide: FREE_MEMORY,
        useValue: freemem() / Math.pow(1024, 2)
    }, {
        provide: LOAD_AVG,
        useValue: loadavg()[0]
    }
];