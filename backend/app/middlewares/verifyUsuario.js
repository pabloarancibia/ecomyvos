const { Usuario } = require("../models/index");

/**
 * verifico que SI exista el usuario enviado
 * por req body
 */
const isUsuarioExist = async (req, res, next) => {
    try {
        const { usuarioId } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        });

        // Usuario no existe salgo
        if (!usuario) return res.status(400).json({ message: "Usuario no existe" });

        // Usuario existe continua
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en verificación Usuario" });
    }
};

/**
 * Verifico que el usuarioId enviado en body
 * sea el mismo que el del token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarUsuarioRegistrado = async(req, res, next) =>{
    const {usuarioId, capacitacionId} = req.body;

    //  Verifico que el token userid sea igual al usuarioId enviado
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(400).json({ message: "Token no provisto" });

        const decoded = jwt.verify(token, authConfig.secret)

        const userId = decoded.Usuario.id;

        if (userId != usuarioId) return res.status(404).json({ message: "No Autorizado" });
        

        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "No Autorizado (error en token o vencido)" });
    }
}
module.exports = { isUsuarioExist };