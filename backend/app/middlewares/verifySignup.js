/**
 * @description Middlewares para verificacion en signUp,
 */
const { Usuario } = require('../models/index');


/**
 * @method Verifico que no exista username. 
 */
const checkDuplicateUsername = async (req, res, next) => {
    try {

        let { nombreusuario } = req.body;
        console.log(nombreusuario)

        const usuario = await Usuario.findOne({
            where: {
                nombreusuario: nombreusuario
            },
            attributes: {exclude: ['password']},

        });

        // si existe usuario res 400
        if (usuario) return res.status(400).json({ message: "Usuario ya existe" });

        // Si !usuario continuo
        next();
    } catch (error) {
        res.status(500).json({ message: error, message: "error en middleware signup" });
    }

};
module.exports = { checkDuplicateUsername };