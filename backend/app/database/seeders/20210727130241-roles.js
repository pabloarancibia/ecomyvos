'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rol', [{
      id: 1,
      nombrerol: 'admin',
      descripcion: 'administrador del sistema, puede ver sección administración',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      nombrerol: 'alumno',
      descripcion: 'alumno',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      nombrerol: 'instructor',
      descripcion: 'instructor/docente/capacitador',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      nombrerol: 'multiplicador',
      descripcion: 'alumnos que serán instructores/capacitadores',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      nombrerol: 'prueba',
      descripcion: 'prueba',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Rol',
     [{
      nombrerol: 'admin'
     },
     {
      nombrerol: 'alumno'
     },
     {
      nombrerol: 'instructor'
     },
     {
      nombrerol: 'multiplicador'
     },
     {
      nombrerol: 'prueba'
     }], {});
  }
};
