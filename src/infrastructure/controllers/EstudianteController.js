const IncribirMaterias = require('../../aplicacion/casosDeUso/IncribirMaterias');
const ListarCompanerosDeClase = require('../../aplicacion/casosDeUso/ListarCompanerosDeClase');
const ObtenerEstudianteYPrograma = require('../../aplicacion/casosDeUso/ObtenerEstudianteYPrograma');
const RegistrarEstudianteYPrograma = require('../../aplicacion/casosDeUso/RegistrarEstudianteYPrograma');

class EstudianteController {
  async registrarEstudiante(req, res) {
    const { nombre, pais_residencia, programId } = req.body;
    ("registrarEstudiante ", req.body)
    try {
      const estudiante = await RegistrarEstudianteYPrograma.ejecutar(nombre, pais_residencia, programId);
      res.status(201).json({
        mensaje: 'Estudiante registrado y asociado al programa correctamente.',
        estudiante,
      });
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerEstudiante(req, res) {
    const { id } = req.params;
    ("obtenerEstudiante ", req.params)
    try {
      const estudiante = await ObtenerEstudianteYPrograma.ejecutar(id);
      res.status(201).json({
        mensaje: 'Estudiante con su programa respectivo.',
        estudiante,
      });
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async incribirMaterias(req, res) {
    const { estudianteId, materiaId } = req.body;
    ("IncribirMaterias ", req.body)
    try {
      const estudiante = await IncribirMaterias.ejecutar(estudianteId, materiaId);
      res.status(201).json({
        mensaje: 'Materia inscrita para estudiante existosamente',
        estudiante,
      });
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerCompaneros(req, res) {
    const { estudianteId } = req.params;

    try {
      const listarCompanerosDeClase = new ListarCompanerosDeClase();
      const companeros = await listarCompanerosDeClase.ejecutar(estudianteId);

      return res.status(200).json({
        materias_compañeros: companeros,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new EstudianteController();
