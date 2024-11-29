const EstudianteService = require("../../domain/servicios/EstudianteService");


class RegistrarEstudianteYPrograma {
  async ejecutar(nombre, pais_residencia, programId) {
    try {
      const estudiante = await EstudianteService.registerEstudianteAndAssignToPrograma(nombre, pais_residencia, programId);
      return estudiante;
    } catch (error) {
      throw new Error('Error al registrar el estudiante y asignar al programa: ' + error.message);
    }
  }
}

module.exports = new RegistrarEstudianteYPrograma();
