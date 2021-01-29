'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "activo"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('Role');
  }
};
