/**
 * Input validation utilities
 * @module core/utils/validate
 */

/**
 * Validate input arguments
 * @param {Array} args - Arguments to validate
 * @returns {Array} Validated arguments
 * @throws {Error} If no arguments are provided
 */
export const validateInput = (args) => {
  if (args.length === 0) {
    throw new Error('No arguments provided');
  }

  return args;
};

/**
 * Check if a value is an object (and not null/array)
 * @param {*} value - Value to check
 * @returns {boolean} True if the value is a non-null object and not an array
 */
export const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Check if a value is a plain object
 * @param {*} value - Value to check
 * @returns {boolean} True if the value is a plain object
 */
export const isPlainObject = (value) => {
  return isObject(value) && Object.prototype.toString.call(value) === '[object Object]';
};

export default {
  validateInput,
  isObject,
  isPlainObject,
};
