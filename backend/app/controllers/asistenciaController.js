const { Asistencia, Rol, 
    Capacitacion, Clase,
    Usuario, Persona } = require('../models/index');

const { Op } = require("sequelize");


/**
 * Traer Alumnos(Usuarios segun rol), Clases, Asistencias de una capacitacion
 * @params capacitacionId, nombrerol
 */
 const getAlumnosClasesByCap = async (req, res) => {
    try {
        const nombrerol = 'alumno'
        const rol = await Rol.findOne({ 
            where: { 
                nombrerol: nombrerol 
            } 
        });
        const cap = await Capacitacion.findOne({ 
            where: { 
                id: req.params.capacitacionId 
            },
            attributes: ['nombre'],
            include: [{
                model: Usuario,
                where:{
                    RolId:rol.id,
                    estado: {
                        [Op.notLike]: '%eliminado'
                    }
                },
                attributes: ['nombreusuario','RolId'],
                include: [{
                    model: Persona,
                    attributes: ['nombre', 'apellido']
                }]

            },
            {
                model: Clase,
                include: [{
                    model: Asistencia
                }]
            }
            ] 
        });
         
        // const alumnos = await Usuario.findAll({
        //     where:{
        //         RolId:rol.id,
        //         estado: {
        //             [Op.notLike]: '%eliminado'
        //         }
        //     },
        //     include:[{
        //         model: Capacitacion,
        //             where: {
        //                 id: req.params.capacitacionId
        //             },
        //             attributes: ['nombre']
        //     },
        //     {
        //         model:Persona,
        //         attributes: ['nombre', 'apellido']
        //     }
        //     ],
        //     attributes: {exclude: ['password']},
        // });

        // const clases = await Clase.findAll({
        //     where: {
        //         CapacitacionId: req.params.capacitacionId
        //     },
        //     include:[
        //         {model: Asistencia}
        //     ]
        // });

        return res.json({cap});
        
    } catch (error) {
        return res.json({message:'Error al traer datos', error});
        
    }
    
}

module.exports = {getAlumnosClasesByCap}