'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PersonaCapacitaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      persona_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Persona', key: 'id' }
      },
      capacitacion_id: {
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
    await queryInterface.dropTable('PersonaCapacitaciones');

  }
};
