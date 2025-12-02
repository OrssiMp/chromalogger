# LogColor

Une bibliothèque JavaScript simple pour ajouter des couleurs et des styles aux messages de la console en Node.js.

## Installation

```bash
npm install logcolor-js
```

## Utilisation

### Avec ES Modules (recommandé)

```javascript
import logger from 'logcolor-js';

// Couleurs de base
logger.red('Ceci est en rouge');
logger.green('Ceci est en vert');
logger.blue('Ceci est en bleu');
logger.yellow('Ceci est en jaune');
```

### Avec CommonJS

```javascript
const logger = require('logcolor-js');

// Arrière-plans colorés
logger.bgRed(' Fond rouge ');
logger.bgGreen(' Fond vert ');
logger.bgBlue(' Fond bleu ');
```

## Fonctionnalités

### Couleurs de texte

- `red(text)` - Texte rouge
- `green(text)` - Texte vert
- `blue(text)` - Texte bleu
- `yellow(text)` - Texte jaune
- `white(text)` - Texte blanc
- `black(text)` - Texte noir
- `magenta(text)` - Texte magenta
- `cyan(text)` - Texte cyan

### Arrière-plans

- `bgRed(text)` - Fond rouge
- `bgGreen(text)` - Fond vert
- `bgBlue(text)` - Fond bleu
- `bgYellow(text)` - Fond jaune
- `bgWhite(text)` - Fond blanc
- `bgBlack(text)` - Fond noir
- `bgMagenta(text)` - Fond magenta
- `bgCyan(text)` - Fond cyan

### Styles de texte

- `bold(text)` - Texte en gras
- `underline(text)` - Texte souligné
- `italic(text)` - Texte en italique
- `inverse(text)` - Inverse les couleurs
- `strikethrough(text)` - Texte barré

### Niveaux de log

- `setLogLevel(level)` - Définit le niveau de log ('DEBUG', 'INFO', 'WARN', 'ERROR')
- `debug(...args)` - Message de débogage
- `info(...args)` - Information
- `warn(...args)` - Avertissement
- `error(...args)` - Erreur
- `success(...args)` - Succès (alias pour info avec icône de succès)
- `warning(...args)` - Avertissement (alias pour warn avec icône d'avertissement)

## Exemples avancés

### Combinaison de styles

```javascript
// Combinaison de styles
logger.bold(logger.red('Texte en gras et rouge'));
logger.bgBlue(logger.white('Texte blanc sur fond bleu'));
```

### Niveaux de log

```javascript
// Définir le niveau de log (par défaut: 'INFO')
logger.setLogLevel('DEBUG');

// Messages de log
logger.debug('Message de débogage');
logger.info('Information');
logger.warn('Avertissement');
logger.error('Erreur');
```

### Avec des objets et tableaux

```javascript
// Objets
const user = {
  name: 'John',
  age: 30,
  roles: ['admin', 'user'],
};
logger.info('Utilisateur:', user);

// Tableaux
const numbers = [1, 2, 3, 4, 5];
logger.info('Nombres:', numbers);

// Références circulaires
const obj1 = { name: 'Objet 1' };
const obj2 = { name: 'Objet 2', ref: obj1 };
obj1.ref = obj2;
logger.info('Objet avec référence circulaire:', obj1);
```

## Personnalisation

### Styles personnalisés

```javascript
// Accès direct aux codes ANSI
console.log(
  `${logger.styles.bold}${logger.styles.red}Texte en gras et rouge${logger.styles.reset}`
);
```

### Templates

```javascript
const name = 'Alice';
const age = 30;
logger.info('Nom: {0}, Âge: {1}', name, age);
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT
