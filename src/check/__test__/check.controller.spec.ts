import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CheckController } from '@check/check.controller';
import { CheckService } from '@check/services';
import { CheckResponse } from '@check/contracts';
import { BadRequestException } from '@nestjs/common';

describe('CheckController', () => {
  let controller: CheckController;
  let service: CheckService;

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckController],
      providers: [{
        provide: CheckService,
        useValue: {
          run: jest.fn(),
        }
      }]
    }).compile();

    controller = module.get<CheckController>(CheckController);
    service = module.get<CheckService>(CheckService);
  });

  it('The report should be returned when the verification is successful.', async () => {
    const body = { url: 'https://example.com/news' };

    const report: CheckResponse = {
      veracity: 'real',
      confidence: 0.92,
      threshold: 0.7,
      extracted_at: '14/01/2026 10:00:00',
    };

    jest.spyOn(service, 'run').mockResolvedValue(report);

    const result = await controller.CheckNews(body as any);

    expect(result).toEqual(report);
    expect(service.run).toHaveBeenCalledTimes(1);
    expect(service.run).toHaveBeenCalledWith(body.url);
  });

  it('It should throw a BadRequestException when the service fails.', async () => {
    const body = { url: 'https://example.com/news' };

    const error = new Error('Invalid content');

    jest.spyOn(service, 'run').mockRejectedValue(error);

    await expect(controller.CheckNews(body as any))
      .rejects
      .toBeInstanceOf(BadRequestException);

    expect(service.run).toHaveBeenCalledWith(body.url);
  });

  it('It should return correct details in the BadRequestException.', async () => {
    const body = { url: 'https://example.com/news' };

    jest.spyOn(service, 'run').mockRejectedValue(new Error('Boom'));

    try {
      await controller.CheckNews(body as any);
    } catch (err: any) {
      expect(err.getStatus()).toBe(400);

      const response = err.getResponse() as any;

      expect(response.message).toBe('Boom');
      expect(response.error).toBe('Validation Error');
      expect(response.details.url).toBe(body.url);
      expect(response.details.timestamp).toBeDefined();
    }
  });
});
