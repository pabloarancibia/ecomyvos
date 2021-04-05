const { Usuario, Rol, Persona, Capacitacion, UsuarioCapacitaciones } = require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { Op } = require("sequelize");


/**
 * Crear usuario - uso privado
 * @param {*} personaid 
 * @param {*} nombrerol 
 * @param {*} req nombreusuario
 * @res json usuario y token
 */
const crearUsuario = async (personaid, nombrerol, req) => {

    // Encriptamos la contraseña
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    //Busco id Rol
    const rol = await Rol.findOne({
        where: {
            nombrerol: nombrerol
        }
    });

    const nuevoUsuario = await Usuario.create({
        nombreusuario: req.body.nombreusuario,
        password: password,
        PersonaId: personaid,
        RolId: rol.id
    });

    // Creamos el token
    let token = await jwt.sign({ Usuario: nuevoUsuario }, authConfig.secret, {
        expiresIn: authConfig.expires
    })


    let ustkn = {
        Usuario: nuevoUsuario,
        token: token
    };

    return ustkn;

}
const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll({
        where: {
            estado: {
                [Op.notLike]: '%eliminado'
            }
        }
    });
    return res.json(usuarios);
}

const getUsuariosByRol = async (req, res) => {
    const rol = await Rol.findOne({ where: { nombrerol: req.params.nombrerol } });
    const usuarios = await rol.getUsuarios();
    return res.json(usuarios);
}

/**
 * Crear usuario para administradores
 * @param personaId
 * @param nombrerol
 * @param {*} req password
 * @param {*} res 
 * @middlewares isAdmin, checkDuplicateUsername, isRolExist, isPersonaRolNotExist
 */
const nuevoUsuario = async (req, res) => {
    try {
        const nuevousuario = await crearUsuario(req.body.personaId, req.body.nombrerol, req);
        return res.json(nuevousuario);
    } catch (error) {
        return res.json({ message: "error al crear usuario", error })
    }

}

/**
 *  Obtener Usuarios con persona y rol
 * @param {*} res 
 * @returns Usuarios con persona y rol
 * @middleware isAdmin
 */
const getUsPerRol = async (req, res) => {
    try {
        const query = await Usuario.findAll({
            where: {
                estado: {
                    [Op.notLike]: '%eliminado'
                }
            },
            include:[
                {model:Persona},
                {model:Rol}
            ]
        });
        return res.json(query);
    } catch (error) {
        return res.json({ message: "error al obtener datos de usuario", error })
        
    }
}

/**
 * Obtener Usuarios con su Rol, Persona y Caps.
 * @param {*} req 
 * @param {*} res 
 * todos los Usuarios->Personas->Roles-Caps relacionados
 * @returns  
 */
 const getUsPerRolCap = async (req, res) => {
    try {
        const query = await Usuario.findAll({
            where: {
                estado: {
                    [Op.notLike]: '%eliminado'
                }
            },
            include:[
                {model:Persona},
                {model:Rol},
                {model:Capacitacion}
            ]
        });
        return res.json(query);
    } catch (error) {
        return res.json({ message: "error al obtener datos", error })
        
    }
}

/**
 * Obtener Usuarios Persona y Caps segun su Rol.
 * @param {*} req body: nombrerol
 * @param {*} res 
 * @returns todos los Usuarios->Personas->Caps relacionados
 * segun su Rol
 */
 const getUsPerCapByRol = async (req, res) => {
    try {
        const {nombrerol} = req.params;
        const rol = await Rol.findOne({ where: { nombrerol: nombrerol } });
        const query = await Usuario.findAll({
            where: {
                estado: {
                    [Op.notLike]: '%eliminado'
                }
            },
            include:[
                {model:Persona},
                {model: Capacitacion},
                {
                    model:Rol,
                    where: {
                        id: rol.id
                    }
                }

            ]
        });
        return res.json(query);
    } catch (error) {
        return res.json({ message: "error al obtener datos", error })
        
    }
}

/**
 * Modificar Usuario
 * @param {*} req body: usuarioID
 * @param {*} res Usuario
 * @returns Usuario
 * @middleware isAdmin, isRolExist, isUserExist
 */
const putUsuario = async (req, res) => {
    try {
        await Usuario.update(req.body, {
            where: {
                id: req.body.usuarioId
            }
        });
        return res.json({ success: 'Modificación correcta' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

/**
 * Asigno capacitacion a Usuario
 * @param {*} req body usuarioId, capacitacionId
 * @param {*} res success o error message
 */
 const asignarCapacitacion = async (req, res) =>{
    const {usuarioId, capacitacionId} = req.body;
    Usuario.findOne(
        {
            where:{id:usuarioId}
        }).then(usuario=>{
            Capacitacion.findOne(
                {
                    where:{id:capacitacionId}
                }).then(capacitacion=>{
                    if (!usuario || !capacitacion){
                        res.status(500).json({message:'error en asignacion'}
                    )};

                    // ok
                    usuario.setCapacitacions(capacitacion);
                    return res.json({ success: 'Asignación correcta' });


                }).catch(err=>{
                    res.status(500).json({message:'Error en asignacion',err});
                });
            
        }).catch(err=>{
            res.status(500).json({message:'Error en asignacion',err});
        });
}

/**
 * Quitar capacitacion a Usuario
 * @param {*} req body usuarioId, capacitacionId
 * @param {*} res success o error message
 */
 const quitarCapAUs = async (req, res) =>{
    const {usuarioId, capacitacionId} = req.body;
    Usuario.findOne(
        {
            where:{id:usuarioId}
        }).then(usuario=>{
            Capacitacion.findOne(
                {
                    where:{id:capacitacionId}
                }).then(capacitacion=>{
                    if (!usuario || !capacitacion){
                        res.status(500).json({message:'error en eliminacion'}
                    )};

                    // ok
                    UsuarioCapacitaciones.destroy({
                        where: {
                            UsuarioId: usuario.id,
                            CapacitacionId: capacitacion.id
                        }
                    })
                    
                    return res.json({ success: 'Eliminación correcta' });


                }).catch(err=>{
                    res.status(500).json({message:'Error en eliminacion',err});
                });
            
        }).catch(err=>{
            res.status(500).json({message:'Error en eliminacion',err});
        });
}

/**
 * Inscripcion para Alumno registrado.
 * saco el userId del token
 * @param {*} req capacitacionId
 * @param {*} res success o error message
 */
 const inscripcionAlumno = async (req, res) =>{
    const usuarioId = req.userId;
    const {capacitacionId} = req.body;

    Usuario.findOne(
        {
            where:{id:usuarioId}
        }).then(usuario=>{
            Capacitacion.findOne(
                {
                    where:{id:capacitacionId}
                }).then(capacitacion=>{
                    if (!usuario || !capacitacion){
                        res.status(500).json({message:'error en asignacion'}
                    )};

                    // ok
                    usuario.setCapacitacions(capacitacion);
                    return res.json({ success: 'Asignación correcta' });


                }).catch(err=>{
                    res.status(500).json({message:'Error en asignacion',err});
                });
            
        }).catch(err=>{
            res.status(500).json({message:'Error en asignacion',err});
        });
}

/**
 * Quitar inscripcion a Usuario Registrado
 * saco userId del header token
 * @param {*} req capacitacionId
 * @param {*} res success o error message
 */
 const quitarInscripcion = async (req, res) =>{
    const usuarioId = req.userId;
    const {capacitacionId} = req.body;
    Usuario.findOne(
        {
            where:{id:usuarioId}
        }).then(usuario=>{
            Capacitacion.findOne(
                {
                    where:{id:capacitacionId}
                }).then(capacitacion=>{
                    if (!usuario || !capacitacion){
                        res.status(500).json({message:'error en eliminacion'}
                    )};

                    // ok
                    UsuarioCapacitaciones.destroy({
                        where: {
                            UsuarioId: usuario.id,
                            CapacitacionId: capacitacion.id
                        }
                    })
                    
                    return res.json({ success: 'Eliminación correcta' });


                }).catch(err=>{
                    res.status(500).json({message:'Error en eliminacion',err});
                });
            
        }).catch(err=>{
            res.status(500).json({message:'Error en eliminacion',err});
        });
}

/**
 * Traer capacitaciones de usuario registrado
 */
const capsUsRegistrado = async (req, res) => {
    const usuarioId = req.userId;
    Usuario.findOne(
        {
            where:{id:usuarioId},
            include: [
                {model:Capacitacion}
            ]
        }).then(usuario=>{
            if (!usuario) {
                res.status(404).json({ message: "Usuario no encontrado" });
            } else {
                return res.json({Capacitaciones: usuario.Capacitacions});
            }    
        }).catch(err=>{
            res.status(500).json({message:'Error buscando datos de usuario',err});
        });
}

module.exports = { crearUsuario, getUsuarios, 
    getUsuariosByRol, nuevoUsuario, getUsPerRol, 
    putUsuario, getUsPerRolCap,getUsPerCapByRol,
    asignarCapacitacion, quitarCapAUs, inscripcionAlumno,
    quitarInscripcion,capsUsRegistrado };