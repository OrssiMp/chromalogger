# Utilitaires Optionnels

Ce dossier contient des utilitaires optionnels pour LogColor qui ne font pas partie du cœur de la bibliothèque.

## printStyled

Une fonction utilitaire pour afficher rapidement du texte formaté sans créer de logger.

### Installation

```bash
npm install logcolor
```

### Utilisation

```javascript
import printStyled from 'logcolor/utils/printStyled.js';

// Utilisation simple
printStyled('Texte en rouge et gras', 'red', 'bright');
printStyled('Texte jaune sur fond bleu', 'yellow', 'bgBlue');

// Styles disponibles :
// - Couleurs : black, red, green, yellow, blue, magenta, cyan, white
// - Styles : bright, dim, italic, underline, blink, reverse, hidden
// - Fond : bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
```

### Pourquoi utiliser printStyled ?

- **Pour du prototypage rapide** : Pas besoin de créer des loggers pour des tests ponctuels
- **Pour des messages uniques** : Quand vous n'avez pas besoin de réutiliser le style
- **Pour une syntaxe plus concise** : Une seule ligne au lieu de deux avec `createLogger`

### Quand ne pas l'utiliser ?

- Pour des logs récurrents (préférez `createLogger` pour de meilleures performances)
- Dans des boucles (création répétée de la chaîne de style)
- Pour du code de production critique en termes de performances
