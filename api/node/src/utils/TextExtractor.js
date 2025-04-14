import * as cheerio from "cheerio";

/**
 * Extracts structured content from raw HTML using Cheerio.
 */
export default class TextExtractor {
  /**
   * Extracts the title and main text from HTML content.
   * @param {string} html - The raw HTML content.
   * @returns {{ title: string, articleText: string }}
   */
  extract(html) {
    if (!html || typeof html !== "string") {
      throw new Error("Invalid HTML input.");
    }

    const $ = cheerio.load(html);

    const title = this._extractTitle($);
    const articleText = this._extractArticleText($);

    return { title, articleText };
  }

  /**
   * Extracts the title from the HTML.
   * @param {cheerio.CheerioAPI} $ - Cheerio instance of the loaded HTML.
   * @returns {string}
   */
  _extractTitle($) {
    const titleText = $("h1").first().text().trim();
    return titleText || "Title not found";
  }

  /**
   * Extracts the article text from the HTML.
   * @param {cheerio.CheerioAPI} $ - Cheerio instance of the loaded HTML.
   * @returns {string}
   */
  _extractArticleText($) {
    return $("article p")
      .map((_, el) => $(el).text().trim())
      .get()
      .join(" ")
      .trim();
  }
}
