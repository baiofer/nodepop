"use strict";

const mongoose = require('mongoose');

//Le decimos a mongoose que libreria de promesas vamos a usar
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
    console.log('Error de conexión a la base de datos', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a mongodb');
});

mongoose.connect('mongodb://localhost/nodepopBD');

