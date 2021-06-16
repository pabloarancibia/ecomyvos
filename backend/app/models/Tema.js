const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Tema = sequelize.define('Tema', {
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


    Tema.associate = function (models) {
    // Tema tiene muchas capacitaciones N:M
      Tema.belongsToMany(models.Capacitacion, { through: 'TemaCapacitaciones' });

    };


    return Tema;
};
