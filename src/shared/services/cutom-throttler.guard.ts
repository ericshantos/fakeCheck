import { ThrottlerGuard } from '@nestjs/throttler';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(): Promise<void> {
    throw new HttpException(
      "You've exceeded the request limit. Please wait and try again later.",
      429
    );
  }
}