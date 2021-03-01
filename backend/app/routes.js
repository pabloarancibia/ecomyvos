/**
 * @description Configuracion rutas principales
 */

const express = require("express");
const router = express.Router();

// Middlewares
const verifySignup = require('./middlewares/verifySignup');
const authJwt = require("./middlewares/authJwt");
const verifyRol = require("./middlewares/verifyRol");
const verifyPersona = require("./middlewares/verifyPersona");


// Controllers
const AuthCtrl = require('./controllers/AuthController');
const capacitacionCtrl = require('./controllers/capacitacionController');
const rolCtrl = require('./controllers/rolController');



/**
 * Routes
 */

// home
router.get('/', function (req, res) {
    res.send('server get')
});

// Routes Login & Register
// router.post('/api/signin', AuthCtrl.signIn);
// router.post(
//     '/api/signup',
//     [verifySignup.checkDuplicateUsername,
//     verifyRol.isRolExist],
//     AuthCtrl.signUp
// );

router.post(
    '/api/registro',
    [verifySignup.checkDuplicateUsername,
    verifyRol.isRolExist],
    AuthCtrl.registro
);

//Routes Capacitacion
router.post(
    '/api/crearcapacitacion',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    capacitacionCtrl.crearCapacitacion);

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
    verifyPersona.isPersonaExist],
    rolCtrl.asignarRol
);

router.post(
    '/api/retirarrol',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyRol.isRolExist,
    verifyPersona.isPersonaExist],
    rolCtrl.retirarRol
);


module.exports = router;