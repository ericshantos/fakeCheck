import creditsService from "../services/credits.service.js";
import { log } from "../utils/logger.js";

/**
 * Controller to handle requests for project credits metadata.
 *
 * @param {import('express').Request} req - The HTTP request object.
 * @param {import('express').Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const creditsController = async (req, res) => {
    try {
        const credits = await creditsService();

        log("[SUCCESS] /credits - Metadata returned successfully", "info");

        res.status(200).json(credits);
    } catch (error) {
        log(`/credits - Failed to retrieve credits: ${error.message}`, "error");
        res.status(500).json({ error: "Failed to retrieve project credits." });
    }
};

export default creditsController;
