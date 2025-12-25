// ChromaLogger - Browser Version
const colors = {
  // Text colors
  black: 'color: #000000',
  red: 'color: #ff0000',
  green: 'color: #00ff00',
  yellow: 'color: #ffff00',
  blue: 'color: #0000ff',
  magenta: 'color: #ff00ff',
  cyan: 'color: #00ffff',
  white: 'color: #ffffff',
  
  // Background colors
  bgBlack: 'background: #000000; color: white',
  bgRed: 'background: #ff0000; color: white',
  bgGreen: 'background: #00ff00; color: black',
  bgYellow: 'background: #ffff00; color: black',
  bgBlue: 'background: #0000ff; color: white',
  bgMagenta: 'background: #ff00ff; color: black',
  bgCyan: 'background: #00ffff; color: black',
  bgWhite: 'background: #ffffff; color: black',
  
  // Text styles
  bright: 'font-weight: bold',
  dim: 'opacity: 0.7',
  italic: 'font-style: italic',
  underline: 'text-decoration: underline',
  blink: 'text-decoration: blink',
  reverse: 'background-color: currentColor; color: #ffffff',
  hidden: 'color: transparent',
  
  // Reset
  reset: ''
};

class Logger {
  constructor() {
    this.timestamp = false;
  }

  setTimestamp(enable = true) {
    this.timestamp = Boolean(enable);
    return this;
  }

  format(style, ...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const styles = Array.isArray(style) ? style : [style];
    const cssStyles = styles.map(s => colors[s] || '').join(';');
    
    // For browser console, we use %c directive for styling
    if (typeof console !== 'undefined') {
      const message = `${timestamp}%c${args.join(' ')}`;
      console.log(message, cssStyles);
    }
    
    return this;
  }

  // Standard log methods
  log(...args) {
    return this.format([], ...args);
  }

  info(...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const message = `ℹ ${args.join(' ')}`;
    console.log(`%c${timestamp}%c${message}`, '', 'background:  #126dff63; padding: 2px 6px; border-radius: 3px;');
    return this;
  }

  success(...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const message = `✓ ${args.join(' ')}`;
    console.log(`%c${timestamp}%c${message}`, '', 'background: rgba(139, 233, 142, 0.2); color: #defcdfff; padding: 2px 6px; border-radius: 3px;');
    return this;
  }

  warn(...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const message = `${timestamp}⚠ ${args.join(' ')}`;
    console.warn('%c' + message, 'color: #ffa500'); // Orange pour les warnings
    return this;
  }

  error(...args) {
    const timestamp = this.timestamp ? `[${new Date().toISOString()}] ` : '';
    const message = `${timestamp}✗ ${args.join(' ')}`;
    console.error('%c' + message, 'font-weight: bold'); // Gras pour les erreurs
    return this;
  }

  // Highlight variants
  infoHighlight(...args) {
    return this.format(['bgBlue', 'white', 'bright'], 'ℹ', ...args);
  }

  successHighlight(...args) {
    return this.format(['bgGreen', 'black', 'bright'], '✓', ...args);
  }

  warningHighlight(...args) {
    return this.format(['bgYellow', 'black', 'bright'], '⚠', ...args);
  }

  errorHighlight(...args) {
    return this.format(['bgRed', 'white', 'bright'], '✗', ...args);
  }
}

// Create a default instance
export const logger = new Logger();

export default logger;
