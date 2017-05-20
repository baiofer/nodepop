"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Anuncio
const anuncioSchema = mongoose.Schema({
    articulo: {
        type: String,
        index: 'text',
        unique: true
    },
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number,
        index: true
    },
    foto: String,
    usuario: {
        type: String,
        index: true,
        unique: true
    },
    tags: {
        type: [String],
        index: true
    }
});

//Creamos un método estático
anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);  //{nombredecampo: 1 campoquenoquiero:0}
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);
 
//Exportamos el modelos
module.exports = Anuncio;
