'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Tema', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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
        }
        }, { transaction: t }),

      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('Tema',
         { transaction: t }),

      ]);
    });
  }
};
