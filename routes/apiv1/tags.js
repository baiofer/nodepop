"use strict";

var express = require('express');
var router = express.Router();

const Tag = require('../../models/Tag');

//GET /apiv1/tags  (LISTAR)
router.get('/', function(req, res, next) {
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
        res.json({succes: true, result: tags });
    });
});

//POST /apiv1/tags  (CREAR)
router.post('/', (req, res, next) => {
    //Creamos un objeto tipo agente
    const tag = new Tag(req.body);
    //Lo guardamos en la base de datos (lo persistimos)
    tag.save((err, tagGuardado) => {
        if (err) {
            //next(err);
            return res.json({result: false, error: err});
        }
        res.json({succes: true, result: tagGuardado});
    });
});

//PUT /apiv1/tags  (MODIFICAR)
router.put('/:_id', (req, res, next) => {
    let opciones = {};
    //Lo guardamos en la base de datos (lo persistimos)
    Tag.update({ _id: req.params.id }, req.body, (err, tagModificado) => {
        if (err) {
            //next(err);
            return res.json({result: false, error: err});
        }
        res.json({succes: true, result: tagModificado});
    });
});

//DELETE /apiv1/tags  (BORRAR)
router.delete('/:id', (req, res, next) => {
    //Lo borramos de la base de datos (lo persistimos)
    Tag.remove({ _id: req.params.id },(err, tagBorrado) => {
        if (err) {
            //next(err);
            return res.json({result: false, error: err});
        }
        res.json({succes: true, result: tagBorrado});
    });
});

module.exports = router;