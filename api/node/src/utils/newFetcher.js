import axios from "axios";

/**
 * NewsFetcher encapsulates the HTTP client and the logic to fetch news articles.
 */
export default class NewsFetcher {
  constructor() {
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        "User-Agent": "FakeCheck/1.0 (+https://github.com/ericshantos/fakeCheck)"
      }
    });
  }

  /**
   * Fetches raw HTML content from a given news URL.
   * @param {string} url - The URL of the news article.
   * @returns {Promise<string>} - The raw HTML content.
   * @throws {Error} - If the fetch fails.
   */
  async fetch(url) {
    try {
      new URL(url); // Validate URL format

      const response = await this.httpClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching news:", {
        message: error.message,
        status: error.response?.status,
        url
      });

      throw new Error("Unable to fetch the news content.");
    }
  }
}
