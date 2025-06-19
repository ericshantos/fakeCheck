const { NewsCheckerService } = require("./check.service");
const { CacheManager } = require("./cacheManager.service");
const {
  NewsFetcher,
  TextExtractor,
  PredictionRequester,
  Logger
} = require("@utils");

const logger = new Logger();

module.exports = new NewsCheckerService({
    fetcher: new NewsFetcher({ logger: logger }),
    extractor: new TextExtractor(),
    predictor: new PredictionRequester(),
    cache: new CacheManager({ logger: logger }),
    logger: logger,
    threshold: 0.7
});
