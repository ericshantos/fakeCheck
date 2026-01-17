import { Provider } from "@nestjs/common";
import { 
    CONNECTOR_PORT, 
    CONNECTOR_HOST, 
    CONNECTOR_TIMEOUT 
} from "./tokens";

export const CONNECTOR_PROVIDERS: Provider[] = [{
        provide: CONNECTOR_PORT,
        useValue: 9000,
    },{
        provide: CONNECTOR_HOST,
        useValue: 'python_service',
    }, {
        provide: CONNECTOR_TIMEOUT,
        useValue: 10000,
    },
];