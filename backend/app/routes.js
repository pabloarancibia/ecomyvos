/**
 * @description Configuracion rutas principales
 */

const express = require("express");
const router = express.Router();

// Middlewares
const verifySignup = require('./middlewares/verifySignup');
const authJwt = require("./middlewares/authJwt");
const verifyRol = require("./middlewares/verifyRol");

// Controllers
const AuthCtrl = require('./controllers/AuthController');
const capacitacionCtrl = require('./controllers/capacitacionController');


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
    '/api/signup',
    [verifySignup.checkDuplicateUsername],
    AuthCtrl.signUp
);

//Routes Capacitacion
router.post(
    '/api/crearcapacitacion',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    capacitacionCtrl.crearCapacitacion);


module.exports = router;