'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Persona', [{
        cuil: 10121231231,
        nombre: 'Admin Temporal',
        apellido: 'Inicial Temporal',
        email: 'pablo.arancibia@ecom.com.ar',
        genero: 'masculino',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Persona', [
       {cuil:10121231231}], {});
  }
};
