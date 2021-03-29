const { Usuario, Rol, Persona } = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { Op } = require("sequelize");


/**
 * Crear usuario - uso privado
 * @param {*} personaid 
 * @param {*} nombrerol 
 * @param {*} req nombreusuario
 * @res json usuario y token
 */
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
    const usuarios = await Usuario.findAll({
        where: {
            estado: {
                [Op.notLike]: '%eliminado'
            }
        }
    });
    return res.json(usuarios);
}

const getUsuariosByRol = async (req, res) => {
    const rol = await Rol.findOne({ where: { nombrerol: req.params.nombrerol } });
    const usuarios = await rol.getUsuarios();
    return res.json(usuarios);
}

/**
 * Crear usuario para administradores
 * @param personaId
 * @param nombrerol
 * @param {*} req password
 * @param {*} res 
 * @middlewares isAdmin, checkDuplicateUsername, isRolExist, isPersonaRolNotExist
 */
const nuevoUsuario = async (req, res) => {
    try {
        const nuevousuario = await crearUsuario(req.body.personaId, req.body.nombrerol, req);
        return res.json(nuevousuario);
    } catch (error) {
        return res.json({ message: "error al crear usuario", error })
    }

}

/**
 *  Obtener Usuarios con persona y rol
 * @param {*} res 
 * @returns Usuarios con persona y rol
 * @middleware isAdmin
 */
const getUsPerRol = async (req, res) => {
    try {
        const query = await Usuario.findAll({
            where: {
                estado: {
                    [Op.notLike]: '%eliminado'
                }
            },
            include:[
                {model:Persona},
                {model:Rol}
            ]
        });
        return res.json(query);
    } catch (error) {
        return res.json({ message: "error al obtener datos de usuario", error })
        
    }
}

/**
 * Modificar Usuario
 * @param {*} req body: usuarioID
 * @param {*} res Usuario
 * @returns Usuario
 * @middleware isAdmin, isRolExist, isUserExist
 */
const putUsuario = async (req, res) => {
    try {
        await Usuario.update(req.body, {
            where: {
                id: req.body.usuarioId
            }
        });
        return res.json({ success: 'Modificación correcta' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = { crearUsuario, getUsuarios, getUsuariosByRol, nuevoUsuario, getUsPerRol, putUsuario };