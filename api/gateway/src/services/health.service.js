const {    
    checkInternetConnection,
    checkScraper,
    checkSystemResources,
    checkModel,
    log
} = require("@utils");

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
    log("Starting system health check...", "info");

    const [internet, scraper, systemResources, model] = await Promise.all([
        checkInternetConnection(),
        checkScraper(),
        checkSystemResources(),
        checkModel()
    ]);

    const allChecks = {
        internet,
        scraper,
        systemResources,
        model
    };

    log(`Internet check: ${internet.status} - ${internet.message}`, internet.status === "success" ? "info" : "warn");
    log(`Scraper check: ${scraper.status} - ${scraper.message}`, scraper.status === "success" ? "info" : "warn");
    log(`System check: ${systemResources.status} - ${systemResources.message}`, systemResources.status === "success" ? "info" : "warn");
    log(`Model check: ${model.status} - ${model.message}`, model.status === "success" ? "info" : "warn");

    const overallStatus = Object.values(allChecks).every(check => check.status === 'success')
        ? 'healthy'
        : 'unhealthy';

    log(`Overall system status: ${overallStatus.toUpperCase()}`, overallStatus === "healthy" ? "info" : "error");

    return {
        status: overallStatus,
        checks: allChecks
    };
};

module.exports = healthService;
