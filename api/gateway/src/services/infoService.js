import readJson from '../utils/jsonReader.js';

/**
 * Gathers version and metadata information from the machine learning model and the API package.
 *
 * @async
 * @function infoService
 * @returns {Promise<{
 *   apiVersion: string,
 *   modelVersion: string,
 *   lastUpdate: string,
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
  const modelJson = await readJson('nlp_predictor/model/model_metadata.json');
  const packageJson = await readJson('gateway/package.json');

  const apiVersion = packageJson?.version || 'unknown';

  const modelVersion = modelJson?.version || 'unknown';
  const lastUpdate = modelJson?.training_data.last_update || 'unknown';
  const framework = modelJson?.framework || 'unknown';
  const modelArchitecture = modelJson?.model_architecture || 'unknown';
  const license = modelJson?.license || 'unknown';

  return { apiVersion, modelVersion, lastUpdate, framework, modelArchitecture, license };
};

export default infoService;
