const { PathHelper } = require("./pathManager.js");
const { readFile } = require("fs/promises");

class JsonReader {
  constructor({ reader = readFile, pathHelper = PathHelper.pathFromRoot, logger = console } = {}) {
    this.reader = reader;
    this.pathHelper = pathHelper;
    this.logger = logger;
  }

  async read(file) {
    try {
      const fullPath = this.pathHelper(file);

      this.logger.info(`Attempting to read JSON from: ${fullPath}`);

      const data = await this.reader(fullPath, "utf-8");

      this.logger.info(`Successfully read JSON from: ${fullPath}`);

      return JSON.parse(data);
    } catch(error) {
      this.logger.error(`Failed to read or parse JSON from ${file}: ${error.message}`);
      return {};
    }
  }
}

module.exports = { JsonReader };
