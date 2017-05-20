"use strict"

const sha256 = require('sha256');
const basicAuth = require('basic-auth');
const buscaUsuario = require('../lib/utilUsuarios');

module.exports = (req, res, next) => {
    const user = basicAuth(req);
     if (!user) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    };
    //Buscar en la base de datos el usuario user.name y comprobar el password
    
    const usuarioBuscado = buscaUsuario(user.name, (err, userBuscado) => {
        if (err) {
            next(err);
            return;
        }
        if (!userBuscado) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        };
        //Compruebo el password, usando el hash sha256.
        if (user.pass !== sha256(userBuscado[0].password)) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
        next();
        return;
    });
}


