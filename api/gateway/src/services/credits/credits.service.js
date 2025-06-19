const { debug } = require("@config");

class CreditsService {
  constructor({ reader, logger = console } = {}) {
    this.reader = reader;
    this.logger = logger;
  }

  async run(fileName) {
    this.logger.info("Starting reading API and model information...");

    const defaults = {
      name: 'unknown',
      description: 'unknown',
      author: 'unknown',
      contact: 'unknown',
      license: 'unknown',
      technologies: 'unknown',
      code_repository: 'unknown'
    };

    try {
      const response = await this.reader.read(fileName);

      if (!response || typeof response !== 'object') {
        this.logger.warn("Invalid or empty response from package.json reader");
        return defaults;
      }

      this.logger.info("Reading package.json completed");

      if (!response.name || !response.author) {
        this.logger.warn("Important fields missing from package.json (name or author)");
      }

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

      // Cria um novo objeto com apenas as chaves de defaults
      const result = {};
      for (const key in defaults) {
        result[key] = response[key] !== undefined ? response[key] : defaults[key];
      }
      
      return result;
    } catch (error) {
      this.logger.error(`Error getting API/model information: ${error.message}`);
      return defaults;
    }
  }
}

module.exports = { CreditsService };