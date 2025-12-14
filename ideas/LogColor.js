/**
 * @fileoverview A simple and colorful logger for Node.js console
 * @module LogColor
 * @version 1.0.0
 */

// ANSI escape codes for colors and styles
const styles = {
  // Text colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',

  // Text styles
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  // Reset
  reset: '\x1b[0m',
};

/**
 * Format a message for display
 * @param {*} message - Message to format
 * @param {Array} rest - Additional parameters (for template strings)
 * @returns {string} Formatted message
 */
const formatMessage = (message, rest = []) => {
  if (typeof message === 'string' && rest.length > 0) {
    return message.replace(/\{(\d+)\}/g, (match, index) => {
      const i = parseInt(index, 10);
      return formatValue(rest[i] || '');
    });
  }
  return formatValue(message);
};

/**
 * Format an object or array for display
 * @param {*} obj - Object or array to format
 * @param {number} [depth=0] - Current depth for indentation
 * @returns {string} Formatted representation
 */
const formatObject = (obj, depth = 0) => {
  const indent = '  '.repeat(depth);
  const nextIndent = '  '.repeat(depth + 1);

  try {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';

    // Handle arrays
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';

      // For small arrays, keep on one line
      if (
        obj.length <= 3 &&
        obj.every(
          (item) =>
            typeof item !== 'object' || item === null || (Array.isArray(item) && item.length === 0)
        )
      ) {
        return `[${obj.map((item) => formatValue(item, depth + 1)).join(', ')}]`;
      }

      // For larger or complex arrays, use multiple lines
      return `[
${nextIndent}${obj.map((item) => formatValue(item, depth + 1)).join(`,\n${nextIndent}`)}
${indent}]`;
    }

    // Handle objects
    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';

      // For small objects, keep on one line
      if (
        entries.every(
          ([_, value]) =>
            typeof value !== 'object' ||
            value === null ||
            (Array.isArray(value) && value.length === 0)
        )
      ) {
        const content = entries
          .map(([key, value]) => `${key}: ${formatValue(value, depth + 1)}`)
          .join(', ');
        return `{ ${content} }`;
      }

      // For larger or complex objects, use multiple lines
      const content = entries
        .map(([key, value]) => `${key}: ${formatValue(value, depth + 1)}`)
        .join(`,\n${nextIndent}`);
      return `{\n${nextIndent}${content}\n${indent}}`;
    }

    return String(obj);
  } catch (error) {
    return '[Object]';
  }
};

/**
 * Format a value for display
 * @param {*} value - Value to format
 * @param {WeakSet} [seen] - Set to track visited objects (internal)
 * @param {number} [depth=0] - Current nesting level (for indentation)
 * @returns {string} Formatted value
 */
const formatValue = (value, seen = new WeakSet(), depth = 0) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  const type = typeof value;

  if (type === 'string') return `"${value}"`;
  if (type !== 'object') return String(value);

  if (value instanceof Date) return value.toISOString();
  if (value instanceof RegExp) return value.toString();

  // Handle circular references
  if (seen.has(value)) return '[Circular]';
  seen.add(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => formatValue(item, seen, depth + 1));
    return `[ ${items.join(', ')} ]`;
  }

  // Handle plain objects
  const entries = Object.entries(value);
  if (entries.length === 0) return '{}';

  const indent = '  '.repeat(depth + 1);
  const formatted = entries.map(([key, val]) => {
    return `\n${indent}${key}: ${formatValue(val, seen, depth + 1)}`;
  });

  return `{${formatted.join(',')}\n${'  '.repeat(depth)}}`;
};

/**
 * Validate input arguments
 * @param {Array} args - Arguments to validate
 * @returns {Array} Validated arguments
 * @throws {Error} If no arguments are provided
 */
const validateInput = (args) => {
  if (args.length === 0) {
    throw new Error('No message to log');
  }

  // Filter out undefined or null arguments
  const filteredArgs = args.filter((arg) => arg !== undefined && arg !== null);

  // If all arguments are filtered out, keep the first one
  return filteredArgs.length > 0 ? filteredArgs : [args[0]];
};

/**
 * Create a logger function with specified styles
 * @param {...string} styleNames - Names of styles to apply
 * @returns {Function} Logger function with styles applied
 */
const createLogger = (...styleNames) => {
  const styleCodes = styleNames.map((name) => {
    if (!styles[name]) {
      console.warn(`LogColor: Style inconnu "${name}"`);
      return '';
    }
    return styles[name];
  });

  const stylePrefix = styleCodes.join('');

  const logger = (...args) => {
    try {
      const validArgs = validateInput(args);

      // Si c'est un template string (premier argument est une chaîne avec des placeholders)
      if (typeof validArgs[0] === 'string' && validArgs.length > 1) {
        const message = formatMessage(validArgs[0], validArgs.slice(1));
        console.log(`${stylePrefix}${message}${styles.reset}`);
      } else {
        // Pour chaque argument, formater les objets/tableaux et les chaînes
        const formattedArgs = validArgs.map((arg) => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'object' || Array.isArray(arg)) {
            return formatObject(arg);
          }
          if (typeof arg === 'string') return arg;
          return String(arg);
        });

        // Afficher chaque argument sur une nouvelle ligne s'il contient des retours à la ligne
        const output = formattedArgs.join(' ').split('\n').join('\n  ');
        console.log(`${stylePrefix}${output}${styles.reset}`);
      }
    } catch (error) {
      console.error(
        `${styles.red}LogColor: Erreur lors du logging - ${error.message}${styles.reset}`
      );
    }
  };

  // Ajouter les méthodes de style directement sur la fonction logger pour permettre le chaînage
  Object.keys(styles).forEach((styleName) => {
    Object.defineProperty(logger, styleName, {
      get: () => createLogger(...styleNames, styleName),
    });
  });

  return logger;
};

// Basic color methods
const red = createLogger('red');
const green = createLogger('green');
const yellow = createLogger('yellow');
const blue = createLogger('blue');
const magenta = createLogger('magenta');
const cyan = createLogger('cyan');
const white = createLogger('white');
const gray = createLogger('dim', 'white');

// Background colors
const bgBlack = createLogger('bgBlack');
const bgRed = createLogger('bgRed');
const bgGreen = createLogger('bgGreen');
const bgYellow = createLogger('bgYellow');
const bgBlue = createLogger('bgBlue');
const bgMagenta = createLogger('bgMagenta');
const bgCyan = createLogger('bgCyan');
const bgWhite = createLogger('bgWhite');

// Text styles
const bold = createLogger('bold');
const dim = createLogger('dim');
const italic = createLogger('italic');
const underline = createLogger('underline');
const blink = createLogger('blink');
const reverse = createLogger('reverse');
const hidden = createLogger('hidden');

// Log levels
let currentLogLevel = 'INFO'; // Default log level

/**
 * Set the current log level
 * @param {string} level - Log level ('ERROR', 'WARN', 'INFO', 'DEBUG')
 */
const setLogLevel = (level) => {
  const validLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
  const upperLevel = level.toUpperCase();

  if (!validLevels.includes(upperLevel)) {
    console.warn(`LogColor: Invalid log level "${level}". Using default: "INFO"`);
    return;
  }

  currentLogLevel = upperLevel;
};

// Log level methods
const logDebug = createLogger('dim');
const logInfo = createLogger('cyan');
const logWarn = createLogger('yellow', 'bold');
const logError = createLogger('red', 'bold');

/**
 * Main LogColor object containing all logging methods
 * @namespace LogColor
 */
const LogColor = {
  // Basic colors
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,

  // Background colors
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,

  // Text styles
  bold,
  dim,
  italic,
  underline,
  blink,
  reverse,
  hidden,

  // Log levels
  setLogLevel,
  get logLevel() {
    return currentLogLevel;
  },

  // Logging methods with level checking
  debug: (...args) => {
    if (['DEBUG'].includes(currentLogLevel)) {
      logDebug(...args);
    }
  },

  info: (...args) => {
    if (['DEBUG', 'INFO'].includes(currentLogLevel)) {
      logInfo(...args);
    }
  },

  warn: (...args) => {
    if (['DEBUG', 'INFO', 'WARN'].includes(currentLogLevel)) {
      logWarn(...args);
    }
  },

  error: (...args) => {
    // Always show errors
    logError(...args);
  },

  // Alias for error
  danger: (...args) => logError(...args),

  // Utility methods
  createLogger,
  formatMessage,
  formatObject,
  formatValue,
  validateInput,
};

// Export the LogColor object
export default LogColor;

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LogColor;
}
