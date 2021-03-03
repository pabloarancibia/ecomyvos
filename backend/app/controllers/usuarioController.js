const { Usuario, Rol } = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const crearUsuario = async (personaid, nombrerol, req) => {

    // Encriptamos la contraseña
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    //Busco id Rol
    const rol = await Rol.findOne({
        where: {
            nombrerol: nombrerol
        }
    });

    const nuevoUsuario = await Usuario.create({
        nombreusuario: req.body.nombreusuario,
        password: password,
        PersonaId: personaid,
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
const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
}

const getUsuariosByRol = async (req, res) => {
    const rol = await Rol.findOne({ where: { nombrerol: req.params.nombrerol } });
    const usuarios = await rol.getUsuarios();
    return res.json(usuarios);
}

module.exports = { crearUsuario, getUsuarios, getUsuariosByRol };