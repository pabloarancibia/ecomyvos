const { Usuario, Rol } = require('../models/index');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const PersonaCtrl = require('./personaController');
const UsuarioCtrl = require('./usuarioController');

// module.exports = {

/**
 * @method signIn
 * @description 
 * Logueo de usuarios
 * @returns Datos de usuario y Token
 */
const signIn = (req, res) => {
    let { nombreusuario, password } = req.body;

    // Buscar usuario
    Usuario.findOne({
        where: {
            nombreusuario: nombreusuario
        },
        include:[{
            model:Rol
        }]
    }).then(Usuario => {

        if (!Usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
        } else {

            // Comparo contraseña
            if (bcrypt.compareSync(password, Usuario.password)) {

                // Creamos el token
                let token = jwt.sign({ Usuario: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });

                // devuelvo datos de usuario
                res.json({
                    Usuario: Usuario,
                    token: token
                })

            } else {

                // Unauthorized Access
                res.status(401).json({ message: "Contraseña incorrecta" })
            }

        }

    }).catch(err => {
        res.status(500).json(err);
    })

}

/**
 * @method Registro
 * @description
* Buscar o Crear Persona
* Crear Usuario y asignar su Rol Alumno
* @middlewares nombre de usuario no exista, Rol exista
* @returns Persona, Usuario, Token
*/
const registroAlumno = async (req, res) => {
    try {
        const result = await PersonaCtrl.buscarOCrearPersona(req);
        let persona = result[0];
        let ustkn = await UsuarioCtrl.crearUsuario(persona.id, 'alumno', req);
        // Respuesta
        res.json({
            Persona: persona,
            Usuario: ustkn.Usuario,
            token: ustkn.token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500), json(error);    
    }

}
module.exports = { registroAlumno, signIn };