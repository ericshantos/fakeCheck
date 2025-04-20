import readJson from '../utils/jsonReader.js';

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
  const defaults = {
    version: 'unknown',
    framework: 'unknown',
    model_architecture: 'unknown',
    license: 'unknown'
  };

  try {
    const modelJson = await readJson('metadatas/model_metadata.json') || {};
    const packageJson = await readJson('package.json') || {};
    
    return {
      api_version: packageJson.version || defaults.version,
      model_version: modelJson.version || defaults.version,
      framework: modelJson.framework || defaults.framework,
      model_architecture: modelJson.model_architecture || defaults.model_architecture,
      license: modelJson.license || defaults.license
    };
  } catch (error) {
    console.error('Error in infoService:', error);
    return {
      api_version: defaults.version,
      model_version: defaults.version,
      framework: defaults.framework,
      model_architecture: defaults.model_architecture,
      license: defaults.license
    };
  }
};

export default infoService;
