const { readJson, log } = require("@utils");
const config = require("@config");

/**
 * Gathers version and metadata information from the machine learning 
 * model and the API package.
 *
 * @async
 * @function infoService
 * @returns {Promise<{
 *   apiVersion: string,
 *   modelVersion: string,
 *   framework: string,
 *   modelArchitecture: string,
 *   license: string
 * }>} An object containing:
 * - `apiVersion`: Version of the API defined in `package.json`.
 * - `modelVersion`: Version of the model from `model_metadata.json`.
 * - `lastUpdate`: Date of the last update to the training data.
 * - `framework`: Machine learning framework used to build the model (e.g., TensorFlow, PyTorch).
 * - `modelArchitecture`: Architecture of the model (e.g., LSTM, BERT).
 * - `license`: License information related to the model.
 */
const infoService = async () => {
  log("Starting reading API and model information...", "info");

  const defaults = {
    version: 'unknown',
    framework: 'unknown',
    model_architecture: 'unknown',
    license: 'unknown'
  };

  try {
    const packageJson = await readJson('package.json') || {};
    
    log("Reading package.json completed", "info");

    if (config.debug) log(`Contents of package.json: ${JSON.stringify(packageJson, null, 2)}`, "verbose");

    if (!packageJson.version) {
      log("API version not found", "warn");
    }

    return {
      api_version: packageJson.version || defaults.version,
      model_version: packageJson.model_metadata.version || defaults.version,
      framework: packageJson.model_metadata.framework || defaults.framework,
      model_architecture: packageJson.model_metadata.model_architecture || defaults.model_architecture,
      license: packageJson.license || defaults.license
    };
  } catch (error) {
    log(`Error getting API/model information: ${error.message}`, "error");
    
    return {
      api_version: defaults.version,
      model_version: defaults.version,
      framework: defaults.framework,
      model_architecture: defaults.model_architecture,
      license: defaults.license
    };
  }
};

module.exports = infoService;
