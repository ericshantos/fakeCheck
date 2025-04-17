import {
    checkInternetConnection,
    checkScraper,
    checkSystemResources,
    checkModel
} from "../utils/healthUtils.js";

/**
 * Performs a full health check of the application by running individual diagnostics:
 * - Internet connectivity
 * - HTML scraper functionality
 * - System resource availability
 * - Machine learning model prediction
 *
 * @async
 * @function
 * @returns {Promise<{
 *   status: 'healthy' | 'unhealthy',
 *   checks: {
 *     internet: { status: string, message: string },
 *     scraper: { status: string, message: string },
 *     systemResources: { status: string, message: string },
 *     model: { status: string, message: string }
 *   }
 * }>} Consolidated health status and details of each check.
 */
const healthService = async () => {
    const [internet, scraper, model] = await Promise.all([
        checkInternetConnection(),
        checkScraper(),
        checkModel()
    ]);

    const systemResources = checkSystemResources();

    const allChecks = {
        internet,
        scraper,
        systemResources,
        model
    };

    const overallStatus = Object.values(allChecks).every(check => check.status === 'success')
        ? 'healthy'
        : 'unhealthy';

    return {
        status: overallStatus,
        checks: allChecks
    };
};

export default healthService;
