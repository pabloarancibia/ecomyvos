const { Usuario, Rol } = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const crearUsuario = async (persona, req) => {

    // Encriptamos la contraseña
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    //Busco id Rol
    const rol = await Rol.findOne({
        where: {
            nombrerol: req.body.nombrerol
        }
    });

    const nuevoUsuario = await Usuario.create({
        nombreusuario: req.body.nombreusuario,
        password: password,
        PersonaId: persona.id,
        RolId: rol.id
    });

    // Creamos el token
    let token = await jwt.sign({ Usuario: nuevoUsuario }, authConfig.secret, {
        expiresIn: authConfig.expires
    })


    let ustkn = {
        Usuario: nuevoUsuario,
        token: token
    };

    return ustkn;

}

module.exports = { crearUsuario };