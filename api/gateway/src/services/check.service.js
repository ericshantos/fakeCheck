const { createClient } = require("redis");
const { 
  log,
  NewFetcher, 
  TextExtractor, 
  PredictionRequester,
} = require("@utils");

/**
 * Default confidence threshold for news classification
 * @constant {number}
 * @default
 */
const DEFAULT_THRESHOLD = 0.7;

/**
 * Redis client instance for caching results
 * @type {import('redis').RedisClientType}
 */
const redisClient = createClient({ url: 'redis://redis:6379' }); 

/**
 * Tracks Redis connection status
 * @type {boolean}
 */
let isRedisConnected = false;

/**
 * Ensures Redis connection is established
 * @async
 * @throws {Error} If connection to Redis fails
 */
const ensureRedisConnected = async () => {
  if (!isRedisConnected) {
    try {
      await redisClient.connect();
      log('Successfully connected to Redis', 'info');
      isRedisConnected = true;
    } catch (error) {
      log('Redis connection failed: ' + error.message, 'error');
      throw error;
    }
  }
};

/**
 * @typedef {Object} NewsVerificationResult
 * @property {string} title - Article title (if available)
 * @property {string} content - Extracted article content
 * @property {"real"|"fake"} veracity - Classification result
 * @property {number} confidence - Model's confidence score (0-1)
 * @property {number} threshold - Threshold used for classification
 * @property {string} extracted_at - ISO timestamp of analysis
 */

/**
 * News verification service that checks article authenticity using ML
 * @module services/checkService
 * @async
 * 
 * @description
 * This service performs end-to-end news verification by:
 * 1. Fetching article content from URL
 * 2. Extracting main text content
 * 3. Processing through ML model
 * 4. Caching results in Redis (1 hour TTL)
 * 
 * Results are cached to prevent reprocessing identical requests.
 * 
 * @param {string} url - The URL of the news article to verify
 * @param {Object} [options] - Configuration options
 * @param {NewFetcher} [options.fetchNews=new NewFetcher()] - Custom fetcher instance
 * @param {TextExtractor} [options.extractor=new TextExtractor()] - Custom text extractor
 * @param {PredictionRequester} [options.predictor=new PredictionRequester()] - Custom ML predictor
 * @param {Date} [options.now=new Date()] - Custom timestamp for the analysis
 * 
 * @returns {Promise<NewsVerificationResult>} Verification results
 * 
 * @throws {TypeError} If URL is invalid
 * @throws {Error} If content extraction fails (code: EXTRACTION_FAILED)
 * @throws {Error} If prediction service fails (code: PREDICTION_FAILED)
 * @throws {Error} If cache operation fails (code: CACHE_ERROR)
 * 
 * @example
 * // Basic usage
 * const result = await checkService('https://example.com/news');
 * 
 * @example
 * // With custom options
 * const result = await checkService('https://example.com/news', {
 *   fetchNews: customFetcher,
 *   now: new Date('2023-01-01')
 * });
 */
const checkService = async (
  url,
  { 
    fetchNews = new NewFetcher(), 
    extractor = new TextExtractor(),
    predictor = new PredictionRequester(),
    now = new Date()
  } = {}
) => {
  await ensureRedisConnected();

  const cachedResult = await redisClient.get(url);
  if (cachedResult) {
    log(`Cache hit para o URL: ${url}`, 'info');
    return JSON.parse(cachedResult);
  } else {
    log(`Cache miss para o URL: ${url}`, 'info');
  }

  try {
    // Fetch and extract the HTML content of the news article
    log(`Fetching news content for URL: ${url}`, 'info');
    const html = await fetchNews.fetch(url);

    log(`Extracting news content for URL: ${url}`, 'info');
    const content = extractor.extract(html);

    if (!content?.articleText) {
      log(`Unable to extract news text for URL: ${url}`, 'error');
      throw new Error("Article text not found.");
    }

    // Process the article text with the Python ML model
    log(`Processing news classification for URL: ${url}`, 'info');
    const predictionScore = await predictor.predict(content.articleText);

    log(`Completed rating for URL: ${url} - Score: ${predictionScore}`, 'info');

    const features = {
      veracity: predictionScore > DEFAULT_THRESHOLD ? "real" : "fake",
      confidence: Math.round(predictionScore * 100) / 100,
      threshold: DEFAULT_THRESHOLD,
      extracted_at: now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    };

    await redisClient.setEx(url, 3600, JSON.stringify(features));
    log(`Result stored in Redis cache for URL: ${url}`, 'info');

    return features;
  } catch (error) {
    log(`Error checking news for URL: ${url} - ${error.message}`, "error");
    if (config.debug) console.error(error);
    throw new Error("Failed to process the news content.");
  }
};

module.exports = checkService;