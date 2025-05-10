const path = require("path");
const { log } = require("./logger");

/**
 * Utility class for resolving absolute paths based on the root of the project.
 */
class PathHelper {
  /**
   * The absolute path to the root directory of the project.
   */
  static ROOT_DIR = path.resolve(__dirname, '..', '..');

  /**
   * Resolves an absolute path from a path relative to the project root.
   */
  static pathFromRoot(relativePath = '') {
    try {
      if (typeof relativePath !== 'string') {
        throw new TypeError('Relative path must be a string');
      }

      const fullPath = path.resolve(PathHelper.ROOT_DIR, relativePath);
      log(`Resolved absolute path: ${fullPath}`, "info");
      return fullPath;
    } catch (error) {
      log(`Error resolving path: ${error.message}`, "error");
      throw error;
    }
  }
}

module.exports = { PathHelper };
