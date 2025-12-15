/**
 * Référence complète des codes ANSI pour les couleurs et styles de texte
 * Inspiré par la palette de couleurs Tailwind CSS
 * 
 * Ce fichier contient tous les codes de couleurs et styles ANSI disponibles
 * organisés par catégorie pour une référence facile.
 */

// =============================================
// 1. COULEURS DE TEXTE (FOREGROUND)
// =============================================

// Table de conversion RVB vers ANSI 256 couleurs (couleurs de base 16-231)
// Format: \x1b[38;5;{code}m (texte) ou \x1b[48;5;{code}m (fond)
// 0-15: Couleurs système
// 16-231: 216 couleurs RVB (6x6x6 cube)
// 232-255: Niveaux de gris

export const ansi256Colors = {
  // Couleurs système (0-15)
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  
  // Exemples de couleurs 256 (16-231)
  darkRed: '\x1b[38;5;88m',
  darkGreen: '\x1b[38;5;28m',
  darkBlue: '\x1b[38;5;18m',
  orange: '\x1b[38;5;208m',
  pink: '\x1b[38;5;205m',
  purple: '\x1b[38;5;93m',
  brown: '\x1b[38;5;130m',
  
  // Gris (232-255)
  gray1: '\x1b[38;5;232m',
  gray2: '\x1b[38;5;240m',
  gray3: '\x1b[38;5;245m',
  gray4: '\x1b[38;5;250m',
  gray5: '\x1b[38;5;254m',
  
  // Fonction utilitaire pour les couleurs 256
  fg: (code) => `\x1b[38;5;${code}m`,
  bg: (code) => `\x1b[48;5;${code}m`,
  
  // Exemple de palette 256 couleurs (carré de 6x6)
  palette: (start = 16, size = 6) => {
    const colors = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const code = start + (i * size) + j;
        row.push(`\x1b[38;5;${code}m${code.toString().padStart(3)}\x1b[0m`);
      }
      colors.push(row.join(' '));
    }
    return colors.join('\n');
  }
};

export const textColors = {
  // Couleurs de base (8 couleurs)
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Couleurs vives (bright)
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  
  // Couleurs étendues (256 couleurs) - Exemples
  gray: '\x1b[38;5;246m',
  grayLight: '\x1b[38;5;250m',
  grayDark: '\x1b[38;5;240m',
  redLight: '\x1b[38;5;203m',
  redDark: '\x1b[38;5;124m',
  greenLight: '\x1b[38;5;120m',
  greenDark: '\x1b[38;5;28m',
  // ... autres couleurs 256
};

// =============================================
// 2. COULEURS DE FOND (BACKGROUND)
// =============================================
export const bgColors = {
  // Couleurs de base (8 couleurs)
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  
  // Couleurs vives (bright)
  bgBrightBlack: '\x1b[100m',
  bgBrightRed: '\x1b[101m',
  bgBrightGreen: '\x1b[102m',
  bgBrightYellow: '\x1b[103m',
  bgBrightBlue: '\x1b[104m',
  bgBrightMagenta: '\x1b[105m',
  bgBrightCyan: '\x1b[106m',
  bgBrightWhite: '\x1b[107m',
  
  // Couleurs étendues (256 couleurs) - Exemples
  bgGray: '\x1b[48;5;246m',
  bgGrayLight: '\x1b[48;5;250m',
  bgGrayDark: '\x1b[48;5;240m',
  // ... autres couleurs de fond 256
};

// =============================================
// 3. STYLES DE TEXTE
// =============================================
export const textStyles = {
  // Styles de base
  reset: '\x1b[0m',      // Réinitialise tous les styles
  bold: '\x1b[1m',       // Gras
  dim: '\x1b[2m',        // Texte atténué
  italic: '\x1b[3m',     // Italique
  underline: '\x1b[4m',  // Souligné
  blink: '\x1b[5m',      // Clignotant
  reverse: '\x1b[7m',    // Inverser les couleurs (texte/fond)
  hidden: '\x1b[8m',     // Caché (utile pour les mots de passe)
  
  // Désactiver les styles
  resetBold: '\x1b[21m',
  resetDim: '\x1b[22m',
  resetItalic: '\x1b[23m',
  resetUnderline: '\x1b[24m',
  resetBlink: '\x1b[25m',
  resetReverse: '\x1b[27m',
  resetHidden: '\x1b[28m',
};

// =============================================
// 4. COULEURS RVB (24-bit)
// =============================================
/**
 * Convertit une couleur RVB en code ANSI 256 couleurs
 * @param {number} r - Rouge (0-255)
 * @param {number} g - Vert (0-255)
 * @param {number} b - Bleu (0-255)
 * @returns {number} Code couleur ANSI (16-231)
 */
function rgbToAnsi256(r, g, b) {
  // Conversion en 256 couleurs (6x6x6 cube)
  if (r === g && g === b) {
    // Niveaux de gris (232-255)
    if (r < 8) return 16;
    if (r > 248) return 231;
    return Math.round(((r - 8) / 247) * 24) + 232;
  }
  
  // Couleurs RVB (16-231)
  const ri = Math.round(r / 51) * 36;
  const gi = Math.round(g / 51) * 6;
  const bi = Math.round(b / 51);
  
  return 16 + ri + gi + bi;
}

/**
 * Fonction utilitaire pour les couleurs RVB (24-bit)
 * @param {number} r - Rouge (0-255)
 * @param {number} g - Vert (0-255)
 * @param {number} b - Bleu (0-255)
 * @returns {string} Code ANSI 24-bit
 */
export const rgb = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;

export const bgRgb = (r, g, b) => `\x1b[48;2;${r};${g};${b}m`;

/**
 * Fonction utilitaire pour les couleurs 256
 * @param {number} r - Rouge (0-255)
 * @param {number} g - Vert (0-255)
 * @param {number} b - Bleu (0-255)
 * @returns {string} Code ANSI 256 couleurs
 */
export const rgb256 = (r, g, b) => `\x1b[38;5;${rgbToAnsi256(r, g, b)}m`;

export const bgRgb256 = (r, g, b) => `\x1b[48;5;${rgbToAnsi256(r, g, b)}m`;

// Palettes de couleurs RVB complètes (inspirées de Tailwind)
export const rgbColors = {
  // Grays
  gray50: rgb(249, 250, 251),
  gray100: rgb(243, 244, 246),
  gray200: rgb(229, 231, 235),
  gray300: rgb(209, 213, 219),
  gray400: rgb(156, 163, 175),
  gray500: rgb(107, 114, 128),
  gray600: rgb(75, 85, 99),
  gray700: rgb(55, 65, 81),
  gray800: rgb(31, 41, 55),
  gray900: rgb(17, 24, 39),
  
  // Reds
  red50: rgb(254, 242, 242),
  red100: rgb(254, 226, 226),
  red200: rgb(254, 202, 202),
  red300: rgb(252, 165, 165),
  red400: rgb(248, 113, 113),
  red500: rgb(239, 68, 68),
  red600: rgb(220, 38, 38),
  red700: rgb(185, 28, 28),
  red800: rgb(153, 27, 27),
  red900: rgb(127, 29, 29),
  
  // Oranges
  orange50: rgb(255, 247, 237),
  orange100: rgb(255, 237, 213),
  orange200: rgb(254, 215, 170),
  orange300: rgb(253, 186, 116),
  orange400: rgb(251, 146, 60),
  orange500: rgb(249, 115, 22),
  orange600: rgb(234, 88, 12),
  orange700: rgb(194, 65, 12),
  orange800: rgb(154, 52, 18),
  orange900: rgb(124, 45, 18),
  
  // Yellows
  yellow50: rgb(255, 251, 235),
  yellow100: rgb(254, 243, 199),
  yellow200: rgb(253, 230, 138),
  yellow300: rgb(252, 211, 77),
  yellow400: rgb(250, 204, 21),
  yellow500: rgb(234, 179, 8),
  yellow600: rgb(202, 138, 4),
  yellow700: rgb(161, 98, 7),
  yellow800: rgb(133, 77, 14),
  yellow900: rgb(113, 63, 18),
  
  // Greens
  green50: rgb(236, 253, 245),
  green100: rgb(209, 250, 229),
  green200: rgb(167, 243, 208),
  green300: rgb(110, 231, 183),
  green400: rgb(52, 211, 153),
  green500: rgb(16, 185, 129),
  green600: rgb(5, 150, 105),
  green700: rgb(4, 120, 87),
  green800: rgb(6, 95, 70),
  green900: rgb(6, 78, 59),
  
  // Teals
  teal50: rgb(240, 253, 250),
  teal100: rgb(204, 251, 241),
  teal200: rgb(153, 246, 228),
  teal300: rgb(94, 234, 212),
  teal400: rgb(45, 212, 191),
  teal500: rgb(20, 184, 166),
  teal600: rgb(13, 148, 136),
  teal700: rgb(15, 118, 110),
  teal800: rgb(17, 94, 89),
  teal900: rgb(19, 78, 74),
  
  // Blues
  blue50: rgb(239, 246, 255),
  blue100: rgb(219, 234, 254),
  blue200: rgb(191, 219, 254),
  blue300: rgb(147, 197, 253),
  blue400: rgb(96, 165, 250),
  blue500: rgb(59, 130, 246),
  blue600: rgb(37, 99, 235),
  blue700: rgb(29, 78, 216),
  blue800: rgb(30, 64, 175),
  blue900: rgb(30, 58, 138),
  
  // Indigos
  indigo50: rgb(238, 242, 255),
  indigo100: rgb(224, 231, 255),
  indigo200: rgb(199, 210, 254),
  indigo300: rgb(165, 180, 252),
  indigo400: rgb(129, 140, 248),
  indigo500: rgb(99, 102, 241),
  indigo600: rgb(79, 70, 229),
  indigo700: rgb(67, 56, 202),
  indigo800: rgb(55, 48, 163),
  indigo900: rgb(49, 46, 129),
  
  // Purples
  purple50: rgb(245, 243, 255),
  purple100: rgb(237, 233, 254),
  purple200: rgb(221, 214, 254),
  purple300: rgb(196, 181, 253),
  purple400: rgb(167, 139, 250),
  purple500: rgb(139, 92, 246),
  purple600: rgb(124, 58, 237),
  purple700: rgb(109, 40, 217),
  purple800: rgb(91, 33, 182),
  purple900: rgb(76, 29, 149),
  
  // Pinks
  pink50: rgb(253, 242, 248),
  pink100: rgb(252, 231, 243),
  pink200: rgb(251, 207, 232),
  pink300: rgb(249, 168, 212),
  pink400: rgb(244, 114, 182),
  pink500: rgb(236, 72, 153),
  pink600: rgb(219, 39, 119),
  pink700: rgb(190, 24, 93),
  pink800: rgb(157, 23, 77),
  pink900: rgb(131, 24, 67)
};

// =============================================
// 5. FONCTIONS UTILITAIRES
// =============================================

/**
 * Affiche un exemple de toutes les couleurs et styles disponibles
 */
export function showAllColors() {
  console.log('\n=== COULEURS DE TEXTE ===');
  Object.entries(textColors).forEach(([name, code]) => {
    console.log(`${code}${name.padEnd(15)}${textStyles.reset} (${code.replace(/\x1b/g, '\\x1b')})`);
  });
  
  console.log('\n=== COULEURS DE FOND ===');
  Object.entries(bgColors).forEach(([name, code]) => {
    console.log(`${code}${name.padEnd(20)}${textStyles.reset} (${code.replace(/\x1b/g, '\\x1b')})`);
  });
  
  console.log('\n=== STYLES DE TEXTE ===');
  Object.entries(textStyles).forEach(([name, code]) => {
    console.log(`${code}${name.padEnd(20)}${textStyles.reset} (${code.replace(/\x1b/g, '\\x1b')})`);
  });
}

/**
 * Affiche un dégradé de couleurs
 * @param {number} start - Code couleur de départ (0-255)
 * @param {number} end - Code couleur de fin (0-255)
 * @param {boolean} background - Si true, affiche un dégradé de fond
 */
export function showColorGradient(start = 0, end = 255, background = false) {
  console.log(`\n=== DÉGRADÉ DE COULEURS (${start}-${end}) ===`);
  let output = '';
  for (let i = start; i <= end; i++) {
    const code = background 
      ? `\x1b[48;5;${i}m` 
      : `\x1b[38;5;${i}m`;
    output += `${code}${i.toString().padStart(3)}${textStyles.reset} `;
    if ((i - start + 1) % 16 === 0) output += '\n';
  }
  console.log(output);
}

/**
 * Affiche le code ANSI 256 pour une couleur RVB
 * @param {string} name - Nom de la couleur
 * @param {number} r - Rouge (0-255)
 * @param {number} g - Vert (0-255)
 * @param {number} b - Bleu (0-255)
 */
function showAnsiCode(name, r, g, b) {
  const code = rgbToAnsi256(r, g, b);
  console.log(`${name.padEnd(10)}: \x1b[38;5;${code}m${code.toString().padStart(3)}${textStyles.reset} (\x1b[38;5;${code}m•\x1b[0m)  RGB: ${r}, ${g}, ${b}`);
}

// Fonction principale
export function main() {
  console.log('=== RÉFÉRENCE DES COULEURS ANSI ===\n');
  
  // Afficher toutes les couleurs
  showAllColors();
  
  // Afficher le dégradé de 256 couleurs
  showColorGradient(0, 255);
  
  // Exemple d'utilisation des couleurs RVB
  console.log('\n=== EXEMPLES AVEC RVB ===');
  console.log(`${rgb(255, 0, 0)}Rouge ${rgb(0, 255, 0)}Vert ${rgb(0, 0, 255)}Bleu${textStyles.reset}`);
  console.log(`${bgRgb(70, 70, 70)} Fond gris foncé ${textStyles.reset}`);
  
  // Afficher les codes ANSI 256 pour les couleurs RVB
  console.log('\n=== CODES ANSI 256 POUR LES COULEURS RVB ===');
  showAnsiCode('pink900', 131, 24, 67);
  showAnsiCode('blue500', 59, 130, 246);
  showAnsiCode('green400', 52, 211, 153);
  showAnsiCode('yellow300', 252, 211, 77);
  showAnsiCode('red600', 220, 38, 38);
  
  // Afficher un exemple de palette 256 couleurs
  console.log('\n=== PALETTE 256 COULEURS (16-231) ===');
  console.log(ansi256Colors.palette(16, 6));
  
  console.log('\n=== FIN DE LA RÉFÉRENCE ===');
}

// Exécuter la fonction main si c'est le point d'entrée
if (import.meta.url === new URL('.', import.meta.url).href) {
  main();
}

// Exporter la fonction de conversion
const getAnsi256Code = (r, g, b) => rgbToAnsi256(r, g, b);

// Exporter par défaut
export default {
  ...textColors,
  ...bgColors,
  ...textStyles,
  rgb,
  bgRgb,
  rgbToAnsi256,
  getAnsi256Code,
  showAllColors,
  showColorGradient,
  main
};

// Exécuter le script si c'est le point d'entrée principal
if (import.meta.url.endsWith(process.argv[1])) {
  main();
}