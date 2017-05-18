"use strict"

const sha256 = require('sha256');
const basicAuth = require('basic-auth');
const buscaUsuario = require ('../lib/utilUsuarios');

module.exports = (req, res, next) => {
    const user = basicAuth(req);
     if (!user) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    };
    //Buscar en la base de datos el usuario user.name y comprobar el password
    
    const usuarioBuscado = buscaUsuario(user.name, (err, userBuscado) => {
        if (!userBuscado) {
            console.log('No existe el usuario en la BD');
            return;
        };
        //Compruebo el password
        if (user.pass !== (userBuscado[0].password)) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
        next();
    });
}


