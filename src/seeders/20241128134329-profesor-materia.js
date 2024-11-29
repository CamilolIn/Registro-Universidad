module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const profesores = await queryInterface.sequelize.query('SELECT id FROM `Profesores`');
      const materias = await queryInterface.sequelize.query('SELECT id FROM `Materias`');

      const profesorIds = profesores[0].map(profesor => profesor.id);
      const materiaIds = materias[0].map(materia => materia.id);

      if (profesorIds.length === 0 || materiaIds.length === 0) {
        throw new Error('No existen profesores o materias para asignar.');
      }

      const profesorMateriaRelations = [];

      materiaIds.forEach(materiaId => {
        const randomProfessors = [
          profesorIds[Math.floor(Math.random() * profesorIds.length)],
          profesorIds[Math.floor(Math.random() * profesorIds.length)],
        ];

        if (randomProfessors[0] === randomProfessors[1]) {
          randomProfessors[1] = profesorIds.filter(id => id !== randomProfessors[0])[0];
        }

        randomProfessors.forEach(profesorId => {
          profesorMateriaRelations.push({
            materiaId: materiaId,
            profesorId: profesorId,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      const uniqueRelations = [];
      const seen = new Set();
      profesorMateriaRelations.forEach(relation => {
        const key = `${relation.profesorId}-${relation.materiaId}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueRelations.push(relation);
        }
      });
      await queryInterface.bulkInsert('ProfesorMateria', uniqueRelations);

    } catch (error) {
      console.error("Error en la migración de relaciones Profesor-Materia:", error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProfesorMateria', null, {});
  }
};
