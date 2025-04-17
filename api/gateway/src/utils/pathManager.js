import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Utility class for resolving absolute paths based on the root of the project.
 * Useful for constructing file paths relative to the base directory, regardless of the current working directory.
 *
 * @class PathHelper
 */
export default class PathHelper {
  /**
   * The absolute path to the root directory of the project.
   * It is resolved as two levels up from the current module's directory.
   * This assumes that this file is located at: [projectRoot]/src/utils/PathHelper.js
   *
   * @static
   * @readonly
   * @type {string}
   */
  static ROOT_DIR = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)), 
    '..',
    '..'
  );

  /**
   * Resolves an absolute path from a path relative to the project root.
   *
   * @static
   * @param {string} [relativePath=''] - The relative path from the project root. 
   *   For example: 'data/news.json' will resolve to '[ROOT_DIR]/data/news.json'.
   *
   * @returns {string} The absolute path resolved from the project root.
   *
   * @throws {TypeError} If the provided path is not a string.
   *
   * @example
   * const fullPath = PathHelper.pathFromRoot('config/settings.json');
   * console.log(fullPath); 
   * // Output: /absolute/path/to/project/config/settings.json
   */
  static pathFromRoot(relativePath = '') {
    if (typeof relativePath !== 'string') {
      throw new TypeError('Relative path must be a string');
    }

    return path.resolve(PathHelper.ROOT_DIR, relativePath);
  }
}
