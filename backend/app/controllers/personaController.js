const { Persona, Rol } = require("../models/index");

const buscarOCrearPersona = async (req) => {
    const resultado = await Persona.findOrCreate({
        where: {
            cuil: req.body.cuil
        },
        defaults: {
            cuil: req.body.cuil,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            genero: req.body.genero,
            fechanacimiento: req.body.fechanacimiento,
        }
    });
    return resultado;
}

const crearPersona = async (req) => {
    const persona = await Persona.create({
        cuil: req.body.cuil,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        genero: req.body.genero,
        fechanacimiento: req.body.fechanacimiento,
    });

    return persona;
}

const putPersona = async (req, res) => {
    await Persona.update(req.body, {
        where: {
            id: req.params.personaId
        }
    });

    return res.json({ success: 'modificacion existosa' });
}

const getPersonas = async (req, res) => {
    const personas = await Persona.findAll();
    return res.json(personas);
}

const getPersonaById = async (req, res) => {
    const persona = await Persona.findOne({
        where: {
            id: req.params.personaId
        }
    });
    return res.json(persona);
}

const getPersonasByRol = async (req, res) => {
    const rol = await Rol.findOne({ where: { nombrerol: req.params.nombrerol } });
    const usuarios = await rol.getUsuarios();
    // const personas = await Persona.findAll({
    //     where: {
    //         id: usuarios.PersonaId
    //     }
    // })
    return res.json(usuarios);
}

/**
 * @description Creacion de Persona y Usuario para administradores
 * @middlewares isAdmin isPersonaNotExist isUserNotExist isRolExist
 * @param {*} req - body: datos persona y nombrerol
 * @returns Persona, Usuario
 */
const crearPersonaYUsuario = async (req, res) => {
    const persona = await PersonaCtrl.crearPersona(req);
    const nombrerol = req.body.nombrerol;

    let ustkn = await UsuarioCtrl.crearUsuario(persona.id, nombrerol, req);

    // Respuesta
    res.json({
        Persona: persona,
        Usuario: ustkn.Usuario,
    });
}

module.exports = {
    buscarOCrearPersona, crearPersona, putPersona, crearPersonaYUsuario,
    getPersonas, getPersonaById, getPersonasByRol,
};