# LogColor

Une bibliothèque simple pour ajouter des couleurs aux logs de la console Node.js.

## Installation

```bash
npm install @votre-nom/logcolor
```

## Utilisation basique

```javascript
const log = require('./LogColor');

// Exemples d'utilisation
log.red('Ceci est un message en rouge');
log.green('Opération réussie !');
log.yellow('Avertissement : action requise');
log.blue('Information importante');
log.bold('Message en gras');
log.underline('Texte souligné');

// Alias
log.danger('Message d\'erreur'); // Équivalent à log.red()
log.success('Succès !');         // Équivalent à log.green()
```

## Méthodes disponibles

- Couleurs :
  - `red(message)` / `danger(message)` - Texte en rouge
  - `green(message)` / `success(message)` - Texte en vert
  - `yellow(message)` - Texte en jaune
  - `blue(message)` - Texte en bleu
  - `magenta(message)` - Texte en magenta
  - `cyan(message)` - Texte en cyan
  - `white(message)` - Texte en blanc

- Styles :
  - `bold(message)` - Texte en gras
  - `underline(message)` - Texte souligné

## Exemple complet

```javascript
const log = require('./LogColor');

function validateInput(input) {
  if (!input) {
    log.danger('Erreur : Aucune entrée fournie');
    return false;
  }
  
  if (input.length < 5) {
    log.yellow('Avertissement : L\'entrée est très courte');
    return false;
  }
  
  log.success('Validation réussie !');
  return true;
}

// Test
validateInput('');
validateInput('abc');
validateInput('entrée valide');
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT
