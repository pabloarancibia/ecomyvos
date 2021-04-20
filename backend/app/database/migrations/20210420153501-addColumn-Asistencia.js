'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Asistencia', 'ClaseId', {
          type: Sequelize.DataTypes.INTEGER,
          references: { model: 'Clase', key: 'id' }
        }, { transaction: t }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Asistencia', 'ClaseId', { transaction: t }),
      ]);
    });
  }
};
