"use strict";

var express = require('express');
var router = express.Router();

const Usuario = require('../../models/Usuario');

//POST /apiv1/usuarios  (CREAR)
router.post('/', (req, res, next) => {
    //Creamos un objeto tipo agente
    const usuario = new Usuario(req.body);
    //Lo guardamos en la base de datos (lo persistimos)
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            //next(err);
            return res.json({result: false, error: err});
        }
        res.json({succes: true, result: usuarioGuardado});
    });
});

//GET /apiv1/usuarios (LISTAR)
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

//PUT /apiv1/usuarios  (MODIFICAR)
router.put('/:id', (req, res, next) => {
    let id = req.params.id;

    Usuario.update({ _id: id }, req.body, (err, usuarioModificado) => {
        if (err) {
            return next(err);
        }
        // Se devuelve el registro indicando que ha ido correctamente
        res.json({ succes: true, result: usuarioModificado });
    });
});

//DELETE /apiv1/usuarios  (BORRAR)
router.delete('/:id', (req, res, next) => {
    //Lo borramos de la base de datos (lo persistimos)
    Usuario.remove({ _id: req.params.id },(err, usuarioBorrado) => {
        if (err) {
            //next(err);
            return res.json({result: false, error: err});
        }
        res.json({succes: true, result: usuarioBorrado});
    });
});


module.exports = router;