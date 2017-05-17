"use strict";

const mongoose = require('mongoose');

//Definimos un esquema de Tags
const tagSchema = mongoose.Schema ({
    etiqueta: String
});

//Creamos un método estático
tagSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Tag.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
};

//Creamos el modelo de tags
var Tag = mongoose.model('Tag', tagSchema);
 
//Exportamos el modelo
module.exports = Tag;
