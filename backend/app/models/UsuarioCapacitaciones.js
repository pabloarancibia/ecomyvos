const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const UsuarioCapacitaciones = sequelize.define('UsuarioCapacitaciones', {
        // Model attributes are defined here
        UsuarioId: {
            type: Sequelize.INTEGER,

        },
        CapacitacionId: {
            type: Sequelize.INTEGER,

        }
    }, {
        // Other model options go here
    });

    UsuarioCapacitaciones.associate = function (models) {

        // Asociaciones correspondientes
        UsuarioCapacitaciones.belongsTo(models.Usuario, {
            foreignKey: 'UsuarioId',
            as: 'usuario'
        });
        UsuarioCapacitaciones.belongsTo(models.Capacitacion, {
            foreignKey: 'CapacitacionId',
            as: 'capacitacion'
        });
    };
    return UsuarioCapacitaciones;
};
