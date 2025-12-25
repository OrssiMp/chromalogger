// Import all style modules
import textColors from './textColors.js';
import bgColors from './bgColors.js';
import textStyles from './textStyles.js';

// Combine all styles for convenience
const styles = {
  ...textColors,
  ...bgColors,
  ...textStyles
};

// Export all style modules
export { textColors, bgColors, textStyles };
export default styles;
