module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.addColumn('usuarios', 'estado', {
          type: Sequelize.STRING,
          defaultValue: "espera",
        }, { transaction: t }),


      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([

        queryInterface.removeColumn('usuarios', 'estado', { transaction: t }),

      ]);
    });
  }
};