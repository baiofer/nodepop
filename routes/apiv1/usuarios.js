"use strict";

var express = require('express');
var router = express.Router();

const Usuario = require('../../models/Usuario');

//GET /apiv1/usuarios
router.get('/', function(req, res, next) {
    //Recuperamos la llamada, para saber los filtros que debo aplicar y pasar al list
    //Creo el filtro vacio
    const filter = {};
    //Añado al filtro los distintos campos que lleguen
    let id = req.query.id;
    if (id) {
        filter._id = id;
    }
    const nombre = req.query.nombre;  //is case sensitive
    if (nombre) {
        filter.nombre = nombre;
    }
    const email = req.query.email;    //is case sensitive
    if (email) {
        filter.email = email;
    }
    const password = req.query.password;  //is case sensitive
    if (password) {
        filter.password = password;
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
    let sort = (req.query.sort);
    if (sort === 'id') {
        sort = '_id';
    }
    //Ejecuto la consulta
    Usuario.list(filter, limit, skip, fields, sort, (err, usuarios) => {
        if (err) {
            next(err); //Le decimos a express que devuelva el error
            return;
        }
        res.json({succes: true, result: usuarios });
    });
});


/*
//Petición para crear un agente POST /apiv1/agentes
router.post('/', (req, res, next) => {
    console.log(req.body);

    //Aqui podriamos hacer las validaciones que quisiesemos
    //antes de crear el agente

    //creamos un objeto tipo agente
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
*/



module.exports = router;