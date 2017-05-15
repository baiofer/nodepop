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
});

//Creamos un método estático
anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
 
//Exportamos el modelos
module.exports = Anuncio;
