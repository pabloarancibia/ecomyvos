const { usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    //Login
    signIn(req, res) {
        let { nombreusuario, password } = req.body;

        // Buscar usuario
        usuario.findOne({
            where: {
                nombreusuario: nombreusuario
            }
        }).then(usuario => {

            if (!usuario) {
                res.status(404).json({ msg: "Usuario no encontrado" });
            } else {

                // Comparo contraseña
                if (bcrypt.compareSync(password, usuario.password)) {

                    // Creamos el token
                    let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    // devuelvo el token
                    res.json({
                        usuario: usuario,
                        token: token
                    })

                } else {

                    // Unauthorized Access
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }

            }

        }).catch(err => {
            res.status(500).json(err);
        })

    },

    // Registro
    signUp(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        usuario.create({
            nombreusuario: req.body.nombreusuario,
            password: password
        }).then(usuario => {

            // Creamos el token
            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            // Devolvemos token
            res.json({
                usuario: usuario,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    }
}