/**
 * @description Middlewares para verificacion de Token de usuario,
 */

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { Usuario } = require('../models/index');


/**
 * @method Verifico si el token es valido.
 * Extraigo el id de usuario del token 
 * Valido ese id de usuario
 */
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) return res.status(400).json({ message: "Token no provisto" });

        const decoded = jwt.verify(token, authConfig.secret)

        req.userId = decoded.Usuario.id;

        const usuario = await Usuario.findByPk(req.userId)
        if (!usuario) return res.status(404).json({ message: "No existe usuario" });


        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "No Autorizado (error en token o vencido)" });
    }
};
module.exports = { verifyToken };