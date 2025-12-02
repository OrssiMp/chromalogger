# ChromaLogger

[![npm version](https://img.shields.io/npm/v/chromalogger.svg?style=flat)](https://www.npmjs.com/package/chromalogger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/OrssiMp/chromalogger.svg?style=social)](https://github.com/OrssiMp/chromalogger/stargazers)

ChromaLogger est une bibliothèque Node.js puissante et flexible pour la journalisation de console avec un support avancé des couleurs et des styles. Parfaite pour le développement et le débogage d'applications Node.js.

## ✨ Fonctionnalités

- 🎨 Messages de console colorés et stylisés
- 📊 Plusieurs niveaux de logs (log, debug, info, warn, error)
- 🛠️ Interface de ligne de commande (CLI) intégrée
- 🔧 Personnalisation facile des styles et formats
- 📦 Compatible ES Modules et CommonJS
- 🚀 Légère et sans dépendances inutiles

## 📦 Installation

```bash
# Avec npm
npm install chromalogger

# Ou avec Yarn
yarn add chromalogger
```

## 🎨 Utilisation de la fonction `chroma`

La fonction `chroma` vous permet de créer des messages colorés avec une grande flexibilité :

```javascript
import { chroma } from 'chromalogger';

// Utilisation de base
chroma('Texte en rouge', 'red');
chroma('Texte en vert sur fond jaune', 'green', 'bgYellow');

// Chaînage des styles
chroma('Texte en gras et souligné', 'bold', 'underline');

// Avec des templates strings
const user = 'Alice';
console.log(chroma(`Bonjour ${user}, ceci est un `, 'yellow') + 
            chroma('message important', 'red', 'bright') + 
            chroma(' !', 'yellow'));

// Styles disponibles :
// Couleurs : black, red, green, yellow, blue, magenta, cyan, white
// Arrière-plans : bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
// Styles : bright, dim, italic, underline, blink, reverse, hidden, strikethrough
```

## 🚀 Utilisation de base

### Avec ES Modules (recommandé)

```javascript
import { log, info, warn, error, createLogger } from 'chromalogger';

// Utilisation des loggers prédéfinis
log('Message standard');
info('Information importante');
warn('Attention !');
error('Erreur critique !');

// Création d'un logger personnalisé
const customLogger = createLogger('magenta', 'underline');
customLogger('Message personnalisé');
```

### Avec CommonJS

```javascript
const { log, info, warn, error } = require('chromalogger');

// Utilisation des loggers
log('Message standard');
info('Information');
warn('Avertissement');
error('Erreur');
```

## 🛠️ Interface en Ligne de Commande (CLI)

ChromaLogger inclut un utilitaire en ligne de commande `clog` :

```bash
# Afficher l'aide
npx clog --help ou clog --help

# Afficher un message simple
npx clog "Mon message" ou clog "Mon message"

# Utiliser des couleurs et styles
npx clog --color red --style bright "Message d'erreur important" / clog --color red --style bright "Message d'erreur important"

clog --color red --style bright "Message d'erreur important" / clog --color red --style bright "Message d'erreur important"
```

## 📚 Documentation Complète

Pour plus d'informations sur les fonctionnalités avancées, consultez la [documentation complète](https://github.com/OrssiMp/chromalogger#readme).

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Distribué sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 📞 Contact

Orssi Mp - [@OrssiMp](https://github.com/OrssiMp) - orssimpiere5@gmail.com

Lien du projet : [https://github.com/OrssiMp/chromalogger](https://github.com/OrssiMp/chromalogger)

// Couleurs de base
logger.red('Ceci est en rouge');
logger.green('Ceci est en vert');
logger.blue('Ceci est en bleu');
logger.yellow('Ceci est en jaune');

````

### Avec CommonJS

```javascript
const logger = require('logcolor-js');

// Arrière-plans colorés
logger.bgRed(' Fond rouge ');
logger.bgGreen(' Fond vert ');
logger.bgBlue(' Fond bleu ');
````

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
