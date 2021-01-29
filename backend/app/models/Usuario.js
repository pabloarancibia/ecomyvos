'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuario.init({

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
      // validate: {
      //   len: {
      //     args: [6, 255],
      //     msg: "El contraseña debe tener como mínimo 6 caracteres"
      //   }
      // }
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "espera",
    }

  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};