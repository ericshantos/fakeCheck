const { log } = require("./logger");
const cheerio = require("cheerio");

/**
 * Extracts structured content from raw HTML using Cheerio.
 */
class TextExtractor {
  /**
   * Extracts the title and main text from HTML content.
   * @param {string} html - The raw HTML content.
   * @returns {{ title: string, articleText: string }}
   */
  extract(html) {
    if (!html || typeof html !== "string") {
      log("Invalid HTML input.", "error");
      throw new Error("Invalid HTML input.");
    }

    log("Extracting content from HTML.", "info");
    
    const $ = cheerio.load(html);

    const title = this._extractTitle($);
    const articleText = this._extractArticleText($);

    log("Content extraction completed.", "info");
    return { title, articleText };
  }

  /**
   * Extracts the title from the HTML.
   * @param {cheerio.CheerioAPI} $ - Cheerio instance of the loaded HTML.
   * @returns {string}
   */
  _extractTitle($) {
    const titleText = $("h1").first().text().trim();
    if (!titleText) {
      log("Title not found in HTML.", "warn");
    } else {
      log(`Extracted title: ${titleText}`, "info");
    }
    return titleText || "Title not found";
  }

  /**
   * Extracts the article text from the HTML.
   * @param {cheerio.CheerioAPI} $ - Cheerio instance of the loaded HTML.
   * @returns {string}
   */
  _extractArticleText($) {
    const articleText = $("article p")
      .map((_, el) => $(el).text().trim())
      .get()
      .join(" ")
      .trim();

    if (!articleText) {
      log("Article text not found in HTML.", "warn");
    } else {
      log("Article text extracted successfully.", "info");
    }

    return articleText || "No article text found";
  }
}

module.exports = { TextExtractor };