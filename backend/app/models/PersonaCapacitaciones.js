const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PersonaCapacitaciones = sequelize.define('PersonaCapacitaciones', {
        // Model attributes are defined here
        PersonaId: {
            type: Sequelize.INTEGER,

        },
        CapacitacionId: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    PersonaCapacitaciones.associate = function (models) {

        // Asociaciones correspondientes
        PersonaCapacitaciones.belongsTo(models.Persona, {
            foreignKey: 'PersonaId',
            as: 'persona'
        });
        PersonaCapacitaciones.belongsTo(models.Capacitacion, {
            foreignKey: 'CapacitacionId',
            as: 'capacitacion'
        });
    };
    return PersonaCapacitaciones;
};
