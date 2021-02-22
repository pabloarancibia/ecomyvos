const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Capacitacion = sequelize.define('Capacitacion', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING,
        },

        convenio: {
            type: Sequelize.STRING,
        },
        lat: {
            type: Sequelize.INTEGER,
        },
        lon: {
            type: Sequelize.INTEGER,
        },
        ubicacion: {
            type: Sequelize.STRING,
        },
        fechainicio: {
            type: Sequelize.DATE,
        },
        fechafin: {
            type: Sequelize.DATE,
        },
        horainicio: {
            type: Sequelize.DATE,
        },
        horainicio: {
            type: Sequelize.DATE,
        },
        conectividad_up: {
            type: Sequelize.INTEGER,
        },
        conectividad_down: {
            type: Sequelize.INTEGER,
        },
        observaciones: {
            type: Sequelize.STRING
        },

        estado: {
            type: Sequelize.STRING,
            defaultValue: "activo"

        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        // Other model options go here

    });


    Capacitacion.associate = function (models) {
        // Capacitacion pertenece a muchas Personas N:M
        Capacitacion.belongsToMany(models.Persona, { through: "PersonaCapacitaciones" });

        // Capacitacion tiene muchas Asistencias 
        Capacitacion.hasMany(models.Asistencia);

        // Capacitacion tiene muchos Certificados 
        Capacitacion.hasMany(models.Certificado);
    };


    return Capacitacion;
};
