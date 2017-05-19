'use strict';

const Usuario = require('../models/Usuario');

//Función para buscar un usuario en la BD
function buscaUsuario(nombreUsuario, callback) {
    Usuario.find({nombre: nombreUsuario}).exec((err, usuarioEncontrado) => {
        console.log(usuarioEncontrado);
        if (err) {
            return callback(err);
        }
        return callback(null, usuarioEncontrado);
    });
}

module.exports = buscaUsuario;

