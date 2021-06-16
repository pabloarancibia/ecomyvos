const { Tema } = require("../models/index");
const { Op } = require("sequelize");


/**
 * Verifico que tema NO exista
 */
const isTemaNotExist = async (req, res, next) => {
    try {
            const nombre = req.body.nombre;

            const tema = await Tema.findOne({
                where: {
                    nombre: {
                        [Op.like]: nombre
                    }
                }
            });


            // Tema existe salgo
            if (tema) return res.status(400).json({ message: "Tema ya existe" });

            // Tema no existe continua
            next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en verificación Tema" });
    }
};

module.exports = { isTemaNotExist };
