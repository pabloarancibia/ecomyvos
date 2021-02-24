const { Capacitacion } = require("../models/index");

const crearCapacitacion = async (req, res) => {
    const { nombre, convenio, lat, lon, localidad, direccion, circuito, fechainicio,
        fechafin, horainicio, horafin, conectividad_up, conectividad_down,
        observaciones } = req.body;

    try {

        const nuevaCapacitacion = await Capacitacion.create({
            nombre, convenio, lat, lon, localidad, direccion, circuito, fechainicio,
            fechafin, horainicio, horafin, conectividad_up, conectividad_down,
            observaciones
        })

        // const capacitacionGuardada = await nuevaCapacitacion.save();

        res.status(201).json(nuevaCapacitacion);

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = { crearCapacitacion };