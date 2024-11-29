const MateriaDomain = require("../../domain/servicios/MateriasService");
const ProfesorDomain = require("../../domain/servicios/ProfesorService");

class ListarProfesoresEstudiantes {
  async ejecutar() {
    try {
      const profesores = await ProfesorDomain.obtenerTodos();

      const resultados = await Promise.all(
        profesores.map(async (profesor) => {
          const especialidades = profesor.especialidad.split(",");

          const resultadoMaterias = await Promise.all(
            especialidades.map(async (materia) => {
              const resultado = await MateriaDomain.obtenerMateriaYEstudiantes(
                materia.trim()
              );
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

          return {
            nombreProfesor: profesor.nombre,
            materias: resultadoMaterias,
          };
        })
      );

      return resultados;
    } catch (error) {
      throw new Error(
        "Error al obtener los profesores y estudiantes: " + error.message
      );
    }
  }
}

module.exports = ListarProfesoresEstudiantes;
