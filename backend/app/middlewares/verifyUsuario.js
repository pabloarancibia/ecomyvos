const { Usuario } = require("../models/index");

const isUsuarioExist = async (req, res, next) => {
    try {
        const { usuarioId } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        });

        // Persona no existe salgo
        if (!usuario) return res.status(400).json({ message: "Usuario no existe" });

        // Persona existe continua
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, msg: "error en verificación Usuario" });
    }
};
module.exports = { isUsuarioExist };