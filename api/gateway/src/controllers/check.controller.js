import checkService from "../services/check.service.js";
import { log } from "../utils/logger.js";

/**
 * Controller to handle news verification requests via GET.
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>}
 */
const checkNewsController = async (req, res) => {
    try {
        const { url } = req.body;

        if (typeof url !== "string" || !url.startsWith("http")) {
            log(`[BAD REQUEST] Invalid URL received: ${url}`, "warn");
            return res.status(400).json({ error: "The provided URL is invalid or missing." });
          }

        const features = await checkService(url);

        log(`[SUCCESS] Verification completed for URL: ${url} | Veracity: ${features.veracity} | Confidence: ${features.confidence}`, "info");

        return res.status(200).json(features);
    } catch (error) {
        log(`Error checking URL: ${req.body.url} | Message: ${error.message}`, "error");
        return res.status(500).json({ error: "Internal server error." });
    }
};

export default checkNewsController;
