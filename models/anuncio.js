"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const anuncioSchema = mongoose.Schema({
    articulo: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    usuario: String,
    tags: []
})

//Creamos el modelo de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
 
//Exportamos el modelos
module.exports = Anuncio;
