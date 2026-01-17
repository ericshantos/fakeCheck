const handlers: Record<string, Function> = {};

const wsMock = {
  on: jest.fn((event: string, cb: Function) => {
    handlers[event] = cb;
  }),
  send: jest.fn(),
  close: jest.fn(),
};

jest.mock('ws', () => ({
  WebSocket: jest.fn(() => wsMock),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { PredictionRequester } from '@shared/services';
import {
  CONNECTOR_HOST,
  CONNECTOR_PORT,
  CONNECTOR_TIMEOUT,
} from '@shared/providers/tokens';

describe('PredictionRequester', () => {
  let service: PredictionRequester;

  beforeEach(async () => {
    jest.clearAllMocks();
    Object.keys(handlers).forEach(k => delete handlers[k]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PredictionRequester,
        { provide: CONNECTOR_HOST, useValue: 'localhost' },
        { provide: CONNECTOR_PORT, useValue: 8080 },
        { provide: CONNECTOR_TIMEOUT, useValue: 5000 },
      ],
    }).compile();

    service = module.get<PredictionRequester>(PredictionRequester);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the prediction when the server responds correctly', async () => {
    const promise = service.predict('test');

    handlers.open();

    handlers.message(
      Buffer.from(JSON.stringify({ prediction: 0.87 })),
    );

    const result = await promise;

    expect(result).toBe(0.87);
    expect(wsMock.send).toHaveBeenCalledWith(
      JSON.stringify({ text: 'test' }),
    );
    expect(wsMock.close).toHaveBeenCalled();
  });
});
