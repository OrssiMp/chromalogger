/**
 * Test de la bibliothèque LogColor
 * Ce fichier démontre les différentes fonctionnalités de LogColor
 */

// Import du module principal Chromalog
import chromalog from './index.js';

// Alias pour les propriétés
const { createLogger, setLogLevel, log, debug, info, warn, error } = chromalog;

// ========================================
// 1. Test des styles de base
// ========================================
const title = createLogger('bright');
const redText = createLogger('red');
const greenText = createLogger('green');
const blueText = createLogger('blue');
const highlightText = createLogger('black', 'bgYellow');
const bold = createLogger('bright');
const underlineText = createLogger('underline');

console.log();
title('=== 1. Test des styles de base ===');
redText('Texte en rouge');
greenText('Texte en vert');
blueText('Texte en bleu');
highlightText('Texte noir sur fond jaune');
bold('Texte en gras');
underlineText('Texte souligné');

// ========================================
// 2. Test des loggers prédéfinis
// ========================================
console.log('\n=== 2. Test des loggers prédéfinis ===');
log('Message de log standard');
debug('Message de débogage');
info("Message d'information");
warn("Message d'avertissement");
error("Message d'erreur");

// ========================================
// 3. Test du formatage d'objets
// ========================================
console.log("\n=== 3. Test du formatage d'objets ===");
const utilisateur = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
  actif: true,
  roles: ['admin', 'utilisateur'],
  preferences: {
    theme: 'sombre',
    notifications: true,
    langue: 'fr',
  },
};

info('Utilisateur:', utilisateur);

// ========================================
// 4. Test des templates
// ========================================
console.log('\n=== 4. Test des templates ===');
const nom = 'Alice';
const age = 31;
info('Bonjour {0}, vous avez {1} ans', nom, age);

// ========================================
// 5. Test des niveaux de log
// ========================================
console.log('\n=== 5. Test des niveaux de log ===');
console.log('Niveau de log actuel: DEBUG');
setLogLevel('DEBUG');
debug("Ce message de débogage devrait s'afficher");

console.log('\nChangement du niveau de log à WARN');
setLogLevel('WARN');
debug("Ce message de débogage ne devrait PAS s'afficher");
info("Ce message d'information ne devrait PAS s'afficher");
warn("Ce message d'avertissement devrait s'afficher");
error("Ce message d'erreur devrait s'afficher");

// ========================================
// 6. Test des styles personnalisés
// ========================================
const customTitle = createLogger('bright');
const success = createLogger('green', 'bright');
const important = createLogger('yellow', 'bgRed', 'bright');
const highlight = createLogger('black', 'bgYellow', 'bright');

console.log();
customTitle('=== 6. Test des styles personnalisés ===');
success('Opération réussie !');
important('Ceci est un message important !');

// ========================================
// 7. Test des chaînages de styles
// ========================================
const styledText = createLogger('red', 'bright', 'underline');
styledText('Ce texte est en rouge, en gras et souligné');

// ========================================
// 8. Test avec des tableaux
// ========================================
const sectionTitle = createLogger('bright');
const cyanText = createLogger('cyan');

console.log();
sectionTitle('=== 8. Test avec des tableaux ===');
console.log();
cyanText('Tableau de nombres:');
console.log(JSON.stringify([1, 2, 3, 4, 5], null, 2));

console.log();
cyanText('Liste des utilisateurs:');
console.log(
  JSON.stringify(
    [
      { id: 1, nom: 'Alice' },
      { id: 2, nom: 'Bob' },
      { id: 3, nom: 'Charlie' },
    ],
    null,
    2
  )
);

console.log('\n=== Fin des tests ===');
