import { ObjectValidator } from "../services";
import { IsString, IsNotEmpty } from 'class-validator';

class TestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
};

describe('ObjectValidator', () => {
    let validator: ObjectValidator;

    beforeEach(async () => {
        validator = new ObjectValidator();
    });

    it('should return instance when payload is valid', () => {
        const result = validator.validate(TestDto, { name: 'Eric' });

        expect(result).toBeInstanceOf(TestDto);
        expect(result.name).toBe('Eric');
    });

    it('should throw error when payload is invalid', () => {
        expect(() => {
            validator.validate(TestDto, { name: '' });
        }).toThrow();
    });
});