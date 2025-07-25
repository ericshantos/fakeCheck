import { Provider } from "@nestjs/common";
import { HTTP_CLIENT } from "./token";
import axios from "axios";

export const FetcherProvider: Provider[] = [
  {
    provide: HTTP_CLIENT,
    useValue: axios.create({
      timeout: 10000,
      headers: {
        'User-Agent': 'FakeCheck/3.0 (+https://github.com/ericshantos/fakeCheck_API)',
      }
    })
  }
];
