#!/usr/bin/env node

import { createLogger } from '../chromalog.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

function showHelp() {
  const helpText = `
  Utilisation : clog [options] <message>

  Options :
    --color <couleur>   Couleur du texte (red, green, blue, etc.)
    --style <styles>    Styles (séparés par des virgules)
    -v, --version       Affiche la version
    -h, --help          Affiche cette aide

  Exemples :
    $ npx clog --color red --style bright "Attention !"
    $ npx clog --color green "Opération réussie"
  `;
  console.log(helpText);
}

function main() {
  const logger = createLogger('white', 'bright');
  logger('Début de la fonction main'); // Debug
  const args = process.argv.slice(2);
  console.log('Arguments:', args); // Debug

  // Afficher l'aide
  if (args.length === 0 || args.includes('--help') || args.includes('-h') || args.includes('-V')) {
    return showHelp();
  }

  // Afficher la version
  if (args.includes('--version') || args.includes('-v')) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    return console.log(pkg.version);
  }

  // Traitement des arguments de couleur et de style
  let messageParts = [];
  let color = 'white';
  let styles = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--color' && args[i + 1]) {
      color = args[++i];
    } else if (arg === '--style' && args[i + 1]) {
      styles = args[++i].split(',').map((s) => s.trim());
    } else if (!arg.startsWith('--')) {
      messageParts.push(arg);
    }
  }

  const message = messageParts.join(' ');

  if (!message) {
    console.error('Erreur: Aucun message fourni');
    return showHelp();
  }

  try {
    // Créer et utiliser le logger
    const logger = createLogger(color, ...styles);
    logger(message);
  } catch (error) {
    console.error('Erreur:', error.message);
    console.log('\nCouleurs disponibles: red, green, blue, yellow, magenta, cyan, white');
    console.log(
      'Styles disponibles: bright, dim, italic, underline, blink, reverse, hidden, strikethrough'
    );
  }
}

// Exécuter le CLI
if (process.argv[1] && process.argv[1].endsWith('cli.js')) {
  main();
}
