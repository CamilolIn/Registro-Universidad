const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener los IDs de los programas
    const programas = await queryInterface.sequelize.query('SELECT id FROM `Programas`');
    const programaIds = programas[0].map(programa => programa.id);

    // Verificar si ya existen materias en la base de datos
    const materiasExistentes = await queryInterface.sequelize.query(
      'SELECT DISTINCT programaId FROM `Materias`'
    );
    const programaIdsConMaterias = materiasExistentes[0].map(materia => materia.programaId);

    // Crear un array para las nuevas materias que se insertarán
    const materias = [];

    // Solo insertamos materias si el programa no tiene materias asignadas
    for (let programaId of programaIds) {
      if (!programaIdsConMaterias.includes(programaId)) {
        // Generamos 10 materias para cada programa que no tenga materias asignadas
        for (let i = 0; i < 10; i++) {
          materias.push({
            nombre: `Materia ${faker.commerce.productName()} del Programa ${programaId}`,
            descripcion: faker.lorem.sentence(),
            creditos: 3,
            programaId: programaId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    // Insertamos las nuevas materias en la base de datos si hay alguna
    if (materias.length > 0) {
      await queryInterface.bulkInsert('Materias', materias, {});
      ('Materias insertadas correctamente.');
    } else {
      ('No se insertaron materias, ya existen para todos los programas.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminamos todas las materias
    await queryInterface.bulkDelete('Materias', null, {});
  }
};
