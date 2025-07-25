import { ObjectValidator } from '../services/validation.service';
import { VALIDATION } from './tokens';

export const ValidationProvider = [{
  provide: VALIDATION,
  useClass: ObjectValidator
}];