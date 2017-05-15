"use strict";

var express = require('express');
var router = express.Router();

const Anuncio = require('../../models/Anuncio');

//GET /apiv1/anuncios (LISTAR)
router.get('/', function(req, res, next) {

    //Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
    Anuncio.list(null, null, null, null, null, (err, anuncios) => {
        if (err) {
            next(err); //Le decimos a express que devuelva el error
            return;
        }
        res.json({succes: true, result: anuncios });
    })
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