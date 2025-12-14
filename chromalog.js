// ChromaLogger - A colorful console logger for Node.js

// Import styles
import { 
  textColors, 
  bgColors, 
  textStyles 
} from './styles/index.js';

// Combine all styles for backward compatibility
const colors = {
  ...textColors,
  ...bgColors,
  ...textStyles
};

// Main logger class
class Logger {
  constructor() {
    this.timestamp = false;
  }

  // Format the log message with color and style
  format(style, ...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    // Si style est un tableau, on combine les styles
    const styleStr = Array.isArray(style) 
      ? style.join('') 
      : style;
    return `${timestamp}${styleStr}${args.join(' ')}${colors.reset}`;
  }

  // Log methods with different colors
  log(...args) {
    console.log(this.format(colors.reset, ...args));
  }

  info(...args) {
    console.log(this.format(colors.cyan, ...args));
  }

  success(...args) {
    console.log(this.format(colors.green, '✓', ...args));
  }

  warn(...args) {
    console.warn(this.format(colors.yellow, '⚠', ...args));
  }

  error(...args) {
    console.error(this.format(colors.red, '✗', ...args));
  }

  // Background color methods
  bgBlack(...args) { 
    this._currentBg = colors.bgBlack;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgRed(...args) { 
    this._currentBg = colors.bgRed;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgGreen(...args) { 
    this._currentBg = colors.bgGreen;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgYellow(...args) { 
    this._currentBg = colors.bgYellow;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgBlue(...args) { 
    this._currentBg = colors.bgBlue;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgMagenta(...args) { 
    this._currentBg = colors.bgMagenta;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgCyan(...args) { 
    this._currentBg = colors.bgCyan;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }
  
  bgWhite(...args) { 
    this._currentBg = colors.bgWhite;
    if (args.length > 0) {
      console.log(this.format(this._currentBg, ...args));
      this._currentBg = undefined;
    }
    return this;
  }

  // Text color methods
  black(...args) { return this._applyTextColor(colors.black, ...args); }
  red(...args) { return this._applyTextColor(colors.red, ...args); }
  green(...args) { return this._applyTextColor(colors.green, ...args); }
  yellow(...args) { return this._applyTextColor(colors.yellow, ...args); }
  blue(...args) { return this._applyTextColor(colors.blue, ...args); }
  magenta(...args) { return this._applyTextColor(colors.magenta, ...args); }
  cyan(...args) { return this._applyTextColor(colors.cyan, ...args); }
  white(...args) { return this._applyTextColor(colors.white, ...args); }
  
  // Text style methods
  bright(...args) { return this._applyTextStyle(colors.bright, ...args); }
  dim(...args) { return this._applyTextStyle(colors.dim, ...args); }
  italic(...args) { return this._applyTextStyle(colors.italic, ...args); }
  underline(...args) { return this._applyTextStyle(colors.underline, ...args); }
  blink(...args) { return this._applyTextStyle(colors.blink, ...args); }
  reverse(...args) { return this._applyTextStyle(colors.reverse, ...args); }
  hidden(...args) { return this._applyTextStyle(colors.hidden, ...args); }
  
  // Helper methods for chaining
  _applyTextColor(color, ...args) {
    this._currentFg = color;
    if (args.length > 0) {
      this._logWithCurrentStyles(...args);
    }
    return this;
  }
  
  _applyTextStyle(style, ...args) {
    if (!this._currentStyles) this._currentStyles = [];
    this._currentStyles.push(style);
    if (args.length > 0) {
      this._logWithCurrentStyles(...args);
    }
    return this;
  }
  
  _logWithCurrentStyles(...args) {
    const styles = [];
    if (this._currentBg) styles.push(this._currentBg);
    if (this._currentFg) styles.push(this._currentFg);
    if (this._currentStyles) styles.push(...this._currentStyles);
    
    console.log(this.format(styles, ...args));
    
    // Reset styles after logging
    this._currentBg = undefined;
    this._currentFg = undefined;
    this._currentStyles = [];
  }

  // Combined styles
  errorHighlight(...args) {
    console.error(this.format([colors.bright, colors.bgRed, colors.white], '✗', ...args));
  }

  successHighlight(...args) {
    console.log(this.format([colors.bright, colors.bgGreen, colors.black], '✓', ...args));
  }

  warningHighlight(...args) {
    console.warn(this.format([colors.bright, colors.bgYellow, colors.black], '⚠', ...args));
  }

  infoHighlight(...args) {
    console.log(this.format([colors.bright, colors.bgBlue, colors.white], 'ℹ', ...args));
  }

  // Enable/disable timestamps
  setTimestamp(enabled = true) {
    this.timestamp = enabled;
    return this;
  }
}

// Create a default logger instance
const logger = new Logger();

// Export the logger class and default instance
export { Logger, logger };

export default logger;
