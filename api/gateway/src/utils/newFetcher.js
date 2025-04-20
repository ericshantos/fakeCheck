import { log } from "./logger.js";
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
      log(`Attempting to fetch news from URL: ${url}`, "info");

      new URL(url);

      const response = await this.httpClient.get(url);

      log(`Successfully fetched news from URL: ${url}`, "info");

      return response.data;
    } catch (error) {
      log(`Error fetching news from URL: ${url}`, "error");
      log(`Error details: ${error.message}`, "error");

      if (error.response) {
        log(`Error status: ${error.response.status}`, "error");
      }

      throw new Error("Unable to fetch the news content.");
    }
  }
}