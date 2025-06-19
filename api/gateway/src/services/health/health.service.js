class HealthService {
    constructor({ logger = console, ...inspectors } = {}) {
        this.inspectors = inspectors;
        this.logger = logger;
    }

    async run() {
        this.logger.info("Starting system health check...");
        const inspectors = Object.values(this.inspectors);

        const [internet, scraper, systemResources, model] = await Promise.all(
            inspectors.map(inspector => inspector())
        );

        const allChecks = {
            internet,
            scraper,
            systemResources,
            model
        };

        this.logger[internet.status === "success" ? "info" : "warn"](`Internet check: ${internet.status} - ${internet.message}`);
        this.logger[scraper.status === "success" ? "info" : "warn"](`Scraper check: ${scraper.status} - ${scraper.message}`);
        this.logger[systemResources.status === "success" ? "info" : "warn"](`System check: ${systemResources.status} - ${systemResources.message}`);
        this.logger[model.status === "success" ? "info" : "warn"](`Model check: ${model.status} - ${model.message}`);

        const overallStatus = Object.values(allChecks).every(check => check.status === 'success')
            ? 'healthy'
            : 'unhealthy';

        this.logger[overallStatus === "healthy" ? "info" : "error"](`Overall system status: ${overallStatus.toUpperCase()}`);

        return {
            status: overallStatus,
            checks: allChecks
        };
    }
}


module.exports = { HealthService };
