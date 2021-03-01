const { Usuario, Rol } = require('../models/index');

const isAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        const rol = await usuario.getRol();

        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].nombrerol === "admin") {
        //         next();
        //         return;
        //     }
        // }

        if (rol.nombrerol === "admin") {
            next();
            return;
        }


        return res.status(403).json({ message: "Requiere Rol Admin !" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error, msg: "error verificando admin" });
    }
};

const isRolExist = async (req, res, next) => {
    try {
        const { nombrerol } = req.body;
        const rol = await Rol.findOne({
            where: {
                nombrerol: nombrerol
            }
        });

        // rol no existe salgo
        if (!rol) return res.status(400).json({ message: "Rol no existe" });

        // rol existe continua
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, msg: "error en middleware rol" });
    }
}

module.exports = { isAdmin, isRolExist };