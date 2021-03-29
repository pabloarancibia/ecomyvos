const { Usuario, Rol } = require('../models/index');

/**
 * Verifico si el usuario logueado tiene rol administrador
 * userId es previamente almacenado cuando verifica el token
 * este middle siempre tiene que ir despues de verifyToken
 */
const isAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        const rol = await usuario.getRol();

        if (rol.nombrerol === "admin") {
            next();
            return;
        }

        return res.status(403).json({ message: "Requiere Rol Admin !" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error, message: "error verificando admin" });
    }
};

/**
 * Recibe nombrerol del body y verifica que exista
 * para crear rol, asignar rol, etc.
 */
const isRolExist = async (req, res, next) => {
    try {
        const { nombrerol } = req.body;
        const rol = await Rol.findOne({
            where: {
                nombrerol: nombrerol
            }
        });

        // rol no existe salgo
        if (!rol) return res.status(400).json({ message: "Rol no existe" });

        // rol existe continua
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en middleware rol" });
    }
}

/**
 * Verifico que No exista Persona con ese Rol
 * @param {*} req personaId y nombrerol
 * @param {*} res error si existe persona con ese rol
 * @param {*} next si no existe persona cone se rol
 */
const isRolPeronaNotExist = async (req, res, next) => {
    try {
        const { nombrerol } = req.body;
        const rol = await Rol.findOne({
            where: {
                nombrerol: nombrerol
            }
        });
        const personarol = await Usuario.findOne({
            where: {
                RolId: rol.id,
                PersonaId: req.body.personaId
            }
        });

        if (personarol) return res.status(400).json({ message: "Ya existe Persona con ese Rol" });

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en middleware persona rol" });
    }
}

module.exports = { isAdmin, isRolExist, isRolPeronaNotExist };