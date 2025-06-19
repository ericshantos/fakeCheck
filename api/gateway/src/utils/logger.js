const { logging } = require("@config");

class Logger {
  constructor(level = logging) {
    this.levels = ['verbose', 'info', 'warn', 'error'];
    this.level = level;
  }

  _setLevel(level) {
    if (this.levels.includes(level)) {
      this.level = level;
    } else {
      console.warn(`[WARN] Nível de log desconhecido: ${level}`);
    }
  }

  log(message, level = 'info') {
    const currentLevel = this.levels.indexOf(this.level);
    const messageLevel = this.levels.indexOf(level);

    if (currentLevel === -1 || messageLevel === -1) {
      console.warn(`[WARN] Nível de log desconhecido usado: ${this.level} ou ${level}`);
      return;
    }

    if (messageLevel >= currentLevel) {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }

  verbose(message) {
    this.log(message, "verbose");
  }

  info(message) {
    this.log(message, "info");
  }

  warn(message) {
    this.log(message, "warn");
  }

  error(message) {
    this.log(message, "error");
  }
}

module.exports = { Logger };
