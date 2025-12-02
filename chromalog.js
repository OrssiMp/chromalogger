/**
 * Chromalog - A colorful console logger with formatting and styling
 * @module chromalog
 */

// Import core modules
import * as styles from './core/styles.js';

// Import logger functions
import {
  createLogger,
  formatMessage,
  setLogLevel,
  LOG_LEVELS,
} from './core/loggers/consoleLogger.js';

// Import formatters
import { formatObject } from './core/formatters/objectFormatter.js';

// Import chroma utility
import chroma from './utils/chroma.js';

// Create default logger instances
const log = createLogger();
const debug = createLogger('dim');
const info = createLogger('blue');
const warn = createLogger('yellow');
const error = createLogger('red');

// Main chromalog object
const chromalog = {
  // Core
  styles,
  chroma,

  // Main logger methods
  createLogger,
  formatMessage,
  formatObject,
  setLogLevel,

  // Log levels
  LOG_LEVELS,

  // Pre-configured loggers
  log,
  debug,
  info,
  warn,
  error,
};

// Export everything
export {
  // Core
  styles,
  chroma,

  // Main logger methods
  createLogger,
  formatMessage,
  formatObject,
  setLogLevel,

  // Log levels
  LOG_LEVELS,

  // Pre-configured loggers
  log,
  debug,
  info,
  warn,
  error,

  // Default export
  chromalog as default,
};
