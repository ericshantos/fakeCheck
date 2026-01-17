import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CheckService } from '@check/services';
import { 
  PREDICTOR, 
  EXTRACTOR, 
  HTTP_CLIENT
} from '@shared/providers/tokens';

import { 
  PredictorContract, 
  ExtractorContract 
} from '@/shared/contracts';
import { AxiosInstance } from 'axios';

describe('CheckService', () => {
  let service: CheckService;

  let predictorMock: jest.Mocked<PredictorContract>;
  let extractorMock: jest.Mocked<ExtractorContract>;
  let fetcherMock: jest.Mocked<AxiosInstance>;

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    predictorMock = {
      predict: jest.fn(),
    } as any;

    extractorMock = {
      extract: jest.fn()
    } as any;

    fetcherMock = {
      get: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckService, {
          provide: PREDICTOR,
          useValue: predictorMock,
        }, {
          provide: EXTRACTOR,
          useValue: extractorMock,
        }, {
          provide: HTTP_CLIENT,
          useValue: fetcherMock,
        }
      ],
    }).compile();

    service = module.get<CheckService>(CheckService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    const url = 'https://news.test';

    fetcherMock.get.mockResolvedValue('<html>fake</html>');

    extractorMock.extract.mockReturnValue({
      title: 'Título da notícia',
      articleText: 'Texto da notícia',
    });

    predictorMock.predict.mockResolvedValue(0.85);

    const result = await service.run(url);

    expect(fetcherMock.get).toHaveBeenCalledWith(url);
    expect(extractorMock.extract).toHaveBeenCalled();
    expect(predictorMock.predict).toHaveBeenCalledWith('Texto da notícia');

    expect(result).toEqual(
      expect.objectContaining({
        veracity: 'real',
        confidence: 0.85,
        threshold: 0.7,
      }),
    );

    expect(result.extracted_at).toBeDefined();
  });
});
