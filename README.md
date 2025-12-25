# ChromaLogger

> A powerful and colorful logger for Node.js with advanced formatting

## Installation

```bash
npm install chromalogger
```

## Basic Usage

```javascript
import { logger } from 'chromalogger';

// Basic logging
logger.info('This is an info message');
logger.success('Operation completed successfully!');
logger.warn('This is a warning');
logger.error('An error occurred');
```

## Advanced Formatting

ChromaLogger provides a flexible `format()` method for custom styling:

```javascript
// Single style
logger.format(colors.red, 'This text will be red');

// Multiple styles combined
logger.format(
  [colors.bold, colors.bgBlue, colors.white], 
  'Bold white text on blue background'
);

// With timestamps
logger.setTimestamp(true);
logger.format(colors.green, 'This will include a timestamp');

// Create reusable themes
const errorTheme = [colors.bright, colors.red];
const successTheme = [colors.bright, colors.green];

logger.format(errorTheme, 'Error: Something went wrong!');
logger.format(successTheme, 'Success: Operation completed!');
```

### Available Styles

ChromaLogger includes several built-in styles:

- **Text Colors**: black, red, green, yellow, blue, magenta, cyan, white
- **Background Colors**: bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
- **Text Styles**: bright, dim, italic, underline, blink, reverse, hidden

## Features

- Colorful console output
- Advanced formatting options
- Optional timestamps
- Reusable style themes

## License

MIT
