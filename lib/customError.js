'use strict';

const traduce = require('./traduccion');



function CustomError (message, estado, idioma) {
    //Esta función devuelve un objeto a la API con un formato determinado para
    //permitir la traducción
    let respuesta = {};
    respuesta.succes = false;
    if (message) {

        respuesta.message = traduce(message, idioma);
    }
    if (estado) {
        respuesta.estado = estado;
    }
    return respuesta;
}

module.exports = CustomError;