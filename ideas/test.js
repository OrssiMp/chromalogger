// Import du module LogColor
import log from './LogColor.js';

// 1. Test des couleurs de base
console.log('=== COULEURS DE BASE ===');
log.red('Texte en rouge');
log.green('Texte en vert');
log.blue('Texte en bleu');
log.yellow('Texte en jaune');
log.magenta('Texte en magenta');
log.cyan('Texte en cyan');
log.white('Texte en blanc');
log.dim.white('Texte en gris');

// 2. Test des arrière-plans
console.log('\n=== ARRIÈRE-PLANS ===');
log.bgBlack(' Fond noir ');
log.bgRed(' Fond rouge ');
log.bgGreen(' Fond vert ');
log.bgYellow(' Fond jaune ');
log.bgBlue(' Fond bleu ');
log.bgMagenta(' Fond magenta ');
log.bgCyan(' Fond cyan ');
log.bgWhite(' Fond blanc ');

// 3. Test des styles de texte
console.log('\n=== STYLES DE TEXTE ===');
log.bold('Texte en gras');
log.dim('Texte atténué');
log.italic('Texte en italique');
log.underline('Texte souligné');
log.blink('Texte clignotant');
log.reverse('Texte inversé');
log.hidden('Texte caché');

// 4. Combinaisons de styles
console.log('\n=== COMBINAISONS DE STYLES ===');
log.bold.red('Gras et rouge');
log.underline.blue('Souligné et bleu');
log.bgYellow.black('Fond jaune et texte noir');
log.bold.italic.cyan('Gras, italique et cyan');

// 5. Niveaux de log
console.log('\n=== NIVEAUX DE LOG ===');

// Niveau DEBUG (affiche tout)
console.log('\nNiveau DEBUG:');
log.setLogLevel('DEBUG');
log.debug('Message de débogage');
log.info('Information');
log.warn('Avertissement');
log.error('Erreur');

// Niveau INFO (affiche INFO, WARN, ERROR)
console.log('\nNiveau INFO:');
log.setLogLevel('INFO');
log.debug("Message de débogage (ne devrait pas s'afficher)");
log.info('Information');
log.warn('Avertissement');
log.error('Erreur');

// Niveau WARN (affiche WARN, ERROR)
console.log('\nNiveau WARN:');
log.setLogLevel('WARN');
log.debug("Message de débogage (ne devrait pas s'afficher)");
log.info("Information (ne devrait pas s'afficher)");
log.warn('Avertissement');
log.error('Erreur');

// Niveau ERROR (affiche uniquement les erreurs)
console.log('\nNiveau ERROR:');
log.setLogLevel('ERROR');
log.debug("Message de débogage (ne devrait pas s'afficher)");
log.info("Information (ne devrait pas s'afficher)");
log.warn("Avertissement (ne devrait pas s'afficher)");
log.error('Erreur');

// 6. Formatage d'objets et tableaux
console.log("\n=== FORMATAGE D'OBJETS ===");
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

log.info("Affichage d'un objet utilisateur:", utilisateur);

// 7. Tableaux
const nombres = [1, 2, 3, 4, 5];
log.info("Affichage d'un tableau de nombres:", nombres);

// 8. Test de performance
console.log('\n=== PERFORMANCE ===');
console.time('1000 logs simples');
for (let i = 0; i < 1000; i++) {
  log.info(`Message de test ${i}`);
}
console.timeEnd('1000 logs simples');
