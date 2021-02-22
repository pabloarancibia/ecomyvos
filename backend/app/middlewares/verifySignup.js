/**
 * @description Middlewares para verificacion en signUp,
 */
const { Usuario } = require('../models/index');


/**
 * @method Verifico si ya existe nombre de usuario. 
 */
const checkDuplicateUsername = async (req, res, next) => {
    try {

        let { nombreusuario } = req.body;
        console.log(nombreusuario)

        // Buscar usuario
        // Usuario.findOne({
        //     where: {
        //         nombreusuario: nombreusuario
        //     }
        // }).then(Usuario => {

        //     if (Usuario) {
        //         console.log("chk")
        //         return res.status(400).json({ message: "Usuario ya existe" });
        //     } else {
        //         console.log("chk2")
        //         next();
        //     };

        const usuario = await Usuario.findOne({

            where: {
                nombreusuario: nombreusuario
            }
        });

        // });
        console.log("chk")

        if (usuario) return res.status(400).json({ message: "Usuario ya existe" });
        console.log("chk2")
        next();
    } catch (error) {
        res.status(500).json({ message: error, msg: "error en middleware" });
    }

};
module.exports = { checkDuplicateUsername };