const { Capacitacion, Clase, Asistencia } = require("../models/index");
const { Op } = require("sequelize");


const getCapacitaciones = async (req, res) => {
    const capacitaciones = await Capacitacion.findAll({
        where: {
            estado: {
                [Op.notLike]: '%eliminado'
            }
        }
    });
    return res.json(capacitaciones);
}


/**
 * Traigo capacitacione, clases y asistencias 
 */
const getCapsClasesAsis = async (req, res) => {
    const capacitaciones = await Capacitacion.findAll({
        // attributes: ['nombre'],
        where: {
            estado: {
                [Op.notLike]: '%eliminado'
            }
        },
        include:[{
            model: Clase,
            include:[{
                model: Asistencia,
                
            },
            // [sequelize.fn('COUNT', sequelize.col('id')), 'asistencias']
            ]
            
        }]
    });
    return res.json(capacitaciones);
}

const getCapacitacionById = async (req, res) => {
    const capacitacion = await Capacitacion.findOne({
        where: {
            id: req.params.capacitacionId
        }
    });
    return res.json(capacitacion);
}

const putCapacitacion = async (req, res) => {
    try {
        await Capacitacion.update(req.body, {
            where: {
                id: req.params.capacitacionId
            }
        });
        return res.json({ success: 'Modificación correcta' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

/**
 * Elimina completamente la capacitacion
 * @param {*} req capacitacionId
 * @param {*} res msg
 * @returns 
 */
const deleteCapacitacion = async (req, res) => {
    try {
        await Capacitacion.destroy({
            where: {
                id: req.params.capacitacionId
            }
        });
        return res.json({ success: 'Eliminación correcta',message:'Eliminación correcta' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

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

/**
 * Traer nombre, fechas y hrs de capacitaciones
 */
const getCapacitacionesFechas = async (req, res) => {
    const capacitaciones = await Capacitacion.findAll({
        where: {
            estado: {
                [Op.notLike]: '%eliminado'
            }
        },
        attributes:['id','nombre', 'fechainicio','fechafin', 'horainicio', 'horafin']
    });
    return res.json(capacitaciones);
}



module.exports = { crearCapacitacion, getCapacitaciones, 
    putCapacitacion, getCapacitacionById,deleteCapacitacion,
    getCapsClasesAsis, getCapacitacionesFechas };