'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.addColumn('Usuario', 'RolId', {
          type: Sequelize.DataTypes.INTEGER,
          references: { model: 'Rol', key: 'id' }
        }, { transaction: t }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Usuario', 'RolId', { transaction: t }),

      ]);
    });

  }
};
