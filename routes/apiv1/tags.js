"use strict";

const express = require('express');
const router = express.Router();
const Tag = require('../../models/tag');
const mongoose = require('mongoose');
const customError = require('../../lib/customError');



//GET /apiv1/tags  (LISTAR)
router.get('/', function(req, res, next) {
    //Cojo el idioma
    const idioma = req.query.lang;
    //El filtro no le paso. Siempre enviaré el total de tags
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
    Tag.list(null, limit, skip, fields, sort, (err, tags) => {
        if (err) {
            next(err); //Le decimos a express que devuelva el error
            return;
        }
        if (!tags[0]) {
            const mensaje = customError("No tags", 409, idioma);
            res.json(mensaje);
        } else {
            res.json({succes: true, result: tags });
        }
    });
});

//POST /apiv1/tags  (CREAR)
router.post('/', (req, res, next) => {
    //Cojo el idioma
    const idioma = req.query.lang;
    //Creamos un objeto tipo agente
    const tag = new Tag(req.body);
    if (!tag.etiqueta) {
        const mensaje = customError("Missing 'etiqueta'", 409, idioma);
        res.json(mensaje);
        return;
    }
    //Lo guardamos en la base de datos (lo persistimos)
    tag.save((err, tagGuardado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: tagGuardado});
    });
});


//DELETE /apiv1/tags  (BORRAR)
router.delete('/', (req, res, next) => {
    //Cojo el idioma
    const idioma = req.query.lang;
    const etiqueta = req.body.etiqueta;
    if (!etiqueta) {
        const mensaje = customError("Missing 'etiqueta'", 409, idioma);
        res.json(mensaje);
        return;
    }
    //Lo borramos de la base de datos (lo persistimos)
    Tag.remove({etiqueta: etiqueta},(err, tagBorrado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({succes: true, result: 'Borrado ' + etiqueta});
    });
});


module.exports = router;