const { Tema, Capacitacion } = require("../models/index");

/**
 * Crear Tema nuevo
 * recibe nombre y descripcion en body
 */
const crearTema = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const nuevoTema = await Tema.create({ nombre, descripcion });
        res.status(201).json(nuevoTema);

    } catch (error) {

        console.log(error);
        return res.status(500), json(error);

    }
}

/**
 * Obtener todos los temas
 */
const getTemas = async (req, res) => {
    const temas = await Tema.findAll();
    return res.json(temas);
}


/**
 * Modifica Tema
 * recibe en body los datos
 * recibe por params el temaId
 */
const putTema = async (req, res) => {
    await Tema.update(req.body, {
        where: {
            id: req.params.temaId
        }
    });

    return res.json({ success: 'modificacion existosa' });
}

/**
 * Asigno Tema a Capacitacion
 * @param {*} req body temaId, capacitacionId
 * @param {*} res success o error message
 */
 const asignarTemaCapacitacion = async (req, res) =>{
    const {temaId, capacitacionId} = req.body;
    Tema.findOne(
        {
            where:{id:temaId}

        }).then(tema=>{
            Capacitacion.findOne(
                {
                    where:{id:capacitacionId}
                }).then(capacitacion=>{
                    if (!tema || !capacitacion){
                        res.status(500).json({message:'error en asignacion, no se encuantra tema o capacitación'}
                    )};

                    // ok
                    try {
                        tema.addCapacitacion(capacitacion);
                        return res.json({ success: 'Asignación correcta' });
                        
                    } catch (error) {
                        res.status(500).json({message:'Error en asignacion addCapacitacion',error});
                    }
                }).catch(err=>{
                    res.status(500).json({message:'Error en asignacion, sec cap',err});
                });
            
        }).catch(err=>{
            res.status(500).json({message:'Error en asignacion, sec tema',err});
        });
}

module.exports = { crearTema, getTemas, putTema, asignarTemaCapacitacion };