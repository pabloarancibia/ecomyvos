const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Persona = sequelize.define('Persona', {
        // Model attributes are defined here
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cuil: {
            type: Sequelize.BIGINT,
            allowNull: false,
            unique: true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
        apellido: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            isEmail: true,
        },
        genero: {
            type: Sequelize.STRING,
        },
        fechanacimiento: {
            type: Sequelize.DATE
        },

        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "activo"

        },
    }, {
        // Other model options go here

    });

    Persona.associate = function (models) {
        // Persona tiene muchos Usuarios 
        Persona.hasMany(models.Usuario);

        // Persona tiene muchos Telefonos 
        Persona.hasMany(models.Telefono);

        
    };
    return Persona;
};
