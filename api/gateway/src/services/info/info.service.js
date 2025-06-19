const { debug } = require("@config");

class InfoService {
  constructor({ reader, logger = console } = {}) {
    this.reader = reader;
    this.logger = logger;
  }

  async run(fileName) {
    this.logger.info("Starting reading API and model information...");

    const defaults = {
      version: 'unknown',
      framework: 'unknown',
      model_architecture: 'unknown',
      license: 'unknown'
    };

    try {
      const response = await this.reader.read(fileName);

      this.logger.info("Reading package.json completed");

      if (debug) {
        const verboseMethod = typeof this.logger.verbose === "function"
          ? "verbose"
          : "warn";
        this.logger[verboseMethod](
          `Contents of package.json: ${JSON.stringify(response, null, 2)}`
        );
      }

      if (!response.version) {
        this.logger.warn("API version not found");
      }

      const result = Object.keys(defaults).reduce((acc, key) => {
        const fallbackStrategies = {
          version: () => response.version || defaults.version,
          framework: () => response.model_metadata?.framework || defaults.framework,
          model_architecture: () => 
            response.model_metadata?.model_architecture || response.architecture || defaults.model_architecture,
          license: () => response.license || defaults.license
        };

        acc[key] = fallbackStrategies[key]();
        return acc;
      }, {});

      return result;
    } catch (error) {
      this.logger.error(`Error getting API/model information: ${error.message}`);
      return defaults;
    }
  }
}

module.exports = { InfoService };