import { Logger } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { JsonReader } from "@shared/services/";
import { READ_FILE } from "@shared/providers/tokens";
import * as fs from "fs";

describe('JsonReader', () => {
    let service: JsonReader;
    let readFileMock: jest.Mock;

    beforeEach(async () => {
        jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
        jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
        readFileMock = jest.fn() as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JsonReader, {
                    provide: READ_FILE,
                    useValue: readFileMock,
                },
            ]
        }).compile();

        service = module.get<JsonReader>(JsonReader);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should read and parse a JSON file successfully', async () => {
        const fakeJson = { name: 'fake-check', version: '1.0.0' };

        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        readFileMock.mockResolvedValue(JSON.stringify(fakeJson));

        const result = await service.read('packeage.json');

        expect(result).toEqual(fakeJson);
        expect(readFileMock).toHaveBeenCalledTimes(1);
    });

      it('should throw an error if file does not exist', async () => {
    // Arrange
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    // Act + Assert
    await expect(service.read('missing.json')).rejects.toThrow(
      /File "missing.json" not found/
    );
  });

  it('should throw an error if JSON is invalid', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    readFileMock.mockResolvedValue('{ invalid json');

    await expect(service.read('package.json')).rejects.toThrow();
  });

  it('should propagate reader errors', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    readFileMock.mockRejectedValue(new Error('read failed'));

    await expect(service.read('package.json')).rejects.toThrow('read failed');
  });
});