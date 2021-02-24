const { Usuario } = require('../models/index');

const isAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        const persona = await usuario.getPersona();
        const roles = await persona.getRols();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Requiere Rol Admin !" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
};

module.exports = { isAdmin };