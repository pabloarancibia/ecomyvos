const { Clase } = require("../models/index");

/**
 * Crear una nueva clase
 * @param {*} req body: CapacitacionId, fecha, observaciones
 * @param {*} res json
 */
const crearClase = async (req, res) => {
    const {capacitacionId, fecha, observaciones} = req.body;
    try {
        const clase = await Clase.create({
            fecha: fecha,
            observaciones: observaciones,
            CapacitacionId: capacitacionId
        })

        res.status(201).json(clase);

        
    } catch (error) {
        console.log(error);
        return res.status(500), json(error);
    }
}

/**
 * Modificar clase
 * @param {*} req params claseId
 * @param {*} res 
 * @returns 
 */
const putClase = async (req, res) => {
    try {
        const clase = await Clase.update(req.body,{
            where: {
                id: req.params.claseid
            }
        })

        res.status(201).json({message:'modificación correcta'});

        
    } catch (error) {
        console.log(error);
        return res.status(500), json(error);
    }
}

/**
 * Traer todas las clases
 * @param {*} res json clases
 * @returns 
 */
const getClases = async (req, res) => {
    const clases = await Clase.findAll();
    return res.json(clases);
}

/**
 * Traer clases segun capacitacionId
 * @param {*} req body capacitacionId
 * @param {*} res json clases
 * @returns 
 */
const getClasesByCapId = async (req, res) => {
    try {
        const clases = await Clase.findAll({
            where: {
                CapacitacionId: req.body.capacitacionId
            }
        });
        return res.json(clases);
        
    } catch (error) {
        return res.status(500), json({error:error, message:'error al traer clases'});
        
    }
    
}

/**
 * Eliminar Clase
 * @param {*} req params claseId
 * @param {*} res 
 * @returns 
 */
const deleteClase = async (req, res) => {
    try {
        await Clase.destroy({
            where: {
                id: req.params.claseid
            }
        });
        return res.json({ success: 'Eliminación correcta',message:'Eliminación correcta' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {crearClase, putClase, 
    getClases,deleteClase,getClasesByCapId}
