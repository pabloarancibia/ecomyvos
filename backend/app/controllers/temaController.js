const { Tema, Capacitacion } = require("../models/index");
const { Op, Sequelize } = require("sequelize");


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
 * Traer Temas de una Capacitacion
 * @param {*} req param capacitacionId
 * @param {*} res Temas
 * @returns 
 */
const getTemasByCap = async (req, res) => {
    try {
        const capacitacionId = req.params.capacitacionId;
        const capacitacion = await Capacitacion.findOne(
        {
            where: {
                id: capacitacionId
            }
        });

        // verifico que exista capacitacion
        if (!capacitacion) return res.status(400).json({ message: "Capacitacion no existe" });

        // traigo temas de la capacitacion
        const temas = await capacitacion.getTemas();
        
        return res.json(temas);

    } catch (error) {
        res.status(500).json({message:'Error en traer Temas de Capacitación',error});
    }
    
}

/**
 * Traer Capacitaciones que dictan un Tema
 * @param {*} req temaId
 * @param {*} res capacitaciones
 * @returns 
 */
const getCapsByTema = async (req, res) => {
    try {
        const temaId = req.params.temaId;
        const tema = await Tema.findOne(
        {
            where: {
                id: temaId
            }
        });

        // verifico que exista tema
        if (!tema) return res.status(400).json({ message: "Tema no existe" });

        // traigo caps de la tema
        const caps = await tema.getCapacitacions();
        
        return res.json(caps);

    } catch (error) {
        res.status(500).json({message:'Error en traer Capacitaciones de Tema',error});
    }
}

/**
 * Cantidad de capacitaciones en numero, por tema específico
 * @param {*} req params temaId
 * @param {*} res number con cant de caps de ese tema
 * @returns 
 */
const countCapsByTema = async (req, res) => {
    try {
        const temaId = req.params.temaId;
        const tema = await Tema.findOne(
        {
            where: {
                id: temaId
            }
        });

        // verifico que exista tema
        if (!tema) return res.status(400).json({ message: "Tema no existe" });

        // traigo caps de la tema
        const caps = await tema.countCapacitacions();
        
        return res.json(caps);

    } catch (error) {
        res.status(500).json({message:'Error en traer Capacitaciones de Tema',error});
    }
}

/**
 * Traer Temas y cantidad de Capacitaciones de c/u
 * @param {*} res {tema:cantCaps}
 * @returns nombre y cantidad
 */
const getTemasCapsCount = async (req, res) => {
    try {
        const temas = await Tema.findAll({
            attributes: ['nombre',
                [Sequelize.fn("COUNT", "Capacitacion.id"), "capacitaciones"]
            ],
            include:[
                {
                    model: Capacitacion,
                    attributes: [],
                    through: {attributes: []},
                    duplicating: false
                }
            ],
            group: 'nombre',
            raw: true,
            logging: true,
            
            order: [
                [Sequelize.literal("`capacitaciones`"), "DESC"]
            ]
            
        });    
        return res.json(temas);
    } catch (error) {
        res.status(500).json({message:'Error en traer Capacitaciones de Temas',error});
    }
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

                    // Realizo la asignacion
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

module.exports = { crearTema, getTemas, putTema, asignarTemaCapacitacion,
    getTemasByCap, getCapsByTema, countCapsByTema, getTemasCapsCount };