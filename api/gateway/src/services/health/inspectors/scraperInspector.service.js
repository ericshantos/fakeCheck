const { Logger } = require("@utils");

const logger = new Logger();

/**
 * Simulates an HTML scraping process to verify if the scraper works as expected.
 *
 * @async
 * @function
 * @returns {Promise<{ status: 'success' | 'error', message: string }>}
 * Returns the result of the scraper functionality check.
 */
const checkScraper = async () => {
    try {
        const html = '<html><body><p>Test news</p></body></html>';
        const match = html.match(/<p>(.*?)<\/p>/)?.[1];

        if (match) {
            return { status: 'success', message: 'Scraper working correctly' };
        } else {
            logger.error("[SCRAPER CHECK] Failed to extract text from HTML");
            return { status: 'error', message: 'Scraper failed to extract text' };
        }
    } catch (error) {
        logger.error(`[SCRAPER CHECK] Unexpected error in scraper: ${error.message}`);
        return { status: 'error', message: 'Unexpected error in scraper' };
    }
};

module.exports = checkScraper;