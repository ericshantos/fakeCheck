import NewFetcher from "./../utils/newFetcher.js";
import TextExtractor from "../utils/TextExtractor.js";
import PredictionRequester from "../utils/pythonBridge.js";

const DEFAULT_THRESHOLD = 0.7;

/**
 * Verifies the authenticity of a news article by fetching its content, 
 * extracting the text, and analyzing it with a machine learning model. 
 * It determines whether the article is real or fake based on a confidence score.
 *
 * @param {string} url - The URL of the news article to verify.
 * @param {Object} [options] - Optional configuration for customization or testing.
 * @param {Function} [options.fetch=fetchNews] - Custom function to fetch the HTML content of the news article. Defaults to `new NewFetcher()`.
 * @param {TextExtractor} [options.extractor=new TextExtractor()] - Custom instance of the text extractor. Defaults to `new TextExtractor()`.
 * @param {PredictionRequester} [options.predictor=new PredictionRequester()] - Custom instance of the prediction requester. Defaults to `new PredictionRequester()`.
 * @param {Date} [options.now=new Date()] - Custom timestamp for when the extraction is performed. Defaults to the current date and time.
 *
 * @returns {Promise<{ title: string, content: string, veracity: "real" | "fake", confidence: number, threshold: number, extracted_at: string }>} 
 * An object containing the article's veracity label ("real" or "fake"), the confidence score (rounded to two decimal places), 
 * the threshold used for classification, and the timestamp of when the extraction occurred.
 * 
 * @throws {Error} If any error occurs during the fetching, extracting, or predicting process.
 * 
 * @example
 * const result = await checkService('https://example.com/article');
 * console.log(result); // { veracity: "real", confidence: 0.85, threshold: 0.7, extracted_at: "2025-04-16T00:00:00.000Z" }
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
  try {
    // Fetch and extract the HTML content of the news article
    const html = await fetchNews.fetch(url);
    const content = extractor.extract(html);

    if (!content?.articleText) {
      throw new Error("Article text not found.");
    }

    // Process the article text with the Python ML model
    const predictionScore = await predictor.predict(content.articleText);
    console.log("Processor result:", predictionScore);

    const label = predictionScore > DEFAULT_THRESHOLD ? "real" : "fake";

    return {
      veracity: label,
      confidence: Math.round(predictionScore * 100) / 100,
      threshold: DEFAULT_THRESHOLD,
      extracted_at: now.toISOString()
    };

  } catch (error) {
    console.error("Error verifying news article:", error.message);
    throw new Error("Failed to process the news content.");
  }
};

export default checkService;
