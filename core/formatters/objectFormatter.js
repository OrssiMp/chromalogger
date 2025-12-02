/**
 * Object formatting utilities
 * @module core/formatters/objectFormatter
 */

import { isObject } from '../utils/validate.js';

/**
 * Format an object for display
 * @param {Object} obj - Object to format
 * @param {number} [depth=0] - Current depth for indentation
 * @returns {string} Formatted object string
 */
export const formatObject = (obj, depth = 0) => {
  const indent = '  '.repeat(depth);
  const nextIndent = '  '.repeat(depth + 1);

  try {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    if (!isObject(obj)) return String(obj);

    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';

    // For small objects, keep on one line
    if (entries.every(([_, value]) => !isObject(value) || value === null)) {
      const content = entries
        .map(([key, value]) => `${key}: ${formatValue(value, depth + 1)}`)
        .join(', ');
      return `{ ${content} }`;
    }

    // For larger or complex objects, use multiple lines
    const content = entries
      .map(([key, value]) => `${nextIndent}${key}: ${formatValue(value, depth + 1)}`)
      .join(',\n');

    return `{\n${content}\n${indent}}`;
  } catch (error) {
    return '[Object]';
  }
};

/**
 * Format a value for display
 * @param {*} value - Value to format
 * @param {number} [depth=0] - Current depth for indentation
 * @returns {string} Formatted value
 */
const formatValue = (value, depth = 0) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  switch (typeof value) {
    case 'string':
      return `"${value}"`;
    case 'object':
      if (Array.isArray(value)) {
        return formatArray(value, depth);
      }
      return formatObject(value, depth);
    case 'function':
      return '[Function]';
    case 'symbol':
      return value.toString();
    default:
      return String(value);
  }
};

/**
 * Format an array for display
 * @param {Array} arr - Array to format
 * @param {number} [depth=0] - Current depth for indentation
 * @returns {string} Formatted array string
 */
const formatArray = (arr, depth = 0) => {
  if (!Array.isArray(arr)) return '[]';
  if (arr.length === 0) return '[]';

  const indent = '  '.repeat(depth);
  const nextIndent = '  '.repeat(depth + 1);

  // For small arrays, keep on one line
  if (arr.length <= 3 && arr.every((item) => !isObject(item) || item === null)) {
    return `[ ${arr.map((item) => formatValue(item, depth + 1)).join(', ')} ]`;
  }

  // For larger or complex arrays, use multiple lines
  const items = arr.map((item) => `${nextIndent}${formatValue(item, depth + 1)}`).join(',\n');

  return `[\n${items}\n${indent}]`;
};

export default {
  formatObject,
  formatArray,
  formatValue,
};
