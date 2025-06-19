const { debug } = require("@config");

class NewsCheckerService {
  constructor({ fetcher, extractor, predictor, cache, logger, now = new Date(), threshold = 0.5 }) {
    this.fetcher = fetcher;
    this.extractor = extractor;
    this.predictor = predictor;
    this.cache = cache;
    this.logger = logger;
    this.now = now;
    this.threshold = threshold;
  }

  async run(url) {
    const cached = await this.cache.get(url);
    if (cached) {
      this.logger.info(`Cache hit for URL: ${url}`);
      return JSON.parse(cached);
    }

    this.logger.info(`Cache miss for URL: ${url}`);
    try {
      this.logger.info(`Fetching: ${url}`);
      const html = await this.fetcher.fetch(url);

      this.logger.info(`Extracting: ${url}`);
      const content = this.extractor.extract(html);

      if (!content?.articleText) {
        throw new Error("Article text not found.");
      }

      this.logger.info(`Predicting: ${url}`);
      const score = await this.predictor.predict(content.articleText);

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
      if (debug) console.error(err);
      throw new Error("Failed to process the news content.");
    }
  }
}

module.exports = { NewsCheckerService };