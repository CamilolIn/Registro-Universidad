const faker = require('faker');

// Función para obtener elementos secuenciales de un array
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
      // Obtener los IDs de los programas
      const programas = await queryInterface.sequelize.query('SELECT id FROM `Programas`');
      if (!programas[0] || programas[0].length === 0) {
        throw new Error('No se encontraron programas en la base de datos.');
      }
      const programaIds = programas[0].map(programa => programa.id);

      // Obtener las materias asociadas a cada programa
      const materias = await queryInterface.sequelize.query('SELECT id, programaId, nombre FROM `Materias`');
      if (!materias[0] || materias[0].length === 0) {
        throw new Error('No se encontraron materias en la base de datos.');
      }

      const materiasPorPrograma = materias[0].reduce((acc, materia) => {
        if (!acc[materia.programaId]) {
          acc[materia.programaId] = [];
        }
        acc[materia.programaId].push(materia);
        return acc;
      }, {});

      // Array para almacenar los profesores
      const profesores = [];

      // Crear 5 profesores por cada programa con 2 materias asignadas de manera secuencial
      for (let programaId of programaIds) {
        const materiasDisponibles = materiasPorPrograma[programaId];

        // Verificar que el programa tiene al menos 2 materias
        if (materiasDisponibles.length < 2) {
          (`Programa ${programaId} no tiene suficientes materias.`);
          continue; // Si no tiene suficientes materias, saltamos este ciclo
        }

        // Asignamos las materias en bloques de 2
        for (let i = 0; i < materiasDisponibles.length; i += 2) {
          // Obtener las dos materias secuenciales
          const materiasAsignadas = getSequentialElements(materiasDisponibles, 2, i);

          // Asignamos el nombre de la especialidad como el nombre de las materias
          const especialidades = materiasAsignadas.map(materia => materia.nombre).join(', ');

          // Creamos el nuevo profesor
          const nuevoProfesor = {
            nombre: faker.name.findName(),
            especialidad: especialidades,  // La especialidad es el nombre de las materias
            programaId: programaId,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // Insertamos el nuevo profesor en la base de datos
          const profesorInsertado = await queryInterface.bulkInsert('Profesores', [nuevoProfesor], { returning: true });

          // Asegurémonos de que se ha insertado correctamente
          if (!profesorInsertado || profesorInsertado.length === 0) {
            throw new Error('Error al insertar el profesor.');
          }
          ('profesorInsertado ', profesorInsertado);

          // Ahora recuperamos el ID del profesor insertado
          const profesorId = profesorInsertado;

          // Ahora asignamos las 2 materias a este profesor en la tabla intermedia 'ProfesorMateria'
          const profesorMateriaInsert = materiasAsignadas.map(materia => ({
            profesorId: profesorId,
            materiaId: materia.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

          // Insertamos las materias asignadas al profesor en la tabla 'ProfesorMateria'
          await queryInterface.bulkInsert('ProfesorMateria', profesorMateriaInsert);

          ('Profesor y materias asignadas correctamente');
        }
      }

    } catch (error) {
      console.error('Error al insertar profesores:', error);
    }
  }
};
