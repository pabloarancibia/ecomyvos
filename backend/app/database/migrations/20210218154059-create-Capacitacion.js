'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('capacitacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
      },

      convenio: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.INTEGER,
      },
      lon: {
        type: Sequelize.INTEGER,
      },
      ubicacion: {
        type: Sequelize.STRING,
      },
      fechainicio: {
        type: Sequelize.DATE,
      },
      fechafin: {
        type: Sequelize.DATE,
      },
      horainicio: {
        type: Sequelize.DATE,
      },
      horainicio: {
        type: Sequelize.DATE,
      },
      conectividad_up: {
        type: Sequelize.INTEGER,
      },
      conectividad_down: {
        type: Sequelize.INTEGER,
      },
      observaciones: {
        type: Sequelize.STRING
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('capacitacion');
  }
};
