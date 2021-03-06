const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombrerol: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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


    Rol.associate = function (models) {
        // Rol tiene muchos Usuarios 
        Rol.hasMany(models.Usuario);
    };


    return Rol;
};
