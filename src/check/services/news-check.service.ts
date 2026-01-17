import { Injectable, Inject, Logger } from '@nestjs/common';
import { PREDICTOR, EXTRACTOR } from '@shared/providers/tokens';
import { PredictorContract, ExtractorContract } from '@shared/contracts';
import { HTTP_CLIENT } from '@shared/providers/tokens';
import { CheckResponse } from '@check/contracts';
import { AxiosInstance } from 'axios';

@Injectable()
export class CheckService {
  private readonly logger: Logger = new Logger(CheckService.name);
  private threshold: number;
  private now: Date;
  
  constructor (
    @Inject(PREDICTOR) private readonly predictor: PredictorContract,
    @Inject(EXTRACTOR) private readonly extractor: ExtractorContract,
    @Inject(HTTP_CLIENT) private readonly fetcher: AxiosInstance,
  ) {
    this.now = new Date();
    this.threshold = 0.7;
  }

  async run(url: string): Promise<CheckResponse> {
    try {
      this.logger.log(`Fetching: ${url}`);
      const html = (await this.fetcher.get(url)).data;

      this.logger.log(`Extracting: ${url}`);
      const { articleText } = this.extractor.extract(html);

      if (!articleText) throw new Error("Article text not found.");

      this.logger.log(`Predicting: ${url}`);
      const score = Number(await this.predictor.predict(articleText));

      return {
        veracity: score > this.threshold ? "real" : "fake",
        confidence: Math.round(score * 100) / 100,
        threshold: this.threshold,
        extracted_at: this.now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      };
    } catch (err: any) {
      this.logger.error(`Error checking URL: ${url} - ${err.message}`);
      throw new Error(`Failed to process the news content: ${err.message}`);
    };
  };
};