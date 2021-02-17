'use strict';
const { Model } = require('sequelize');
const Persona = require('./Persona');

module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Usuario pertenece a Persona
      usuario.belongsTo(models.Persona)

    }
  };
  usuario.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombreusuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 30],
          msg: "El nombre de usuario debe ser entre 4 y 30 caracteres"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

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
    sequelize,
    modelName: 'usuario',
  });



  return usuario;
};