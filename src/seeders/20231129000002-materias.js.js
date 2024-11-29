const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const programas = await queryInterface.sequelize.query(
      "SELECT id FROM `Programas`"
    );
    const programaIds = programas[0].map((programa) => programa.id);

    const materiasExistentes = await queryInterface.sequelize.query(
      "SELECT DISTINCT programaId FROM `Materias`"
    );
    const programaIdsConMaterias = materiasExistentes[0].map(
      (materia) => materia.programaId
    );

    const materias = [];

    for (let programaId of programaIds) {
      if (!programaIdsConMaterias.includes(programaId)) {
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

    if (materias.length > 0) {
      await queryInterface.bulkInsert("Materias", materias, {});
      ("Materias insertadas correctamente.");
    } else {
      ("No se insertaron materias, ya existen para todos los programas.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Materias", null, {});
  },
};
