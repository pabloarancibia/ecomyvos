const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PersonaRoles = sequelize.define('PersonaRoles', {
        // Model attributes are defined here
        persona_id: {
            type: Sequelize.INTEGER,

        },
        rol_id: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    PersonaRoles.associate = function (models) {

        // Asociaciones correspondientes
        PersonaRoles.belongsTo(models.Persona, {
            foreignKey: 'persona_id',
            as: 'persona'
        });
        PersonaRoles.belongsTo(models.Rol, {
            foreignKey: 'rol_id',
            as: 'rol'
        });
    };
    return PersonaRoles;
};
