/**
 * @fileoverview A simple and colorful logger for Node.js console
 * @module LogColor
 * @version 2.0.0
 */

// Codes ANSI pour les couleurs et styles
const styles = {
  // Couleurs de texte
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Arrière-plans
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',

  // Styles
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  // Reset
  reset: '\x1b[0m',
};

/**
 * Formate un message pour l'affichage
 * @param {*} message - Message à formater
 * @param {Array} rest - Paramètres supplémentaires (pour les templates strings)
 * @returns {string} Message formaté
 */
const formatMessage = (message, rest = []) => {
  // Gestion des templates strings
  if (typeof message === 'string' && rest.length > 0) {
    // Si c'est un template string, on remplace les placeholders
    return message.replace(/\{\d+\}/g, (match) => {
      const index = parseInt(match.match(/\d+/)[0], 10);
      return formatValue(rest[index] || '');
    });
  }

  // Si c'est un objet ou un tableau, on le formate en JSON
  return formatValue(message);
};

/**
 * Formate un objet ou un tableau de manière lisible
 * @param {*} obj - L'objet ou le tableau à formater
 * @returns {string} La représentation formatée
 */
const formatObject = (obj) => {
  try {
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === 'function') {
          return `[Function: ${value.name || 'anonymous'}]`;
        }
        return value;
      },
      2
    );
  } catch (e) {
    return String(obj);
  }
};

/**
 * Formate une valeur pour l'affichage
 * @param {*} value - Valeur à formater
 * @param {WeakSet} [seen] - Ensemble pour suivre les objets déjà visités (interne)
 * @param {number} [depth=0] - Niveau d'imbrication actuel (pour l'indentation)
 * @returns {string} Valeur formatée
 */
const formatValue = (value, seen = new WeakSet(), depth = 0) => {
  const indent = '  '.repeat(depth);

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  // Gestion des tableaux et objets
  if (typeof value === 'object') {
    // Vérification des références circulaires
    if (seen.has(value)) {
      return '[Circular]';
    }

    try {
      // Marquer cet objet comme vu
      seen.add(value);

      // Si c'est un tableau ou un objet, on l'affiche sur plusieurs lignes
      const isArray = Array.isArray(value);
      const isEmpty = isArray ? value.length === 0 : Object.keys(value).length === 0;

      if (isEmpty) {
        return isArray ? '[]' : '{}';
      }

      // Créer une copie de l'ensemble pour éviter les fuites de mémoire
      const newSeen = new WeakSet(seen);

      if (isArray) {
        if (value.length <= 3 && value.every((item) => typeof item !== 'object')) {
          return `[${value.map((item) => formatValue(item, newSeen, 0)).join(', ')}]`;
        }
        return `[\n${value.map((item) => `  ${indent}${formatValue(item, newSeen, depth + 1)}`).join(',\n')}\n${indent}]`;
      }

      // Pour les objets
      const entries = Object.entries(value).map(
        ([key, val]) => `${'  '.repeat(depth + 1)}"${key}": ${formatValue(val, newSeen, depth + 1)}`
      );

      return `{\n${entries.join(',\n')}\n${indent}}`;
    } catch (e) {
      // En cas d'erreur (comme une référence circulaire), on affiche une version simplifiée
      return `[${value.constructor?.name || 'Object'}]`;
    }
  }

  // Pour les chaînes, on les entoure de guillemets
  if (typeof value === 'string') {
    return `"${value}"`;
  }

  // Pour les autres types, on utilise la conversion en chaîne par défaut
  return String(value);
};

/**
 * Valide les arguments d'entrée
 * @param {Array} args - Arguments à valider
 * @returns {Array} Arguments validés
 * @throws {Error} Si aucun argument n'est fourni
 */
const validateInput = (args) => {
  if (args.length === 0) {
    throw new Error('Aucun message à logger');
  }

  // Filtrer les arguments undefined ou null
  const filteredArgs = args.filter((arg) => arg !== undefined && arg !== null);

  // Si tous les arguments sont undefined ou null, on garde le premier
  return filteredArgs.length > 0 ? filteredArgs : [args[0]];
};

/**
 * Crée une fonction de log avec les styles spécifiés
 * @param {...string} styleNames - Noms des styles à appliquer
 * @returns {Function} Fonction de log avec les styles appliqués
 */
const createLogger = (...styleNames) => {
  const styleCodes = styleNames.map((name) => {
    if (!styles[name]) {
      console.warn(`LogColor: Style inconnu "${name}"`);
      return '';
    }
    return styles[name];
  });

  const stylePrefix = styleCodes.join('');

  const logger = (...args) => {
    try {
      const validArgs = validateInput(args);

      // Si c'est un template string (premier argument est une chaîne avec des placeholders)
      if (typeof validArgs[0] === 'string' && validArgs.length > 1) {
        const message = formatMessage(validArgs[0], validArgs.slice(1));
        console.log(`${stylePrefix}${message}${styles.reset}`);
      } else if (
        validArgs.length === 1 &&
        (typeof validArgs[0] === 'object' || Array.isArray(validArgs[0]))
      ) {
        // Si un seul argument et que c'est un objet ou un tableau, on l'affiche sur plusieurs lignes
        const formatted = formatObject(validArgs[0]);
        console.log(`${stylePrefix}${formatted}${styles.reset}`);
      } else {
        // Formatage de chaque argument individuellement
        const formattedMessages = validArgs.map((arg) => {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'object') return formatObject(arg);
          return String(arg);
        });

        console.log(`${stylePrefix}${formattedMessages.join(' ')}${styles.reset}`);
      }
    } catch (error) {
      console.error(
        `${styles.red}LogColor: Erreur lors du logging - ${error.message}${styles.reset}`
      );
    }
  };

  // Ajouter les méthodes de style directement sur la fonction logger pour permettre le chaînage
  Object.keys(styles).forEach((styleName) => {
    Object.defineProperty(logger, styleName, {
      get: () => createLogger(...styleNames, styleName),
    });
  });

  return logger;
};

// Méthodes de base avec couleurs
const red = createLogger('red');
const green = createLogger('green');
const yellow = createLogger('yellow');
const blue = createLogger('blue');
const magenta = createLogger('magenta');
const cyan = createLogger('cyan');
const white = createLogger('white');
const black = createLogger('black');

// Méthodes avec arrière-plans
const bgRed = createLogger('bgRed');
const bgGreen = createLogger('bgGreen');
const bgYellow = createLogger('bgYellow');
const bgBlue = createLogger('bgBlue');
const bgMagenta = createLogger('bgMagenta');
const bgCyan = createLogger('bgCyan');
const bgWhite = createLogger('bgWhite');
const bgBlack = createLogger('bgBlack');

// Méthodes avec styles
const bold = createLogger('bold');
const dim = createLogger('dim');
const italic = createLogger('italic');
const underline = createLogger('underline');
const blink = createLogger('blink');
const reverse = createLogger('reverse');
const hidden = createLogger('hidden');

// Combinaisons courantes
const error = createLogger('red', 'bold');
const success = createLogger('green', 'bold');
const warning = createLogger('yellow', 'bold');
const info = createLogger('blue', 'bold');
const debug = createLogger('cyan');

// Niveaux de log avec horodatage
const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

let currentLogLevel = logLevels.INFO;

/**
 * Définit le niveau de log actuel
 * @param {string} level - Niveau de log ('ERROR', 'WARN', 'INFO', 'DEBUG')
 */
const setLogLevel = (level) => {
  if (logLevels[level] !== undefined) {
    currentLogLevel = logLevels[level];
  }
};

/**
 * Log un message de niveau DEBUG
 * @param {*} message - Message à logger
 */
const logDebug = (message) => {
  if (currentLogLevel >= logLevels.DEBUG) {
    const formattedMessage =
      typeof message === 'object' ? formatObject(message) : formatValue(message);
    console.log(
      `[${new Date().toISOString()}] ${styles.cyan}DEBUG:${styles.reset}`,
      formattedMessage
    );
  }
};

/**
 * Log un message de niveau INFO
 * @param {*} message - Message à logger
 */
const logInfo = (message) => {
  if (currentLogLevel >= logLevels.INFO) {
    const formattedMessage = typeof message === 'object' ? formatObject(message) : message;
    console.log(
      `[${new Date().toISOString()}] ${styles.blue}INFO:${styles.reset}`,
      formattedMessage
    );
  }
};

/**
 * Log un message de niveau WARN
 * @param {*} message - Message à logger
 */
const logWarn = (message) => {
  if (currentLogLevel >= logLevels.WARN) {
    const formattedMessage = typeof message === 'object' ? formatObject(message) : message;
    console.log(
      `[${new Date().toISOString()}] ${styles.yellow}WARN:${styles.reset}`,
      formattedMessage
    );
  }
};

/**
 * Log un message de niveau ERROR
 * @param {*} message - Message à logger
 */
const logError = (message) => {
  if (currentLogLevel >= logLevels.ERROR) {
    const formattedMessage = typeof message === 'object' ? formatObject(message) : message;
    console.error(
      `[${new Date().toISOString()}] ${styles.red}ERROR:${styles.reset}`,
      formattedMessage
    );
  }
};

/**
 * Main LogColor object containing all logging methods
 * @namespace LogColor
 */
const LogColor = {
  // Couleurs de base
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  black,

  // Arrière-plans
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  bgBlack,

  // Styles
  bold,
  dim,
  italic,
  underline,
  blink,
  reverse,
  hidden,

  // Niveaux de log
  logLevels,
  setLogLevel,
  debug: logDebug,
  info: logInfo,
  warn: logWarn,
  error: logError,
  danger: logError, // Alias pour error
};

/**
 * Affiche une barre de progression dans la console
 * @param {number} current - Valeur actuelle
 * @param {number} total - Valeur maximale (par défaut: 100)
 * @param {Object} [options] - Options de la barre de progression
 * @param {number} [options.min=0] - Valeur minimale
 * @param {number} [options.max=100] - Valeur maximale (écrase le paramètre total si fourni)
 * @param {number} [options.width=30] - Largeur de la barre
 * @param {string} [options.fill='█'] - Caractère de remplissage
 * @param {string} [options.remain='░'] - Caractère de remplissage restant
 * @param {string} [options.bracketStart='│'] - Délimiteur de début
 * @param {string} [options.bracketEnd='│'] - Délimiteur de fin
 * @param {boolean} [options.showPercentage=true] - Afficher le pourcentage
 * @returns {string} La barre de progression formatée
 */
const progressBar = (current, total = 100, options = {}) => {
  const {
    min = 0,
    max = total,
    width = 30,
    fill = '█',
    remain = '░',
    bracketStart = '│',
    bracketEnd = '│',
    showPercentage = true,
  } = options;

  // Ajuster les valeurs pour éviter les erreurs
  const adjustedMax = Math.max(min, max);
  const adjustedCurrent = Math.max(min, Math.min(current, adjustedMax));

  // Calculer le ratio de progression (entre 0 et 1)
  const range = adjustedMax - min;
  const progress = range > 0 ? (adjustedCurrent - min) / range : 1;

  const filled = Math.round(width * progress);
  const empty = width - filled;
  const percent = Math.round(progress * 100);

  // Construire la barre
  const bar = `${bracketStart}${fill.repeat(filled)}${remain.repeat(empty)}${bracketEnd}`;

  // Ajouter le pourcentage si demandé
  return showPercentage ? `${bar} ${percent}% (${adjustedCurrent}/${adjustedMax})` : bar;
};

/**
 * Crée un spinner animé
 * @param {string} [message=''] - Message à afficher à côté du spinner
 * @param {Array} [chars=['|', '/', '-', '\\']] - Caractères pour l'animation
 * @param {number} [delay=100] - Délai entre les frames en ms
 * @returns {Object} Objet avec les méthodes start() et stop()
 */
const spinner = (message = '', chars = ['|', '/', '-', '\\'], delay = 100) => {
  let i = 0;
  let timer = null;

  const start = () => {
    process.stdout.write('\x1B[?25l'); // Cache le curseur

    const spin = () => {
      const char = chars[i++ % chars.length];
      process.stdout.write(`\r${char} ${message} \x1B[0m`);
    };

    spin();
    timer = setInterval(spin, delay);

    return {
      stop: () => {
        clearInterval(timer);
        process.stdout.write('\r\x1B[K'); // Efface la ligne
        process.stdout.write('\x1B[?25h'); // Affiche le curseur
      },
      update: (newMessage) => {
        message = newMessage;
      },
    };
  };

  return { start };
};

/**
 * Crée une boîte de texte avec un titre
 * @param {string} title - Titre de la boîte
 * @param {string} content - Contenu de la boîte
 * @param {Object} [options] - Options de la boîte
 * @param {string} [options.padding=1] - Espacement intérieur
 * @param {string} [options.margin=1] - Marge extérieure
 * @param {string} [options.borderStyle='single'] - Style de bordure ('single', 'double', 'round', 'bold')
 * @returns {string} La boîte formatée
 */
const box = (title, content, options = {}) => {
  const { padding = 1, margin = 1, borderStyle = 'single' } = options;

  const borders =
    {
      single: { tl: '┌', t: '─', tr: '┐', r: '│', br: '┘', b: '─', bl: '└', l: '│' },
      double: { tl: '╔', t: '═', tr: '╗', r: '║', br: '╝', b: '═', bl: '╚', l: '║' },
      round: { tl: '╭', t: '─', tr: '╮', r: '│', br: '╯', b: '─', bl: '╰', l: '│' },
      bold: { tl: '┏', t: '━', tr: '┓', r: '┃', br: '┛', b: '━', bl: '┗', l: '┃' },
    }[borderStyle] || borders.single;

  const lines = content.split('\n');
  const maxLength = Math.max(...lines.map((line) => line.length), title.length) + padding * 2;

  const marginStr = ' '.repeat(margin);
  const padStr = ' '.repeat(padding);
  const titleLine = `${borders.t}${title}${borders.t.repeat(maxLength - title.length)}`;

  let result = [
    `${marginStr}${borders.tl}${borders.t.repeat(maxLength)}${borders.tr}`,
    `${marginStr}${borders.l}${titleLine}${borders.r}`,
    `${marginStr}${borders.l}${borders.t.repeat(maxLength)}${borders.r}`,
  ];

  for (const line of lines) {
    const paddedLine = `${padStr}${line}${' '.repeat(maxLength - line.length - padding * 2)}${padStr}`;
    result.push(`${marginStr}${borders.l}${paddedLine}${borders.r}`);
  }

  result.push(`${marginStr}${borders.bl}${borders.b.repeat(maxLength)}${borders.br}`);

  return result.join('\n');
};

/**
 * Crée une ligne de séparation
 * @param {Object} [options] - Options de la ligne
 * @param {string} [options.char='-'] - Caractère de la ligne
 * @param {number} [options.length=process.stdout.columns || 80] - Longueur de la ligne
 * @returns {string} La ligne de séparation
 */
const separator = (options = {}) => {
  const { char = '-', length = process.stdout.columns || 80 } = options;
  return char.repeat(length);
};

/**
 * Thèmes prédéfinis pour les barres de progression
 * @type {Object}
 */
const progressThemes = {
  default: {
    complete: '█',
    incomplete: '░',
    width: 30,
    showPercentage: true,
    showCount: true,
    format: '{label}: {bar} {percentage}% {count}',
  },
  download: {
    complete: '█',
    incomplete: '░',
    width: 30,
    showPercentage: true,
    showCount: true,
    showSpeed: true,
    format: '{label}: {bar} {percentage}% | {speed}/s | {count}',
    label: 'Téléchargement',
    completeColor: 'green',
    incompleteColor: 'dim',
    labelColor: 'cyan',
    percentageColor: 'yellow',
    countColor: 'white',
  },
  install: {
    complete: '■',
    incomplete: '□',
    width: 30,
    showPercentage: true,
    showCount: true,
    format: '🛠️  {label}: {bar} {percentage}% | {count}',
    label: 'Installation',
    completeColor: 'blue',
    incompleteColor: 'dim',
    labelColor: 'white',
    percentageColor: 'yellow',
    countColor: 'white',
  },
  process: {
    complete: '=',
    incomplete: '-',
    width: 40,
    showPercentage: true,
    showCount: true,
    format: '🔄 {label}: {bar} {percentage}% | {count}',
    label: 'Traitement',
    completeColor: 'magenta',
    incompleteColor: 'dim',
    labelColor: 'white',
    percentageColor: 'yellow',
    countColor: 'white',
  },
};

/**
 * Crée une barre de progression interactive
 * @param {Object} options - Options de configuration
 * @param {number} [options.min=0] - Valeur minimale
 * @param {number} options.max - Valeur maximale (requise)
 * @param {string} [options.label='Progression'] - Étiquette de la barre de progression
 * @param {string} [options.theme='default'] - Thème à utiliser (default, download, install, process)
 * @param {string} [options.complete] - Caractère pour la partie complétée
 * @param {string} [options.incomplete] - Caractère pour la partie incomplète
 * @param {number} [options.width] - Largeur de la barre
 * @param {string} [options.format] - Format personnalisé
 * @param {boolean} [options.clearOnComplete=false] - Effacer la barre une fois terminée
 * @returns {Object} Objet avec les méthodes de contrôle
 */
const createProgress = (options = {}) => {
  // Validation des options
  if (options.max === undefined) {
    throw new Error('La valeur maximale (max) est requise');
  }

  const themeName = options.theme || 'default';
  const theme = { ...(progressThemes[themeName] || progressThemes.default), ...options };

  // Remplir les valeurs par défaut
  const {
    min = 0,
    max,
    label = 'Progression',
    complete: completeChar = '█',
    incomplete = '░',
    width = 30,
    format = theme.format || '{label}: {bar} {percentage}% {count}',
    clearOnComplete = false,
    showPercentage = true,
    showCount = true,
    showSpeed = false,
  } = theme;

  let current = Math.max(min, options.initial || min);
  let lastUpdateTime = Date.now();
  let lastValue = current;
  let speed = 0;
  let isCompleted = false;
  let startTime = Date.now();
  let lastDrawnString = '';
  let intervalId = null;

  // Calculer la largeur disponible pour la barre
  const calculateBarWidth = () => {
    const minBarWidth = 10;
    return Math.max(minBarWidth, Math.min(width, process.stdout.columns - 30));
  };

  // Mettre à jour la vitesse de progression
  const updateSpeed = (value) => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 1000; // en secondes

    if (deltaTime > 0) {
      const deltaValue = value - lastValue;
      speed = deltaValue / deltaTime;
      lastValue = value;
      lastUpdateTime = now;
    }
  };

  // Formater la vitesse
  const formatSpeed = (value) => {
    if (value > 1024 * 1024) {
      return (value / (1024 * 1024)).toFixed(1) + ' MB';
    } else if (value > 1024) {
      return (value / 1024).toFixed(1) + ' KB';
    }
    return Math.round(value) + ' B';
  };

  // Formater le temps écoulé
  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  // Mettre à jour l'affichage de la barre de progression
  const render = () => {
    if (isCompleted && clearOnComplete) {
      // Effacer la ligne si la progression est terminée et que clearOnComplete est vrai
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      return;
    }

    const barWidth = calculateBarWidth();
    const ratio = Math.min(1, Math.max(0, (current - min) / (max - min)));
    const filled = Math.round(barWidth * ratio);
    const percent = Math.round(ratio * 100);
    const elapsed = Date.now() - startTime;
    const remainingTime = ratio > 0 ? (elapsed / ratio) * (1 - ratio) : 0;

    // Mise à jour de la vitesse
    if (showSpeed) {
      updateSpeed(current);
    }

    // Construire la barre
    const bar = `${complete.repeat(filled)}${incomplete.repeat(barWidth - filled)}`;

    // Remplacer les variables dans le format
    let output = format
      .replace('{label}', theme.labelColor ? LogColor[theme.labelColor](label) : label)
      .replace('{bar}', () => {
        let coloredBar = bar;
        if (theme.completeColor) {
          const coloredComplete = LogColor[theme.completeColor](complete);
          const coloredIncomplete = theme.incompleteColor
            ? LogColor[theme.incompleteColor](incomplete)
            : incomplete;
          coloredBar =
            coloredComplete.repeat(filled) +
            (barWidth > filled ? coloredIncomplete.repeat(barWidth - filled) : '');
        }
        return coloredBar;
      })
      .replace(
        '{percentage}',
        theme.percentageColor ? LogColor[theme.percentageColor](`${percent}%`) : `${percent}%`
      )
      .replace(
        '{count}',
        theme.countColor ? LogColor[theme.countColor](`(${current}/${max})`) : `(${current}/${max})`
      )
      .replace('{speed}', formatSpeed(speed))
      .replace('{elapsed}', formatTime(elapsed))
      .replace('{remaining}', formatTime(remainingTime));

    // Nettoyer la ligne précédente si nécessaire
    if (lastDrawnString) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    }

    // Écrire la nouvelle ligne
    process.stdout.write(output);
    lastDrawnString = output;
  };

  // Afficher la barre initiale
  if (!options.silent) {
    render();

    // Mettre à jour automatiquement en cas de redimensionnement du terminal
    if (process.stdout.isTTY) {
      process.stdout.on('resize', render);
    }
  }

  /**
   * Met à jour la progression
   * @param {number|Object} value - Nouvelle valeur ou objet avec des propriétés à mettre à jour
   * @param {number} [value.value] - Nouvelle valeur
   * @param {string} [value.label] - Nouvelle étiquette
   * @param {number} [value.max] - Nouvelle valeur maximale
   * @returns {number} La nouvelle valeur actuelle
   */
  const update = (value) => {
    if (typeof value === 'object' && value !== null) {
      if (value.value !== undefined) current = Math.max(min, Math.min(value.value, max));
      if (value.label !== undefined) options.label = value.label;
      if (value.max !== undefined) options.max = value.max;
    } else if (value !== undefined) {
      current = Math.max(min, Math.min(value, max));
    } else {
      current = Math.min(current + 1, max);
    }

    if (!isCompleted) {
      render();
    }

    return current;
  };

  /**
   * Incrémente la valeur actuelle
   * @param {number} [increment=1] - Valeur d'incrémentation
   * @returns {number} La nouvelle valeur actuelle
   */
  const increment = (increment = 1) => {
    return update(current + increment);
  };

  /**
   * Termine la progression
   * @param {string} [message] - Message de fin optionnel
   * @returns {Promise} Résolu lorsque l'animation est terminée
   */
  const complete = (message) => {
    if (isCompleted) return Promise.resolve();

    isCompleted = true;
    current = max;

    if (options.silent) return Promise.resolve();

    render();

    if (message) {
      console.log(`\n${LogColor.green('✓')} ${message}`);
    } else if (!clearOnComplete) {
      console.log(`\n${LogColor.green('✓')} Terminé en ${formatTime(Date.now() - startTime)}`);
    }

    // Nettoyer les écouteurs d'événements
    if (process.stdout.isTTY) {
      process.stdout.off('resize', render);
    }

    return new Promise((resolve) => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      resolve();
    });
  };

  /**
   * Échoue la progression
   * @param {string|Error} [error] - Message d'erreur ou objet Error
   * @returns {void}
   */
  const fail = (error) => {
    isCompleted = true;

    if (options.silent) return;

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    const errorMessage = error instanceof Error ? error.message : error || "Échec de l'opération";
    console.error(`\n${LogColor.red('✗')} ${errorMessage}`);

    // Nettoyer les écouteurs d'événements
    if (process.stdout.isTTY) {
      process.stdout.off('resize', render);
    }

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  /**
   * Réinitialise la progression
   * @param {Object} [newOptions] - Nouvelles options (optionnel)
   * @returns {Object} L'instance de la barre de progression
   */
  const reset = (newOptions = {}) => {
    Object.assign(options, newOptions);
    current = Math.max(min, newOptions.initial || min);
    lastUpdateTime = Date.now();
    lastValue = current;
    speed = 0;
    isCompleted = false;
    startTime = Date.now();

    if (!options.silent) {
      render();
    }

    return progress;
  };

  // Créer un intervalle pour les mises à jour automatiques si nécessaire
  if (options.interval) {
    intervalId = setInterval(() => {
      if (!isCompleted) {
        render();
      }
    }, options.interval);
  }

  // Créer l'objet de progression avec toutes les méthodes
  const progress = {
    update,
    increment,
    complete,
    fail,
    reset,
    get isComplete() {
      return isCompleted;
    },
    get value() {
      return current;
    },
    get ratio() {
      return (current - min) / (max - min);
    },
    get percentage() {
      return Math.round(this.ratio * 100);
    },
    get elapsed() {
      return Date.now() - startTime;
    },
    get remaining() {
      const ratio = this.ratio;
      return ratio > 0 ? (this.elapsed / ratio) * (1 - ratio) : 0;
    },
  };

  return progress;
};

// Ajout des nouvelles méthodes à LogColor
Object.assign(LogColor, {
  progressBar,
  spinner,
  box,
  separator,
  createProgress,
});

// Exportation en CommonJS
export default LogColor;
