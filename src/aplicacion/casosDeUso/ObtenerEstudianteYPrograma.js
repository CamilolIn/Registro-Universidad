const EstudianteService = require("../../domain/servicios/EstudianteService");


class ObtenerEstudianteYPrograma {
  async ejecutar(estudianteId) {
    try {
      const estudiante = await EstudianteService.getEstudianteWithPrograma(estudianteId);
      return estudiante; // Devuelves los detalles del estudiante con su programa y materias
    } catch (error) {
      throw new Error('Error al obtener el estudiante y programa: ' + error.message);
    }
  }
}

module.exports = new ObtenerEstudianteYPrograma();
