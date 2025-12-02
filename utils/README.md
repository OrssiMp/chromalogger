# Utilitaires Optionnels

Ce dossier contient des utilitaires optionnels pour ChromaLogger qui ne font pas partie du cœur de la bibliothèque.

## chroma.js

Une fonction utilitaire pour afficher rapidement du texte formaté dans la console avec une syntaxe simple et flexible.

### Installation

```bash
npm install chromalogger
```

### Utilisation

```javascript
import chroma from 'chromalogger/utils/chroma.js';

// Utilisation simple
chroma('Texte en rouge et gras', 'red', 'bright');
chroma('Texte jaune sur fond bleu', 'yellow', 'bgBlue');

// Combinaison de styles
chroma('Texte avec plusieurs styles', 'magenta', 'underline', 'blink');

// Concaténation de plusieurs appels
console.log(
  chroma('Erreur: ', 'red', 'bright') + 
  chroma('Ceci est un message d\'erreur important', 'white', 'bgRed')
);

// Styles disponibles :
// - Couleurs : black, red, green, yellow, blue, magenta, cyan, white
// - Styles : bright, dim, italic, underline, blink, reverse, hidden, strikethrough
// - Fond : bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
```

### Pourquoi utiliser `chroma` ?

- **Simplicité** : Une fonction unique pour tous vos besoins de mise en forme
- **Flexibilité** : Combinez facilement plusieurs styles
- **Léger** : Pas de surcharge inutile, parfait pour le développement
- **Intégration facile** : Fonctionne avec tous les environnements Node.js

### Meilleures pratiques

1. **Pour des messages simples** : Utilisez directement `chroma()`
2. **Pour des messages complexes** : Combinez plusieurs appels `chroma()`
3. **Pour des logs récurrents** : Créez un logger personnalisé avec `createLogger`
4. **Pour la production** : Vérifiez que les codes ANSI sont supportés par votre terminal

### Exemple d'utilisation avancée

```javascript
// Création d'une fonction utilitaire
const error = (message) => chroma(`[ERREUR] ${message}`, 'red', 'bright');
const success = (message) => chroma(`[SUCCÈS] ${message}`, 'green');

// Utilisation
try {
  // Opération qui peut échouer
  success('Tout fonctionne parfaitement !');
} catch (err) {
  error('Quelque chose s\'est mal passé : ' + err.message);
}
```
