/**
 * @description Configuracion rutas principales
 */

const express = require("express");
const router = express.Router();

// Middlewares
const verifySignup = require('./middlewares/verifySignup');
const authJwt = require("./middlewares/authJwt");
const verifyRol = require("./middlewares/verifyRol");
const verifyUsuario = require("./middlewares/verifyUsuario");
const verifyPersona = require("./middlewares/verifyPersona");


// Controllers
const AuthCtrl = require('./controllers/AuthController');
const capacitacionCtrl = require('./controllers/capacitacionController');
const rolCtrl = require('./controllers/rolController');
const personaCtrl = require('./controllers/personaController');
const usuarioCtrl = require('./controllers/usuarioController');



/**
 * Routes
 */

// home
router.get('/', function (req, res) {
    res.send('server get')
});

// Routes Login & Register
router.post('/api/signin', AuthCtrl.signIn);

router.post(
    '/api/registroalumno',
    [verifyRol.isRolExist,
    verifySignup.checkDuplicateUsername,
    verifyPersona.isPersonaNotExist],
    AuthCtrl.registroAlumno
);

//Routes Usuario
router.get(
    '/api/usuarios',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    usuarioCtrl.getUsuarios
);
router.get(
    '/api/usuarios/rol/:nombrerol',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    usuarioCtrl.getUsuariosByRol
);
router.post(
    '/api/nuevousuario',
    [
    authJwt.verifyToken,
    verifySignup.checkDuplicateUsername,
    verifyRol.isRolExist,
    verifyRol.isRolPeronaNotExist],
    usuarioCtrl.nuevoUsuario
);
router.get(
    '/api/usperrol',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    usuarioCtrl.getUsPerRol
);
router.put(
    '/api/modificarusuario',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyUsuario.isUsuarioExist],
    usuarioCtrl.putUsuario);

//Routes Capacitacion
router.post(
    '/api/crearcapacitacion',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    capacitacionCtrl.crearCapacitacion);

router.put(
    '/api/modificarcapacitacion/:capacitacionId',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    capacitacionCtrl.putCapacitacion);

router.get(
    '/api/capacitaciones',
    [authJwt.verifyToken],
    capacitacionCtrl.getCapacitaciones);

router.get(
    '/api/capacitacion/:capacitacionId',
    [authJwt.verifyToken],
    capacitacionCtrl.getCapacitacionById);

// Routes Rol
router.post(
    '/api/crearrol',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    rolCtrl.crearRol
);

router.post(
    '/api/asignarrol',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyRol.isRolExist,
    verifyUsuario.isUsuarioExist],
    rolCtrl.asignarRol
);

router.put(
    '/api/modificarrol/:rolId',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    rolCtrl.putRol);

router.get(
    '/api/roles',
    [authJwt.verifyToken, verifyRol.isAdmin],
    rolCtrl.getRoles);

// Routes Persona
router.post(
    '/api/crearpersonayusuario',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyPersona.isPersonaNotExist,
    verifySignup.checkDuplicateUsername,
    verifyRol.isRolExist],
    personaCtrl.crearPersonaYUsuario
);

router.put(
    '/api/modificarpersona/:personaId',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyPersona.isPersonaIdExist],
    personaCtrl.putPersona);

router.get(
    '/api/personas',
    [authJwt.verifyToken, verifyRol.isAdmin],
    personaCtrl.getPersonas);

router.get(
    '/api/persona/:personaId',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyPersona.isPersonaIdExist],
    personaCtrl.getPersonaById);

router.get(
    '/api/personas/rol/:nombrerol',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    personaCtrl.getPersonasByRol);


module.exports = router;