'use strict';

const Localize = require('localize');
const translations = require('./translations.json');
const myLocalize = new Localize(translations);

module.exports = function traduce (texto, idioma) {
    //Esta función traduce del inglés al idioma que se quiera. Por eso he puesto los textos
    //en inglés en el programa
    if (!idioma) {
        idioma = 'es';
    }
    myLocalize.setLocale(idioma);
    return myLocalize.translate(texto);
};
