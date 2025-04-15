import checkService from "../services/checkService.js";

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
            return res.status(400).json({ error: "The provided URL is invalid or missing." });
        }

        const features = await checkService(url);

        return res.status(200).json(features);
    } catch (error) {
        console.error("Error while verifying news:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export default checkNewsController;
