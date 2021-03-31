const { Persona } = require("../models/index");

/**
 * Recibe personaId en params
 * verifica mediante personaId que la persona exista
 * 
 */
const isPersonaIdExist = async (req, res, next) => {
    try {
            const personaId = req.params.personaId;

            const persona = await Persona.findOne({
                where: {
                    id: personaId
                }
            });


            // Persona no existe salgo
            if (!persona) return res.status(400).json({ message: "Persona no existe" });

            // Persona existe continua
            next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en verificación Persona id" });
    }
};

/**
 * verifica mediante CUIL que la persona no exista
 */
const isPersonaNotExist = async (req, res, next) => {
    try {
        const { cuil } = req.body;
        const persona = await Persona.findOne({
            where: {
                cuil: cuil
            }
        });

        // Persona existe salgo
        if (persona) return res.status(400).json({ message: "Cuil ya existe" });

        // Persona no existe continua
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error, message: "error en verificación Persona" });
    }
};
module.exports = { isPersonaIdExist, isPersonaNotExist };