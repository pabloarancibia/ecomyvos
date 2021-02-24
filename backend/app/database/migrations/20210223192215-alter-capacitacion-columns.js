'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.changeColumn('Capacitacion', 'lat', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'lon', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'horainicio', {
          type: Sequelize.DataTypes.TIME,
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'horafin', {
          type: Sequelize.DataTypes.TIME,
        }, { transaction: t })


      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.changeColumn('Capacitacion', 'lat', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'lon', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'horainicio', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t }),

        queryInterface.changeColumn('Capacitacion', 'horafin', {
          type: Sequelize.DataTypes.DATE,
        }, { transaction: t })


      ]);
    });
  }
};
