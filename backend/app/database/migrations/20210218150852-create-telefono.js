'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Telefono', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      tipotel: {
        type: Sequelize.STRING,
      },
      numero: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
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
      },
      PersonaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Persona",
          key: "id"
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Telefono');
  }
};
