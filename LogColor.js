/**
 * @fileoverview A simple and colorful logger for Node.js console
 * @module LogColor
 * @version 1.0.0
 */

/**
 * Logs a message with red color
 * @param {*} message - The message to log
 */
const red = (message) => console.log(`\x1b[31m${message}\x1b[0m`);

/**
 * Alias for red() - logs a message with red color (for error messages)
 * @param {*} message - The message to log
 */
const danger = red;

/**
 * Logs a message with green color
 * @param {*} message - The message to log
 */
const green = (message) => console.log(`\x1b[32m${message}\x1b[0m`);

/**
 * Alias for green() - logs a success message with green color
 * @param {*} message - The success message to log
 */
const success = green;

/**
 * Logs a message with yellow color
 * @param {*} message - The message to log
 */
const yellow = (message) => console.log(`\x1b[33m${message}\x1b[0m`);

/**
 * Logs a message with blue color
 * @param {*} message - The message to log
 */
const blue = (message) => console.log(`\x1b[34m${message}\x1b[0m`);

/**
 * Logs a message with magenta color
 * @param {*} message - The message to log
 */
const magenta = (message) => console.log(`\x1b[35m${message}\x1b[0m`);

/**
 * Logs a message with cyan color
 * @param {*} message - The message to log
 */
const cyan = (message) => console.log(`\x1b[36m${message}\x1b[0m`);

/**
 * Logs a message with white color
 * @param {*} message - The message to log
 */
const white = (message) => console.log(`\x1b[37m${message}\x1b[0m`);

/**
 * Logs a message in bold
 * @param {*} message - The message to log in bold
 */
const bold = (message) => console.log(`\x1b[1m${message}\x1b[0m`);

/**
 * Logs a message with underline
 * @param {*} message - The message to log with underline
 */
const underline = (message) => console.log(`\x1b[4m${message}\x1b[0m`);

/**
 * Main LogColor object containing all logging methods
 * @namespace LogColor
 */
const LogColor = {
  red,
  danger,
  green,
  success,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  bold,
  underline,
};

module.exports = LogColor;