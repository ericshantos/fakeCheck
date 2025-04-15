import creditsService from "../services/creditsService.js";

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
        res.status(200).json(credits);
    } catch (error) {
        console.error("Failed to retrieve credits:", error);
        res.status(500).json({ error: "Failed to retrieve project credits." });
    }
};

export default creditsController;
