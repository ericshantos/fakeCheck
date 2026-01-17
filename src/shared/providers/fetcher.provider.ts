import { Provider } from "@nestjs/common";
import { HTTP_CLIENT } from "./tokens";
import axios from "axios";

export const FETCHER_PROVIDERS: Provider[] = [{
    provide: HTTP_CLIENT,
    useValue: axios.create({
        timeout: 10000,
        headers: {
            'User-Agent': 'FakeCheck/4.1 (+https://github.com/ericshantos/fakeCheck_API)',
        }
    })
}];