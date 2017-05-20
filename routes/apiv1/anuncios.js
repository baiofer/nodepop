"use strict";

const express = require('express');
const router1= express.Router();
const Anuncio = require('../../models/Anuncio');
const customError = require('../../lib/customError');

//MIDDLEWARE DE AUTENTICACION
const basicAuth = require('../../lib/autorizacion.js');
router1.use(basicAuth); 

//UTILIDADES

function obtenerFiltro(req) {
    //Cojo el idioma
    const idioma = req.query.lang;
    //Recuperamos la llamada, para saber los filtros que debo aplicar y pasar al list
    //Creo el filtro vacio
    const filter1 = {};
    //Añado al filtro los distintos campos que lleguen
    let id = req.query.id;
    if (id) {
        filter1._id= id;
    }
    let articulo = req.query.articulo;
    if (articulo) {
        //Admito el nombre en mayúsculas o minúsculas y permito mas de un articulo
        articulo = articulo.split(',');
        for(let i=0; i<articulo.lenght; i++) {
            articulo[i] = articulo[i].toLowerCase();
        }
        filter1.articulo = articulo;
    }
    let venta = req.query.venta;
    if (venta) {
        //Admito mayusculas o minusculas
        venta = venta.toLowerCase();
        if (venta === 'true'|| venta === 'false') {
            filter1.venta = venta;
        } else {
            return customError("The 'venta' value is not Boolean", 409, idioma);
        }
    }
    const precio = req.query.precio;  //Usar rangoPrecio
    if (precio) {
        //Saco los dos precios de la cadena
        const rangoPrecio = precio.split("-");
        console.log(typeof parseInt(rangoPrecio[0]));
        if (parseInt(rangoPrecio[0]) > 0 && parseInt(rangoPrecio[1]) > 0 ) {
            if (rangoPrecio[0] === '') {
                filter1.precio = {$lt:parseInt(rangoPrecio[1])};
            } else if (rangoPrecio[1] === '') {
                filter1.precio = {$gte:parseInt(rangoPrecio[0])};
            } else {
                filter1.precio = {$lt:parseInt(rangoPrecio[1]), $gte:parseInt(rangoPrecio[0])};
        }
        } else {
            return customError("The 'precio' value is not a number", 409, idioma);
        }
    }
    let foto = req.query.foto;
    if (foto) {
        //Introducir solo el nombre de la foto (sin ruta ni extensión). Se 
        //admiten mayúsculas o minúsculas
        foto = foto.toLowerCase();
        foto = '../nodepop/public/images/'+foto;
        filter1.foto = foto;
    }
    let tag = req.query.tag;
    if (tag) {
        //Se admiten mayusculas o minusculas y mas de un tag
        tag = tag.split(',');
        for (let i=0; i<tag.lenght; i++) {
            tag[i] = tag[i].toLowerCase();
        }
        filter1.tag = tag;
    }
    let usuario = req.query.usuario;
    if (usuario) {
        //Se admiten mayusculas o minusculas
        usuario = usuario.toLowerCase();
        filter1.usuario = usuario;
    }
    return filter1;
}

//METODOS DE LLAMADAS A LA API

//GET /apiv1/anuncios (LISTAR)
router1.get('/', function(req, res, next) {
    //Cojo el idioma
    const idioma = req.query.lang;
    //Obtengo el filtro de la consulta
    const filter = obtenerFiltro(req);
    if (filter.message) {
        res.json(filter);
        return;
    }
    //Obtengo el total de registros a devolver en la consulta
    const limit = parseInt(req.query.limit);
    //Obtengo los registros que me saltaré antes de enviar los solicitados
    const skip = parseInt(req.query.skip);
    //Le digo los campos que quiero que me devuelva de cada registro. Deben ir escritos
    //igual que la definición. El campo que pone mongoose __v no lo saco. Admito mayusculas 
    //y minusculas
    let fields = req.query.fields;
    if (fields) {
        fields = fields.toLowerCase();
    } else {
        fields = ' -__v';
    };
    //Obtengo la ordenacion deseada (al id le pongo el _)
    let sort = req.query.sort;
    if (sort === 'id') {
        sort = '_id';
    }
    //Ejecuto la consulta
    Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
        if (err) {
            next(err); //Le decimos a express que devuelva el error
            return;
        }
        if (!anuncios[0]) {
            const mensaje = customError('No ads', 409, idioma);
            res.json(mensaje);
        } else {
            res.json({succes: true, result: anuncios});
        }
    });
});

//POST /apiv1/anuncios  (CREAR)
router1.post('/', (req, res) => {
    //Cojo el idioma
    const idioma = req.query.lang;
    //Creamos un objeto tipo anuncio
    const anuncio = new Anuncio(req.body);
    if (!anuncio.articulo) {
        const mensaje = customError("Missing 'articulo' in ad", 409, idioma);
        res.json(mensaje);
        return;
    }
    if (!anuncio.venta) {
        const mensaje = customError("Missing 'venta' in ad", 409, idioma);
        res.json(mensaje);
        return;
    }
    if (!anuncio.precio) {
        const mensaje = customError("Missing 'precio' in ad", 409, idioma);
        res.json(mensaje);
        return;
    }
    if (anuncio.foto) {
        anuncio.foto = '../nodepop/public/images/'+anuncio.foto;
    }
    if (!anuncio.usuario) {
        const mensaje = customError("Missing 'usuario' in ad", 409, idioma);
        res.json(mensaje);
        return;
    }
    //Lo guardamos en la base de datos (lo persistimos)
    anuncio.save((err, anuncioGuardado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: anuncioGuardado});
    });
});

//PUT /apiv1/anuncios  (MODIFICAR)
router1.put('/', (req, res) => {
    //Cojo el idioma
    const idioma = req.query.lang;
    let id = req.body.id;
    if (!id) {
        const mensaje = customError("Missing 'id'", 409, idioma);
        res.json(mensaje);
        return;
    }
    let foto = req.body.foto;
    if (foto) {
        req.body.foto = '../nodepop/public/images/'+req.body.foto;
    }
    //Lo guardamos en la base de datos (lo persistimos)
    Anuncio.update({ _id: id }, req.body, (err, anuncioModificado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: 'Modificado ' + req.body.id});
    });
});

//DELETE /apiv1/anuncios  (BORRAR)
router1.delete('/', (req, res, next) => {
    //Cojo el idioma
    const idioma = req.query.lang;
    const id = req.body.id;
    if (!id) {
        const mensaje = customError("Missing 'id'", 409, idioma);
        res.json(mensaje);
        return;
    }
    //Lo borramos de la base de datos (lo persistimos)
    Anuncio.remove({ _id: id },(err, anuncioBorrado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: 'Borrado ' + req.body.id});
    });
});

module.exports = router1;