// Importation du logger et des styles
import logger from './chromalog.js';

import { textStyles, bgColors, textColors } from './styles/index.js';
// Test des différentes méthodes de log
console.log('\n=== Test des logs basiques ===');
logger.log('Ceci est un message de log standard');
logger.info('Ceci est un message d\'information');
logger.success('Ceci est un message de succès');
logger.warn('Ceci est un avertissement');
logger.error('Ceci est une erreur');

// Test des couleurs d'arrière-plan
console.log('\n=== Test des couleurs d\'arrière-plan ===');
logger.bgBlack('Fond noir');
logger.bgRed('Fond rouge');
logger.bgGreen('Fond vert');
logger.bgYellow('Fond jaune');
logger.bgBlue('Fond bleu');
logger.bgMagenta('Fond magenta');
logger.bgCyan('Fond cyan');
logger.bgWhite('Fond blanc');

// Test des styles de texte
console.log('\n=== Test des styles de texte ===');
logger.bright('Texte en gras');
logger.dim('Texte atténué');
logger.italic('Texte en italique');
logger.underline('Texte souligné');
logger.blink('Texte clignotant');
logger.reverse('Texte inversé');
// logger.hidden('Texte caché'); // Ne sera pas visible

// Test des styles combinés
console.log('\n=== Test des styles combinés ===');
logger.errorHighlight('ERREUR CRITIQUE: Problème critique détecté!');
logger.warningHighlight('ATTENTION: Action requise');
logger.successHighlight('SUCCÈS: Opération réussie!');
logger.infoHighlight('INFO: Information importante');

// Exemple avec combinaison manuelle
console.log('\n=== Test de combinaisons personnalisées ===');
logger.format([textStyles.bright, bgColors.bgMagenta, textColors.white], 'Message personnalisé avec fond magenta');
logger.format([textStyles.underline, bgColors.bgCyan, textColors.black], 'Texte souligné sur fond cyan');

// Exemple avec des tableaux et objets
console.log('\n=== Test avec des structures complexes ===');
const user = {
  id: 1,
  name: 'Alice',
  roles: ['admin', 'user'],
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

logger.info('Détails de l\'utilisateur:', JSON.stringify(user, null, 0));
logger.bgBlue().white('Utilisateur chargé:', user.name);

// Activation des timestamps
console.log('\n=== Test avec timestamps ===');
logger.setTimestamp(true);
logger.info('Ce message a un horodatage');
logger.successHighlight('Succès avec horodatage');

// Désactivation des timestamps
logger.setTimestamp(false);

// Fin des tests
console.log('\n=== Fin des tests ===');
logger.success('Tous les tests sont terminés !');
logger.bgGreen().black().bright(' Merci d\'utiliser ChromaLogger! ');
