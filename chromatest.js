// Test de la fonction chroma (anciennement printStyled)
import chroma from './utils/chroma.js';

console.log('\n=== Test de la fonction chroma ===');
chroma('Texte en rouge', 'red');
chroma('Texte en vert et gras', 'green', 'bright');
chroma('Texte jaune sur fond bleu', 'yellow', 'bgBlue');
chroma('Texte avec plusieurs styles', 'magenta', 'underline', 'blink');
