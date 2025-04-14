import readJson from '../utils/jsonReader.js';

/**
 * Gathers version information from the model and the API package.
 * @returns {Promise<{ apiVersion: string, modelVersion: string }>} Version info.
 */
const infoService = async () => {
  const modelJson = await readJson('text_processor/model/model_metadata.json');
  const packageJson = await readJson('node/package.json');

  const modelVersion = modelJson?.version || 'unknown';
  const apiVersion = packageJson?.version || 'unknown';

  return { apiVersion, modelVersion };
};

export default infoService;
