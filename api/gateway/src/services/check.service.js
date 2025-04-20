import { createClient } from "redis";
import NewFetcher from "./../utils/newFetcher.js";
import TextExtractor from "../utils/TextExtractor.js";
import PredictionRequester from "../utils/pythonBridge.js";
import { log } from "./../utils/logger.js";

const DEFAULT_THRESHOLD = 0.7;

const redisClient = createClient({ url: 'redis://redis:6379' }); 
await redisClient.connect()
  .then(() => log('Successfully connected to Redis', 'info'))
  .catch((error) => log('Redis connection failed: ' + error.message, error));

/**
 * Verifies the authenticity of a news article by processing its content through
 * a machine learning model and returns the analysis results.
 * 
 * @param {string} url - The URL of the news article to verify. Must be a valid HTTP/HTTPS URL.
 * @param {Object} [options] - Optional configuration for customization or testing.
 * @param {NewFetcher} [options.fetchNews=new NewFetcher()] - Custom news fetcher instance. Default uses NewFetcher.
 * @param {TextExtractor} [options.extractor=new TextExtractor()] - Custom text extractor instance. Default uses TextExtractor.
 * @param {PredictionRequester} [options.predictor=new PredictionRequester()] - Custom ML predictor instance. Default uses PredictionRequester.
 * @param {Date} [options.now=new Date()] - Custom timestamp for the extraction. Defaults to current datetime.
 * 
 * @returns {Promise<Object>} Result object containing:
 * @returns {string} .title - Article title (if available)
 * @returns {string} .content - Extracted article content
 * @returns {"real"|"fake"} .veracity - Classification result
 * @returns {number} .confidence - Model's confidence score (0-1)
 * @returns {number} .threshold - Threshold used for classification
 * @returns {string} .extracted_at - ISO timestamp of when analysis was performed
 * 
 * @throws {Error} If any of these occur:
 * - Invalid URL or failed fetch
 * - Unable to extract article content
 * - Prediction service failure
 * - Redis cache operation failure
 * 
 * @example
 * // Basic usage
 * const result = await checkService('https://example.com/news-article');
 * 
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
      extracted_at: now.toISOString()
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

export default checkService;