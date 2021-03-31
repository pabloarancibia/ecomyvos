'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asistencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asistencia: {
        type: Sequelize.STRING,
        defaultValue: "ausente"
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
      UsuarioId: {
        type: Sequelize.INTEGER,
        references: { model: 'Usuario', key: 'id' }
      },
      CapacitacionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Capacitacion', key: 'id' }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('Asistencia');

  }
};
