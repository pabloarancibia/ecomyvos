const { Persona } = require("../models/index");

const buscarOCrearPersona = async (req) => {
    const resultado = await Persona.findOrCreate({
        where: {
            cuil: req.body.cuil
        },
        defaults: {
            cuil: req.body.cuil,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            genero: req.body.genero,
            fechanacimiento: req.body.fechanacimiento,
        }
    });
    return resultado;
}
module.exports = { buscarOCrearPersona };