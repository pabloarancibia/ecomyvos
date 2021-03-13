const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Telefono = sequelize.define('Telefono', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        tipotel: {
            type: Sequelize.STRING,
        },
        numero: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        descripcion: {
            type: Sequelize.STRING,
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


    Telefono.associate = function (models) {
        // Telefono pertenece a Persona
        Telefono.belongsTo(models.Persona);
    };


    return Telefono;
};
