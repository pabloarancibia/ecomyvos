const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const Certificado = sequelize.define('Certificado', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "activo"
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


    Certificado.associate = function (models) {
        // Certificado pertenece a Persona
        Certificado.belongsTo(models.Persona)
        // Certificado pertenece a Capacitacion
        Certificado.belongsTo(models.Capacitacion)


    };


    return Certificado;
};
