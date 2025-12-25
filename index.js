// Import and re-export the logger from chromalog.js
export * from './modules/chromalog.js';

// Set default export to be the default logger instance
import { logger } from './modules/chromalog.js';
export default logger;
