const { Rol, PersonaRoles } = require("../models/index");

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

const asignarRol = async (req, res) => {
    // asignacion de rol - para admin
    // Previo middleware isAdmin isRolExist isPersonaExist
    const { personaId, nombrerol } = req.body;

    const rol = await Rol.findOne({ where: { nombrerol: nombrerol } });

    try {
        const personaroles = await PersonaRoles.findOne({
            where: {
                PersonaId: personaId,
                RolId: rol.id
            }
        });
        if (personaroles) return res.status(400).json({ message: "Ya existe asignacion" });

        const asignacion = await PersonaRoles.create({
            PersonaId: personaId,
            RolId: rol.id
        });
        res.status(201).json(asignacion);
    } catch (error) {
        return res.status(500).json(error)
    }


}
const retirarRol = async (req, res) => {
    // retirar rol - para admin
    // Previo middleware isAdmin isRolExist isPersonaExist
    const { personaId, nombrerol } = req.body;

    const rol = await Rol.findOne({ where: { nombrerol: nombrerol } });

    try {
        const personaroles = await PersonaRoles.findOne({
            where: {
                PersonaId: personaId,
                RolId: rol.id
            }
        });
        if (!personaroles) return res.status(400).json({ message: "No existe asignacion" });

        await PersonaRoles.destroy({
            where: {
                PersonaId: personaId,
                RolId: rol.id
            }
        });
        res.status(201).json({ message: "Rol de Persona Eliminado" });
    } catch (error) {
        return res.status(500).json(error)
    }


}
module.exports = { crearRol, asignarRol, retirarRol };