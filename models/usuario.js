"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Usuario
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    password: String
})

//Creamos el modelo de Usuario
var Usuario = mongoose.model('Usuario', usuarioSchema);

//Exportamos el modelo
module.exports = Usuario;