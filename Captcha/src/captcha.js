const svgCaptcha = require('svg-captcha');
const fs = require('fs');

// Générer un CAPTCHA
const captcha = svgCaptcha.create();

// Enregistrer l'image CAPTCHA dans un fichier
fs.writeFileSync('captcha.svg', captcha.data);

// Afficher le texte du CAPTCHA dans la console
console.log("Ecrit le texte qui s'affiche :", captcha.text);
