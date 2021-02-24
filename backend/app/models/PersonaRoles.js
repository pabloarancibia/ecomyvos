const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const PersonaRoles = sequelize.define('PersonaRoles', {
        // Model attributes are defined here
        PersonaId: {
            type: Sequelize.INTEGER,

        },
        RolId: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    PersonaRoles.associate = function (models) {

        // Asociaciones correspondientes
        PersonaRoles.belongsTo(models.Persona, {
            foreignKey: 'PersonaId',
            as: 'persona'
        });
        PersonaRoles.belongsTo(models.Rol, {
            foreignKey: 'RolId',
            as: 'rol'
        });
    };
    return PersonaRoles;
};
