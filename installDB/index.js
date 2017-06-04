"use strict";

const mongoose = require('mongoose');

//Le decimos a mongoose que libreria de promesas vamos a usar
mongoose.Promise = global.Promise;

//Establecemos la conexión a la base de datos
mongoose.connection.on('error', err => {
    console.log('Error de conexión a la base de datos', err);
    process.exit(1);
});
mongoose.connection.once('open', () => {
    console.log('Conectado a mongodb');
});
mongoose.connect('mongodb://nodepop:nodepopfj@localhost/nodepopBD');

//Borramos la base de datos
function borrado() {
    return new Promise((resolve, reject) => {
        mongoose.connection.dropDatabase( () => {
            console.log('BD borrada');
            resolve();
        });
    });
};
const promesa = borrado();
promesa.then(() => {

    //Definimos un esquema de tag
    const tagSchema = mongoose.Schema ({
        etiqueta: String
    });
    //Creamos el modelo de tags
    const Tag = mongoose.model('Tag', tagSchema);
    //Creamos los tags
    //Tag1 (motor)
    const tag1 = new Tag();
    tag1.etiqueta = 'motor';

    tag1.save((err, tag1) => {
        if (err) {
            console.log('Error al crear el tag');
            return;
        }
        console.log('Tag 1 guardado (motor)');
    });
    //Tag2 (lifestyle)
    const tag2 = new Tag();
    tag2.etiqueta = 'lifestyle';

    tag2.save((err, tag2) => {
        if (err) {
            console.log('Error al crear el tag');
            return;
        }
        console.log('Tag 2 guardado (lifestyle)');
    });
    //Tag3 (mobile)
    const tag3 = new Tag();
    tag3.etiqueta = 'mobile';

    tag3.save((err, tag3) => {
        if (err) {
            console.log('Error al crear el tag');
            return;
        }
        console.log('Tag 3 guardado (mobile)');
    });
    //Tag4 (work)
    const tag4 = new Tag();
    tag4.etiqueta = 'work';

    tag4.save((err, tag4) => {
        if (err) {
            console.log('Error al crear el tag');
            return;
        }
        console.log('Tag 4 guardado (work)');
    });
    
    //Definimos un esquema de Anuncio
    const anuncioSchema = mongoose.Schema({
    articulo: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    usuario: String,
    tag: String
    });
    //Creamos el modelo de Anuncio
    const Anuncio = mongoose.model('Anuncio', anuncioSchema);

    //Creamos tres anuncios
    //Anuncio1
    const anuncio1 = new Anuncio();
    anuncio1.articulo = 'iphone';
    anuncio1.venta = true;
    anuncio1.precio = 387;
    anuncio1.foto = '../nodepop/public/images/anuncio1.png';
    anuncio1.usuario = 'fernando';
    anuncio1.tag = 'mobile';

    anuncio1.save((err, anuncio1) => {
        if (err) {
            console.log('Error al crear el anuncio');
            return;
        }
        console.log('Anuncio 1 guardado');
    });
    //Anuncio2
    const anuncio2 = new Anuncio();
    anuncio2.articulo = 'barco';
    anuncio2.venta = true;
    anuncio2.precio = 18327;
    anuncio2.foto = '../nodepop/public/images/anuncio2.png';
    anuncio2.usuario = 'fernando';
    anuncio2.tag = 'motor';

    anuncio2.save((err, anuncio2) => {
        if (err) {
            console.log('Error al crear el anuncio');
            return;
        }
        console.log('Anuncio 2 guardado');
    });
    //Anuncio3
    const anuncio3 = new Anuncio();
    anuncio3.articulo = 'lampara';
    anuncio3.venta = false;
    anuncio3.precio = 50;
    anuncio3.foto = '../nodepop/public/images/anuncio3.png';
    anuncio3.usuario = 'fernando';
    anuncio3.tag = 'lifestyle';

    anuncio3.save((err, anuncio3) => {
        if (err) {
            console.log('Error al crear el anuncio');
            return;
        }
        console.log('Anuncio 3 guardado');
    });
    //Creamos dos usuarios
    //Definimos un esquema de Usuario
    const usuarioSchema = mongoose.Schema({
        nombre: String,
        email: String,
        password: String
    });
    //Creamos el modelo de Usuario
    var Usuario = mongoose.model('Usuario', usuarioSchema);

    //Usuario 1
    const usuario1 = new Usuario();
    usuario1.nombre = 'isabel';
    usuario1.email = 'isabel@isabel.com';
    usuario1.password = 1234;

    usuario1.save((err, usuario1) => {
        if (err) {
            console.log('Error al crear el usuario');
            return;
        }
        console.log('Usuario 1 guardado');
    });
    //Usuario 2
    const usuario2 = new Usuario();
    usuario2.nombre = 'fernando';
    usuario2.email = 'fernando@fernando.com';
    usuario2.password = 5678;

    usuario2.save((err, usuario2) => {
        if (err) {
            console.log('Error al crear el usuario');
            return;
        }
        console.log('Usuario 2 guardado');
    });
    //Listo

}).catch(err => {
    console.log('Hubo un error al borrar la base de datos');
});