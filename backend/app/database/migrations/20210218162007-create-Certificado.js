'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('certificado', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "activo"
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      persona_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Persona', key: 'id' }
      },
      capacitacion_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Capacitacion', key: 'id' }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('certificado');

  }
};
