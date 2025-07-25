import { Injectable, Inject } from '@nestjs/common';
import { LoggerContract } from "@ericshantos/logger";
import { 
  CheckResponse, 
  Fetcher, 
  Extractor, 
  Predictor, 
  Cache 
} from '@check/interfaces';
import { FETCHER, CACHE } from '@check/providers/token';
import { PREDICTOR, LOGGER, EXTRACTOR } from '@/shared/providers/tokens';

@Injectable()
export class CheckService {
  constructor(
    @Inject(FETCHER) private readonly fetcher: Fetcher,
    @Inject(EXTRACTOR) private readonly extractor: Extractor,
    @Inject(PREDICTOR) private readonly predictor: Predictor,
    @Inject(CACHE) private readonly cache: Cache,
    @Inject(LOGGER) private readonly logger: LoggerContract
  ) {}

  private readonly now = new Date();
  private readonly threshold = 0.7;

  async run(url: string): Promise<CheckResponse> {
    const cached = await this.cache.get(url);

    if (cached) {
      this.logger.info(`Cache hit for URL: ${url}`);
      return JSON.parse(cached);
    };

    this.logger.info(`Cache miss for URL: ${url}`);
    try {

      this.logger.info(`Fetching: ${url}`);
      const html = await this.fetcher.fetch(url);

      this.logger.info(`Extracting: ${url}`);
      const { articleText } = this.extractor.extract(html);

      if (!articleText) throw new Error("Article text not found.");

      this.logger.info(`Predicting: ${url}`);
      const score = Number(await this.predictor.predict(articleText));

      const result = {
        veracity: score > this.threshold ? "real" : "fake",
        confidence: Math.round(score * 100) / 100,
        threshold: this.threshold,
        extracted_at: this.now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      };

      await this.cache.set(url, result);
      this.logger.info(`Result stored to URL: ${url}`);
      return result;
    } catch (err) {
      this.logger.error(`Error checking URL: ${url} - ${err.message}`);
      throw new Error(`Failed to process the news content: ${err.message}`);
    }
  }
}