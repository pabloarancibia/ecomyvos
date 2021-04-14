const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Asistencia = sequelize.define('Asistencia', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        asistencia: {
            type: Sequelize.STRING,
            defaultValue: "ausente"
        },
        observaciones: {
            type: Sequelize.STRING,
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


    Asistencia.associate = function (models) {
        // Asistencia pertenece a Usuario
        Asistencia.belongsTo(models.Usuario)
        // Asistencia pertenece a Capacitacion
        Asistencia.belongsTo(models.Capacitacion)
        // Asistencia pertenece a Clase
        // Asistencia.belongsTo(models.Clase)


    };


    return Asistencia;
};
