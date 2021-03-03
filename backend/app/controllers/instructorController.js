const PersonaCtrl = require('./personaController');
const UsuarioCtrl = require('./usuarioController');

/**
 * 
 * @param {*} req 
 * @description Creacion de Persona y Usuario con Rol Instructor
 * @middlewares isAdmin isPersonaNotExist isUserNotExist isRolExist
 * @returns Persona, Usuario
 */
const crearInstructor = async (req, res) => {
    const persona = await PersonaCtrl.crearPersona(req);

    let ustkn = await UsuarioCtrl.crearUsuario(persona.id, 'instructor', req);

    // Respuesta
    res.json({
        Persona: persona,
        Usuario: ustkn.Usuario,
    });
}

module.exports = { crearInstructor }