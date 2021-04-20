const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Clase = sequelize.define('Clase', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE
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


    Clase.associate = function (models) {
        // Clase pertenece a Capacitacion
        Clase.belongsTo(models.Capacitacion);
        
        // Clase tiene muchas Asistencias
        Clase.hasMany(models.Asistencia);


    };


    return Clase;
};
