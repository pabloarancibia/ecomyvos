const { Persona } = require("../models/index");

const isPersonaExist = async (req, res, next) => {
    try {
        const { personaId } = req.body;
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
        res.status(500).json({ message: error, msg: "error en verificación Persona" });
    }
};
module.exports = { isPersonaExist };