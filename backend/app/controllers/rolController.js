const { Rol, Usuario } = require("../models/index");

const crearRol = async (req, res) => {
    // creacion de nuevo rol. 
    // Previo middleware isAdmin
    const { nombrerol, descripcion } = req.body;

    try {

        const nuevoRol = await Rol.create({ nombrerol, descripcion });
        res.status(201).json(nuevoRol);

    } catch (error) {

        console.log(error);
        return res.status(500), json(error);

    }
}

/**
 * asignacion de rol - para admin
 * Previo middleware isAdmin isRolExist isUsuarioExist
 * @param {*} req usuarioId, nombrerol
 * @param {*} res Usuario
 */
const asignarRol = async (req, res) => {

    const { usuarioId, nombrerol } = req.body;

    const rol = await Rol.findOne({ where: { nombrerol: nombrerol } });

    try {
        const usuariorol = await Usuario.findOne({
            where: {
                id: usuarioId,
                RolId: rol.id
            }
        });
        if (usuariorol) return res.status(400).json({ message: "Usuario ya tiene este Rol" });

        const asignacion = await Usuario.update({
            RolId: rol.id
        },
            {
                where: {
                    id: usuarioId
                }
            });


        res.status(201).json(asignacion);

    } catch (error) {
        return res.status(500).json(error)
    }


}

const getRoles = async (req, res) => {
    const roles = await Rol.findAll();
    return res.json(roles);
}

/**
 * Traer rol de un usuario específico
 * @param {*} req body usuarioId
 * @param {*} res 
 * @returns 
 */
const getRol = async (req, res) => {
    const {usuarioId} = req.body;
    
    const usuario = await Usuario.findOne({
        where: {
            id: usuarioId
        },
        include:[
            {model:Rol}
        ]
    });
    const nombrerol = usuario.Rol.nombrerol;
    // const nombrerol = rol.nombrerol;
    return res.json({nombrerol});
}

const putRol = async (req, res) => {
    await Rol.update(req.body, {
        where: {
            id: req.params.rolId
        }
    });

    return res.json({ success: 'modificacion existosa' });
}

module.exports = { crearRol, asignarRol, 
    getRoles, putRol, getRol };