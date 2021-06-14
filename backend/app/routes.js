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
const claseCtrl = require('./controllers/claseController');
const asistenciaCtrl = require('./controllers/asistenciaController');



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

router.get(
    '/api/usperrolcount',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    usuarioCtrl.getUsPerRolCount
);

router.get(
    '/api/usperrolcap',
    [authJwt.verifyToken,
    verifyRol.isAdmin],
    usuarioCtrl.getUsPerRolCap);

router.get(
    '/api/uspercapbyrol/:nombrerol',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    usuarioCtrl.getUsPerCapByRol);
    
router.put(
    '/api/modificarusuario',
    [authJwt.verifyToken,
    verifyRol.isAdmin,
    verifyUsuario.isUsuarioExist],
    usuarioCtrl.putUsuario);

router.post(
    '/api/asignarcapacitacion',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    usuarioCtrl.asignarCapacitacion
);

router.post(
    '/api/quitarcapaus',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    usuarioCtrl.quitarCapAUs
);
router.post(
    '/api/inscripcionAlumno',
    [authJwt.verifyToken],
    usuarioCtrl.inscripcionAlumno
);

router.post(
    '/api/quitarinscripcion',
    [authJwt.verifyToken],
    usuarioCtrl.quitarInscripcion
);

router.get(
    '/api/traerCapacitacionesUsuario',
    [authJwt.verifyToken],
    usuarioCtrl.capsUsRegistrado
);

//Routes Capacitacion
router.post(
    '/api/crearcapacitacion',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    capacitacionCtrl.crearCapacitacion);

router.put(
    '/api/modificarcapacitacion/:capacitacionId',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    capacitacionCtrl.putCapacitacion);

router.delete(
    '/api/eliminarcapacitacion/:capacitacionId',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    capacitacionCtrl.deleteCapacitacion);

router.get(
    '/api/capacitaciones',
    [authJwt.verifyToken],
    capacitacionCtrl.getCapacitaciones);

router.get(
    '/api/capclasesasis',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    capacitacionCtrl.getCapsClasesAsis);

router.get(
    '/api/capacitacion/:capacitacionId',
    [authJwt.verifyToken],
    capacitacionCtrl.getCapacitacionById);

router.get(
    '/api/capacitacionesfechas',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor],
    capacitacionCtrl.getCapacitacionesFechas);




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

router.get(
    '/api/getrol',
    [authJwt.verifyToken,
    verifyUsuario.isUsuarioExist],
    rolCtrl.getRol);

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

// Routes Clase
router.post(
    '/api/crearclase',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.crearClase
);
router.put(
    '/api/modificarclase/:claseid',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.putClase
);
router.delete(
    '/api/eliminarclase/:claseid',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.deleteClase
);
router.get(
    '/api/clases',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.getClases
);
router.get(
    '/api/clasesasistencias',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.getClasesAsistencias
);
router.get(
    '/api/clases/:capacitacionid',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    claseCtrl.getClasesByCapId
);

// Alumnos
router.get(
    '/api/alumnosclases/:capacitacionId',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    asistenciaCtrl.getAlumnosClasesByCap
);

// Routes Asistencia
router.post(
    '/api/crearasistencia',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    asistenciaCtrl.crearAsistencia
);
router.get(
    '/api/presentes',
    [authJwt.verifyToken,
    verifyRol.isAdminOrInstructor,
    ],
    asistenciaCtrl.getPresentes
);

module.exports = router;