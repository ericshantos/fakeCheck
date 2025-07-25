import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ObjectValidator {
  validate<T extends object>(dtoClass: new () => T, payload: object): T {
    const instance = plainToInstance(dtoClass, payload);
    const errors = validateSync(instance);
    if (errors.length > 0) {
      const firstError = errors[0];
      const message = Object.values(firstError.constraints || {})[0];
      throw new Error(message);
    }
    return instance;
  }
}
