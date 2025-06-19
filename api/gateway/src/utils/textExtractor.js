const cheerio = require("cheerio");

class TextExtractor {
  constructor({ patner = cheerio.load, logger = console, selectors = {} } = {}) {
    if (typeof patner !== "function") throw new TypeError("patner must be a function");
    if (!logger || typeof logger.info !== "function") throw new TypeError("logger must support .info");

    this.patner = patner;
    this.logger = logger;
    this.selectors = {
      title: selectors.title || "h1",
      paragraphs: selectors.paragraphs || "article p",
    };
  }

  _extractTitle($) {
    const titleText = $(this.selectors.title).first().text().trim();
    this.logger[titleText ? "info" : "warn"](
      titleText ? `Extracted title: ${titleText}` : "Title not found in HTML."
    );
    return titleText || "Title not found";
  }

  _extractArticleText($) {
    let text = $(this.selectors.paragraphs)
      .map((_, el) => $(el).text().trim())
      .get()
      .join(" ")
      .trim();

    if (!text) {
      this.logger.warn("Article text not found in selector, falling back to all <p>.");
      text = $("p")
        .map((_, el) => $(el).text().trim())
        .get()
        .join(" ")
        .trim();
    }

    this.logger[text ? "info" : "warn"](
      text ? "Article text extracted successfully." : "No article text found."
    );

    return text || "No article text found";
  }

  extract(html) {
    if (!html || typeof html !== "string") {
      this.logger.error("Invalid HTML input.");
      throw new Error("Invalid HTML input.");
    }

    this.logger.info("Extracting content from HTML.");
    const $ = this.patner(html);
    const title = this._extractTitle($);
    const articleText = this._extractArticleText($);
    this.logger.info("Content extraction completed.");
    return { title, articleText };
  }
}

module.exports = { TextExtractor };
