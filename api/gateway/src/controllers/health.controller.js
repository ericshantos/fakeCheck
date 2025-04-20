import healthService from "../services/health.service.js";

/**
 * Controller responsible for handling the /health route.
 * It gathers health check information and sends the appropriate response.
 *
 * @async
 * @function
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response containing health check status and details.
 */
const healthController = async (req, res) => {
    try {
        const report = await healthService();

        const httpStatus = report.status === 'healthy' ? 200 : 503;

        res.status(httpStatus).json(report);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred in healthController.',
            details: error.message
        });
    }
};

export default healthController;
