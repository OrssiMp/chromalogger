// Fonction utilitaire pour afficher du texte avec style
import { styles } from '../core/styles.js';
const printStyled = (text, ...styleNames) => {
  // Récupérer les codes de style
  const styleCodes = styleNames
    .map((name) => {
      // Vérifier si le style existe directement dans styles
      if (styles[name] !== undefined) {
        return styles[name];
      }

      // Essayer avec le préfixe 'bg' pour les couleurs de fond
      if (name.startsWith('bg')) {
        const bgColor = name.substring(2);
        const bgKey = `bg${bgColor.charAt(0).toUpperCase() + bgColor.slice(1)}`;
        if (styles[bgKey] !== undefined) {
          return styles[bgKey];
        }
      }

      return '';
    })
    .join('');

  // Afficher le texte avec les styles et réinitialiser à la fin
  process.stdout.write(`${styleCodes}${text}${styles.reset}\n`);
};
