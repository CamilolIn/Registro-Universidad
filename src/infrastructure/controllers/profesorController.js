const ListarProfesoresEstudiantes = require('../../aplicacion/casosDeUso/listarProfesoresEstudiantes');

class ProfesorController {
  static async listarProfesoresYEstudiantes(req, res) {
    try {
      const listarUseCase = new ListarProfesoresEstudiantes();
      const resultados = await listarUseCase.ejecutar();

      res.status(200).json({
        message: 'Profesores y estudiantes listados correctamente',
        data: resultados,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error al obtener la lista de profesores y estudiantes',
        error: error.message,
      });
    }
  }
}

module.exports = ProfesorController;
