'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Usuario pertenece a Persona
      Usuario.belongsTo(models.Persona)

      // Usuario pertenece a Rol
      Usuario.belongsTo(models.Rol)

    }
  };
  Usuario.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombreusuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 30],
          msg: "El nombre de Usuario debe ser entre 4 y 30 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },

  }, {
    sequelize,
    modelName: 'Usuario',
  });



  return Usuario;
};