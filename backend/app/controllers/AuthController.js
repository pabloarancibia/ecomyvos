const { Usuario, Persona, Rol, PersonaRoles } = require('../models/index');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    //Login
    signIn(req, res) {
        let { nombreusuario, password } = req.body;

        // Buscar usuario
        Usuario.findOne({
            where: {
                nombreusuario: nombreusuario
            }
        }).then(Usuario => {

            if (!Usuario) {
                res.status(404).json({ msg: "Usuario no encontrado" });
            } else {

                // Comparo contraseña
                if (bcrypt.compareSync(password, Usuario.password)) {

                    // Creamos el token
                    let token = jwt.sign({ Usuario: Usuario }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    // devuelvo el token
                    res.json({
                        Usuario: Usuario,
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
        /**
         * @method
         * @description Registrar un nuevo usuario
         * Primero se deberá buscar si Persona existe (CUIL).
         * Si: Se guarda usuario a esa Persona.
         * No: Se guarda Persona y luego Usuario.
         * ** Previamente se verifica en middleware:
         * nombre de usuario no exista
         * Rol exista
         */

        // Busco Persona
        Persona.findOrCreate({
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
        }).then(function (result) {
            let persona = result[0];

            // Encriptamos la contraseña
            let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

            // Crear un usuario
            Usuario.create({
                nombreusuario: req.body.nombreusuario,
                password: password,
                PersonaId: persona.id

            }).then(Usuario => {

                // Creamos el token
                let token = jwt.sign({ Usuario: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                })

                //Asigno Rol a Persona
                const rol = Rol.findOne({
                    where: {
                        nombrerol: req.body.nombrerol
                    }
                }).then(rol => {
                    PersonaRoles.create({
                        PersonaId: persona.id,
                        RolId: rol.id
                    });

                    // Respuesta
                    res.json({
                        Usuario: Usuario,
                        token: token
                    });

                }).catch(err => {
                    res.status(500).json(err);
                });


            }).catch(err => {
                res.status(500).json(err);
            });

        }).catch(err => {
            res.status(500).json(err);
        });



    }
}