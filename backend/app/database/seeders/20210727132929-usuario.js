'use strict';

const bcrypt = require('bcrypt');
const password = 'admin/123456'
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Usuario', [{
        nombreusuario: 'admin',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
        PersonaId: 1,
        RolId: 1
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Usuario', [
       {nombreusuario: 'admin'}
     ], {});
  }
};
