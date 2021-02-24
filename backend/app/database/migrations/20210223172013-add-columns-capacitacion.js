'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.renameColumn('Capacitacion', 'ubicacion', 'direccion',
          { transaction: t }),

        queryInterface.addColumn('Capacitacion', 'localidad', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),

        queryInterface.addColumn('Capacitacion', 'circuito', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),

        queryInterface.addColumn('Capacitacion', 'horafin', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t })


      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('Capacitacion', 'direccion', 'ubicacion',
          { transaction: t }),
        queryInterface.removeColumn('Capacitacion', 'localidad', { transaction: t }),
        queryInterface.removeColumn('Capacitacion', 'circuito', { transaction: t }),
        queryInterface.removeColumn('Capacitacion', 'horafin', { transaction: t })
      ]);
    });
  }
};
