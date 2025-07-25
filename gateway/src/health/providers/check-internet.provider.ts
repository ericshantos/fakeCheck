import { Provider } from "@nestjs/common";
import { AXIOS_INSTANCE } from "@health/providers/token";
import axios from "axios";

export const CheckInternetProvider: Provider[] = [
    {
        provide: AXIOS_INSTANCE,
        useValue: axios
    }
];