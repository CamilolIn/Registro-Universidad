const EstudianteService = require("../../domain/servicios/EstudianteService");


class ListarCompanerosDeClase {
  async ejecutar(estudianteId) {
    try {
      const companeros = await EstudianteService.obtenerCompanerosDeClase(estudianteId);
      return companeros; // Devuelves los compañeros de clase por materia
    } catch (error) {
      throw new Error('Error al obtener los compañeros de clase: ' + error.message);
    }
  }
}

module.exports = ListarCompanerosDeClase;