const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const TemaCapacitaciones = sequelize.define('TemaCapacitaciones', {
        // Model attributes are defined here
        TemaId: {
            type: Sequelize.INTEGER,

        },
        CapacitacionId: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    TemaCapacitaciones.associate = function (models) {

        // Asociaciones correspondientes
        TemaCapacitaciones.belongsTo(models.Tema, {
            foreignKey: 'TemaId',
            as: 'tema'
        });
        TemaCapacitaciones.belongsTo(models.Capacitacion, {
            foreignKey: 'CapacitacionId',
            as: 'capacitacion'
        });
    };
    return TemaCapacitaciones;
};
