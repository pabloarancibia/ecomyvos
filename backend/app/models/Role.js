const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Rol = sequelize.define('Rol', {
    // Model attributes are defined here
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "activo"
    }
}, {
    // Other model options go here
});