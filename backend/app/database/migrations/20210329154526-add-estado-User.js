'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Usuario', 'estado', {
          type: Sequelize.DataTypes.STRING,
          defaultValue: "activo"
        }, { transaction: t }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Usuario', 'estado', { transaction: t }),
      ]);
    });
  }
};
