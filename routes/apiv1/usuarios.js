"use strict";

var express = require('express');
var router = express.Router();

const Usuario = require('../../models/Usuario');

//GET /apiv1/usuarios
router.get('/', function(req, res, next) {

    //Usuario.list(filter, limit, skip, fields, sort, (err, usuarios) => {
    Usuario.list(null, null, null, null, null, (err, usuarios) => {
        if (err) {
            next(err); //Le decimos a express que devuelva el error
            return;
        }
        res.json({succes: true, result: usuarios });
    })
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