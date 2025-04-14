import { fileURLToPath } from 'url';
import path from 'path';

export default class PathHelper {
  static ROOT_DIR = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)), 
    '..', 
    '..', 
    '..'
  );

  /**
   * Retorna o caminho absoluto a partir da raiz do projeto.
   * @param {string} relativePath - Caminho relativo à raiz.
   * @returns {string} Caminho absoluto.
   */
  static pathFromRoot(relativePath = '') {
    if (typeof relativePath !== 'string') {
      throw new TypeError('Relative path must be a string');
    }

    return path.resolve(PathHelper.ROOT_DIR, relativePath);
  }
}
