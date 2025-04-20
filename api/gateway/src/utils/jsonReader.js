import { readFile } from 'fs/promises';
import PathHelper from './pathManager.js';
import { log } from "./logger.js";

/**
 * Reads and parses a JSON file from a relative path.
 * @param {string} filePath - The relative path to the JSON file.
 * @returns {Promise<Object>} Parsed JSON object, or an empty object on error.
 */
const readJson = async (filePath) => {
  try {
    const fullPath = PathHelper.pathFromRoot(filePath);

    log(`Attempting to read JSON from: ${fullPath}`, "info");

    const data = await readFile(fullPath, 'utf-8');
    
    log(`Successfully read JSON from: ${fullPath}`, "info");

    return JSON.parse(data);
  } catch (error) {
    log(`Failed to read or parse JSON from ${filePath}: ${error.message}`, "error");
    return {};
  }
};

export default readJson;
