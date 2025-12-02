/**
 * ANSI escape codes for colors and styles
 * @module core/styles
 */

export const styles = {
  // Text colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

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
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',
};

// Aliases for common styles
export const colors = {
  // Text colors
  black: styles.black,
  red: styles.red,
  green: styles.green,
  yellow: styles.yellow,
  blue: styles.blue,
  magenta: styles.magenta,
  cyan: styles.cyan,
  white: styles.white,
  gray: styles.gray,

  // Background colors
  bgBlack: styles.bgBlack,
  bgRed: styles.bgRed,
  bgGreen: styles.bgGreen,
  bgYellow: styles.bgYellow,
  bgBlue: styles.bgBlue,
  bgMagenta: styles.bgMagenta,
  bgCyan: styles.bgCyan,
  bgWhite: styles.bgWhite,

  // Styles
  reset: styles.reset,
  bold: styles.bright,
  dim: styles.dim,
  italic: styles.italic,
  underline: styles.underline,
  blink: styles.blink,
  inverse: styles.reverse,
  hidden: styles.hidden,
  strikethrough: styles.strikethrough,
};

export default styles;
