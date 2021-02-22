/**
 * @description Configuracion rutas principales
 */

const express = require("express");
const router = express.Router();
// Middlewares
const verifySignup = require('./middlewares/verifySignup');

// Controllers
const AuthController = require('./controllers/AuthController');

// home
router.get('/', function (req, res) {
    res.send('server get')
});

// Routes Login & Register
router.post('/api/signin', AuthController.signIn);
router.post(
    '/api/signup',
    [verifySignup.checkDuplicateUsername],
    AuthController.signUp
);


module.exports = router;