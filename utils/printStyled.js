/**
 * Fonction utilitaire pour afficher du texte avec style
 * @module utils/printStyled
 * @example
 * import printStyled from './utils/printStyled.js';
 * printStyled('Texte en rouge et gras', 'red', 'bright');
 */

import { styles } from '../core/styles.js';

/**
 * Affiche du texte formaté dans la console
 * @param {string} text - Le texte à afficher
 * @param {...string} styleNames - Noms des styles à appliquer
 */
const printStyled = (text, ...styleNames) => {
  const styleCodes = styleNames
    .map((name) => {
      // Vérifier si le style existe directement
      if (styles[name] !== undefined) {
        return styles[name];
      }

      // Gestion des couleurs de fond (ex: 'bgRed')
      if (name.startsWith('bg')) {
        const bgColor = name.substring(2);
        const bgKey = `bg${bgColor.charAt(0).toUpperCase() + bgColor.slice(1)}`;
        return styles[bgKey] || '';
      }

      return '';
    })
    .join('');

  process.stdout.write(`${styleCodes}${text}${styles.reset}\n`);
};

export default printStyled;
