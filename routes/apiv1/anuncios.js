"use strict";

var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

//GET /apiv1/anuncios (LISTAR)
router.get('/', function(req, res, next) {
    function obtenerFiltro(req) {
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
            for(let i=0; i<articulo.lenght; i++) {
                articulo[i] = articulo[i].toLowerCase();
            }
            filter1.articulo = articulo;
        }
        let venta = req.query.venta;
        if (venta) {
            //Admito mayusculas o minusculas
            venta = venta.toLowerCase();
            filter1.venta = venta;
        }
        const precio = req.query.precio;  //Usar rangoPrecio
        if (precio) {
            //Saco los dos precios de la cadena
            const rangoPrecio = precio.split(",");
            console.log(rangoPrecio);
            filter1.precio = {$lt:parseInt(rangoPrecio[1]), $gte:parseInt(rangoPrecio[0])};
        }
        let foto = req.query.foto;
        if (foto) {
            //Introducir solo el nombre de la foto (sin ruta ni extensión). Se 
            //admiten mayúsculas o minúsculas
            foto = foto.toLowerCase();
            foto = '../nodepop/public/images/'+foto+'.png';
            filter1.foto = foto;
        }
        let tag = req.query.tag;
        if (tag) {
            //Se admiten mayusculas o minusculas y mas de un tag
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
    //Obtengo el filtro de la consulta
    const filter = obtenerFiltro(req);
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
        res.json({succes: true, result: anuncios });
    });
});


/*
//POST /apiv1/anuncios  (CREAR)
router.post('/', (req, res, next) => {
    //Validaciones

    

    //Creamos un objeto tipo agente
    const agente = new Agente(req.body);
    //Lo guardamos en la base de datos (lo persistimos)
    agente.save((err, agenteGuardado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: agenteGuardado});
    });
});

//POST /apiv1/usuarios/anuncios   (BORRAR)
router.post('/', (req, res, next) => {
    Console.log('Borrado de artículo');
});
*/


module.exports = router;