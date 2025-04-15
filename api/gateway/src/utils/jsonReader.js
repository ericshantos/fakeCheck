import { readFile } from 'fs/promises';
import PathHelper from './pathManager.js';

/**
 * Reads and parses a JSON file from a relative path.
 * @param {string} filePath - The relative path to the JSON file.
 * @returns {Promise<Object>} Parsed JSON object, or an empty object on error.
 */
const readJson = async (filePath) => {
  try {
    const data = await readFile(PathHelper.pathFromRoot(filePath), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to read or parse JSON from ${filePath}:`, error.message);
    return {};
  }
};

export default readJson;
