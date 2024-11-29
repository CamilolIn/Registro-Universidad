const MateriaDomain = require("../../domain/servicios/MateriasService");
const ProfesorDomain = require("../../domain/servicios/ProfesorService");

class ListarProfesoresEstudiantes {
  async ejecutar() {
    try {
      // Obtenemos todos los profesores
      const profesores = await ProfesorDomain.obtenerTodos();

      // Mapeamos los profesores para construir el resultado
      const resultados = await Promise.all(
        profesores.map(async (profesor) => {
          // Obtenemos las materias asociadas al profesor
          const especialidades = profesor.especialidad.split(",");

          // Para cada conjunto de materias, obtenemos los estudiantes de cada una
          const resultadoMaterias = await Promise.all(
            especialidades.map(async (materia) => {
              // Llamamos a la función `obtenerMateriaYEstudiantes` para obtener los estudiantes
              const resultado = await MateriaDomain.obtenerMateriaYEstudiantes(
                materia.trim()
              );

              // Formateamos el resultado en el formato que necesitas
              return {
                nombreMateria: resultado.nombre,
                estudiantes: resultado.estudiantes.map((est) => ({
                  id: est.id,
                  nombre: est.nombre,
                  pais_residencia: est.pais_residencia,
                })),
              };
            })
          );

          // Regresamos un objeto con el nombre del profesor y sus materias
          return {
            nombreProfesor: profesor.nombre,
            materias: resultadoMaterias,
          };
        })
      );

      // Retornamos el resultado final
      return resultados;
    } catch (error) {
      throw new Error(
        "Error al obtener los profesores y estudiantes: " + error.message
      );
    }
  }
}

module.exports = ListarProfesoresEstudiantes;
