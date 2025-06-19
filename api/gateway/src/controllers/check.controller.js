const { check } = require("@services");
const { Logger } = require("@utils");

const logger = new Logger();

const checkNewsController = async (req, res) => {
    try {
        const { url } = req.body;

        if (typeof url !== "string" || !url.startsWith("http")) {
            logger.warn(`[BAD REQUEST] Invalid URL received: ${url}`);
            return res.status(400).json({ error: "The provided URL is invalid or missing." });
        }

        const report = await check.run(url);

        logger.info(`[SUCCESS] Verification completed for URL: ${url} | Veracity: ${report.veracity} | Confidence: ${report.confidence}`);
        return res.status(200).json(report);
    } catch (error) {
        logger.error(`Error checking URL: ${req.body.url} | Message: ${error.message}`);
        return res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { checkNewsController };
