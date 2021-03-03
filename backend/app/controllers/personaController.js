const { Persona, Rol, Usuario } = require("../models/index");

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

module.exports = {
    buscarOCrearPersona, crearPersona, putPersona,
    getPersonas, getPersonaById, getPersonasByRol
};