const faker = require("faker");

function getSequentialElements(array, count, startIndex = 0) {
  if (!array || array.length === 0) {
    throw new Error("No hay elementos para seleccionar");
  }

  const result = [];
  let index = startIndex;

  for (let i = 0; i < count; i++) {
    if (index >= array.length) {
      throw new Error("No hay suficientes elementos en el array");
    }
    result.push(array[index]);
    index++;
  }

  return result;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const programas = await queryInterface.sequelize.query(
        "SELECT id FROM `Programas`"
      );
      if (!programas[0] || programas[0].length === 0) {
        throw new Error("No se encontraron programas en la base de datos.");
      }
      const programaIds = programas[0].map((programa) => programa.id);

      const materias = await queryInterface.sequelize.query(
        "SELECT id, programaId, nombre FROM `Materias`"
      );
      if (!materias[0] || materias[0].length === 0) {
        throw new Error("No se encontraron materias en la base de datos.");
      }

      const materiasPorPrograma = materias[0].reduce((acc, materia) => {
        if (!acc[materia.programaId]) {
          acc[materia.programaId] = [];
        }
        acc[materia.programaId].push(materia);
        return acc;
      }, {});

      const profesores = [];

      for (let programaId of programaIds) {
        const materiasDisponibles = materiasPorPrograma[programaId];
        if (materiasDisponibles.length < 2) {
          `Programa ${programaId} no tiene suficientes materias.`;
          continue;
        }

        for (let i = 0; i < materiasDisponibles.length; i += 2) {
          const materiasAsignadas = getSequentialElements(
            materiasDisponibles,
            2,
            i
          );

          const especialidades = materiasAsignadas
            .map((materia) => materia.nombre)
            .join(", ");

          const nuevoProfesor = {
            nombre: faker.name.findName(),
            especialidad: especialidades,
            programaId: programaId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const profesorInsertado = await queryInterface.bulkInsert(
            "Profesores",
            [nuevoProfesor],
            { returning: true }
          );

          if (!profesorInsertado || profesorInsertado.length === 0) {
            throw new Error("Error al insertar el profesor.");
          }
          "profesorInsertado ", profesorInsertado;

          const profesorId = profesorInsertado;

          const profesorMateriaInsert = materiasAsignadas.map((materia) => ({
            profesorId: profesorId,
            materiaId: materia.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

          await queryInterface.bulkInsert(
            "ProfesorMateria",
            profesorMateriaInsert
          );

          ("Profesor y materias asignadas correctamente");
        }
      }
    } catch (error) {
      console.error("Error al insertar profesores:", error);
    }
  },
};
