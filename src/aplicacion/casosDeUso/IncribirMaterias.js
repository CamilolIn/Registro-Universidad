const EstudianteService = require("../../domain/servicios/EstudianteService");


class IncribirMaterias {
  async ejecutar(estudianteId, materiaId) {
    try {
      const estudiante = await EstudianteService.inscribirMateria(estudianteId, materiaId);
      return estudiante;
    } catch (error) {
      throw new Error('Error al inscribir la materia: ' + error.message);
    }
  }
}

module.exports = new IncribirMaterias();
