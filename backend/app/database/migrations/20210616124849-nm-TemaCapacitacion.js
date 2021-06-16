'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TemaCapacitaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TemaId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tema', key: 'id' }
      },
      CapacitacionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Capacitacion', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TemaCapacitaciones');

  }
};
