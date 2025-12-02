/**
 * ChromaLog - A powerful console logger with rich formatting and styling
 * @module chromalog
 * @example
 * // Importation de base
 * import chromalog from './index.js';
 *
 * // Utilisation des loggers prédéfinis
 * chromalog.info('Message informatif');
 * chromalog.error('Erreur critique!');
 *
 * // Création d'un logger personnalisé
 * const myLogger = chromalog.createLogger('green', 'underline');
 * myLogger('Message personnalisé');
 */

// Import core modules
import * as styles from './core/styles.js';
import {
  createLogger,
  formatMessage,
  setLogLevel,
  LOG_LEVELS,
} from './core/loggers/consoleLogger.js';
import { formatObject } from './core/formatters/objectFormatter.js';

/**
 * Logger de base sans style particulier
 * @type {Function}
 */
const log = createLogger();

/**
 * Logger pour les messages de débogage (style atténué)
 * @type {Function}
 */
const debug = createLogger('dim');

/**
 * Logger pour les messages informatifs (style cyan)
 * @type {Function}
 */
const info = createLogger('cyan');

/**
 * Logger pour les avertissements (style jaune)
 * @type {Function}
 */
const warn = createLogger('yellow');

/**
 * Logger pour les erreurs (style rouge)
 * @type {Function}
 */
const error = createLogger('red');

// Export par défaut avec toutes les fonctionnalités
const ChromaLog = {
  // Core
  styles,

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

export default ChromaLog;

// Export nommé pour l'import déstructuré
export {
  // Core
  styles,

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
