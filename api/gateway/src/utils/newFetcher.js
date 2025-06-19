const axios = require("axios");

class NewsFetcher {
  constructor({ httpClient = axios.create, logger = console } = {}) {
    this.httpClient = httpClient({
      timeout: 10000,
      headers: {
        "User-Agent": "FakeCheck/1.0 (+https://github.com/ericshantos/fakeCheck)"
      }
    });
    this.logger = logger;
  }

  /**
   * Fetches raw HTML content from a given news URL.
   * @param {string} url - The URL of the news article.
   * @returns {Promise<string>} - The raw HTML content.
   * @throws {Error} - If the fetch fails.
   */
  async fetch(url) {
    try {
      this.logger.info(`Attempting to fetch news from URL: ${url}`);

      new URL(url);

      const response = await this.httpClient.get(url);

      this.logger.info(`Successfully fetched news from URL: ${url}`);

      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching news from URL: ${url}`);
      this.logger.error(`Error details: ${error.message}`);

      if (error.response) {
        this.logger.error(`Error status: ${error.response.status}`);
      }

      throw new Error("Unable to fetch the news content.");
    }
  }
}

module.exports = { NewsFetcher };
