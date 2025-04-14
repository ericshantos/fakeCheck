import NewFetcher from "./../utils/newFetcher.js";
import TextExtractor from "../utils/TextExtractor.js";
import textProcessor from "../utils/pythonBridge.js";

const DEFAULT_THRESHOLD = 0.7;

/**
 * Checks the veracity of a news article by fetching its content,
 * extracting the text, and analyzing it with a machine learning model.
 *
 * @param {string} url - The URL of the news article to check.
 * @param {Object} [options] - Optional dependencies for testing or customization.
 * @param {Function} [options.fetch=fetchNews] - Custom fetch function to retrieve the HTML content.
 * @param {TextExtractor} [options.extractor=new TextExtractor()] - Custom text extractor instance.
 *
 * @returns {Promise<{ title: string, content: string, veracity: "real" | "fake", confidence: number }>} 
 * An object containing the article title, veracity label, and prediction confidence.
 *
 * @throws {Error} If there is any problem processing the news content.
 */
const checkService = async (
  url,
  { 
    fetchNews = new NewFetcher(), 
    extractor = new TextExtractor(),
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
    const predictionScore = await textProcessor(content.articleText);
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
