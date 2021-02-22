const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PersonaCapacitaciones = sequelize.define('PersonaCapacitaciones', {
        // Model attributes are defined here
        persona_id: {
            type: Sequelize.INTEGER,

        },
        capacitacion_id: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    PersonaCapacitaciones.associate = function (models) {

        // Asociaciones correspondientes
        PersonaCapacitaciones.belongsTo(models.Persona, {
            foreignKey: 'persona_id',
            as: 'persona'
        });
        PersonaCapacitaciones.belongsTo(models.Capacitacion, {
            foreignKey: 'capacitacion_id',
            as: 'capacitacion'
        });
    };
    return PersonaCapacitaciones;
};
