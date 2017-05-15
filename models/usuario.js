"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Usuario
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    password: String
})

//Creamos un método estático
usuarioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Usuario.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de Usuario
var Usuario = mongoose.model('Usuario', usuarioSchema);

//Exportamos el modelo
module.exports = Usuario;