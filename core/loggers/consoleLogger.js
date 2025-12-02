/**
 * Console logger implementation
 * @module core/loggers/consoleLogger
 */

import { formatObject } from '../formatters/objectFormatter.js';
import { validateInput } from '../utils/validate.js';
import styles from '../styles.js';

/**
 * Log levels and their priorities
 * @type {Object}
 */
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

let currentLogLevel = LOG_LEVELS.INFO;

/**
 * Create a logger with the specified styles
 * @param {...string} styleNames - Names of styles to apply
 * @returns {Function} Logger function
 */
const createLogger = (...styleNames) => {
  // Get style codes
  const styleCodes = styleNames.map((name) => {
    if (!styles[name]) {
      console.warn(`LogColor: Unknown style "${name}"`);
      return '';
    }
    return styles[name];
  });

  const stylePrefix = styleCodes.join('');

  /**
   * Logger function
   * @param {...*} args - Arguments to log
   */
  const logger = (...args) => {
    try {
      // Vérifier le niveau de log
      let logLevel = LOG_LEVELS.INFO;
      if (styleNames.includes('dim')) {
        logLevel = LOG_LEVELS.DEBUG;
      } else if (styleNames.includes('yellow')) {
        logLevel = LOG_LEVELS.WARN;
      } else if (styleNames.includes('red')) {
        logLevel = LOG_LEVELS.ERROR;
      }

      if (logLevel < currentLogLevel) return;

      const validArgs = validateInput(args);

      // Handle template strings
      if (typeof validArgs[0] === 'string' && validArgs.length > 1) {
        const message = formatMessage(validArgs[0], validArgs.slice(1));
        console.log(`${stylePrefix}${message}${styles.reset}`);
      } else {
        // Format each argument
        const formattedArgs = validArgs.map((arg) => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'object' || Array.isArray(arg)) {
            return formatObject(arg);
          }
          if (typeof arg === 'string') return arg;
          return String(arg);
        });

        // Handle multi-line output
        const output = formattedArgs.join(' ').split('\n').join('\n  ');
        console.log(`${stylePrefix}${output}${styles.reset}`);
      }
    } catch (error) {
      console.error(`${styles.red}LogColor: Logging error - ${error.message}${styles.reset}`);
    }
  };

  // Add style methods for method chaining
  Object.keys(styles).forEach((styleName) => {
    Object.defineProperty(logger, styleName, {
      get: () => createLogger(...styleNames, styleName),
    });
  });

  return logger;
};

/**
 * Format a message with placeholders
 * @param {string} message - Message with {0}, {1}, etc. placeholders
 * @param {Array} values - Values to replace placeholders
 * @returns {string} Formatted message
 */
const formatMessage = (message, values = []) => {
  if (typeof message !== 'string' || !Array.isArray(values)) {
    return String(message);
  }

  return message.replace(/\{(\d+)\}/g, (match, index) => {
    const value = values[parseInt(index, 10)];
    if (value === undefined) return match;

    if (typeof value === 'object' || Array.isArray(value)) {
      return formatObject(value);
    }

    return String(value);
  });
};

/**
 * Set the current log level
 * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR, NONE)
 */
const setLogLevel = (level) => {
  const upperLevel = level.toUpperCase();
  if (LOG_LEVELS[upperLevel] !== undefined) {
    currentLogLevel = LOG_LEVELS[upperLevel];
  } else {
    console.warn(`LogColor: Unknown log level "${level}". Using INFO.`);
    currentLogLevel = LOG_LEVELS.INFO;
  }
};

// Create default loggers
const log = createLogger();
const debug = createLogger('dim');
const info = createLogger('cyan');
const warn = createLogger('yellow');
const error = createLogger('red');

// Export everything
export { createLogger, formatMessage, setLogLevel, log, debug, info, warn, error, LOG_LEVELS };

export default {
  createLogger,
  formatMessage,
  setLogLevel,
  log,
  debug,
  info,
  warn,
  error,
  LOG_LEVELS,
};
