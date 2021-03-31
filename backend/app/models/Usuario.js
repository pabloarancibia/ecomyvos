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

      // Usuario pertenece a muchas Capacitaciones N:M
      Usuario.belongsToMany(models.Capacitacion, { through: 'UsuarioCapacitaciones' });

      // Usuario tiene muchas Asistencias 
      Usuario.hasMany(models.Asistencia);

      // Usuario tiene muchos Certificados 
      Usuario.hasMany(models.Certificado);

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
          message: "El nombre de Usuario debe ser entre 4 y 30 caracteres"
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
    estado: {
      type: DataTypes.STRING,
      defaultValue: "activo"

  },

  }, {
    sequelize,
    modelName: 'Usuario',
  });



  return Usuario;
};