const { Asistencia, Rol, 
    Capacitacion, Clase,
    Usuario, Persona } = require('../models/index');

const { Op } = require("sequelize");
const Sequelize = require('sequelize')



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
            attributes: ['id','nombre','convenio','direccion','fechainicio','fechafin',
            'horainicio','horafin'],
            
            include: [{
                model: Usuario,
                where:{
                    RolId:rol.id,
                    estado: {
                        [Op.notLike]: '%eliminado'
                    }
                },
                attributes: ['id','nombreusuario','RolId'],
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

        return res.json({cap});
        
    } catch (error) {
        return res.json({message:'Error al traer datos', error});
        
    }
    
}

/**
 * Crear una asistencia para un usuario. Actualizar si existe.
 * @param {*} req valores para el registro en body
 * @param {*} res json asistencia
 */
const crearAsistencia = async (req, res) => {
    const {asistencia, observaciones, capacitacionId, usuarioId, claseId} = req.body;
    try {

        const asis = await Asistencia.findOne({
            where: {
                CapacitacionId: capacitacionId,
                UsuarioId: usuarioId,
                ClaseId: claseId
            }
        }).then(function(obj){
            //update
            if (obj){
                return obj.update({
                    asistencia: asistencia,
                    observaciones: observaciones
                })
            };

            //insert
            return Asistencia.create({
                asistencia: asistencia,
                observaciones: observaciones,
                CapacitacionId: capacitacionId,
                UsuarioId: usuarioId,
                ClaseId: claseId
            });
        })
        res.status(201).json(asis);
        
    } catch (error) {
        console.log(error);
        return res.status(500), json(error);
    }
}


/**
 * Cantidad de Asistencias agrupadas por Capacitacion
 */
const getPresentes = async (req, res) => {
    const asistencias = await Asistencia.findAll({
        attributes: [
            'capacitacionId',
            [Sequelize.literal('COUNT(DISTINCT(id))'), 'asistencias']
          ],
        where: {
            asistencia: 'presente'
        },
        group: 'capacitacionId',

    });
    return res.json(asistencias);
}

module.exports = {getAlumnosClasesByCap, crearAsistencia,getPresentes}