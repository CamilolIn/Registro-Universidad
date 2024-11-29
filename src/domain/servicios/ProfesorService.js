const db = require("../../shared/config/database"); 
const Estudiante = db.Estudiante; 
const Materia = db.Materia; 
const Profesor = db.Profesor;

class ProfesorDomain {
  static async obtenerMaterias(profesorId) {
    const profesor = await Profesor.findByPk(profesorId, {
      include: {
        model: Materia,
        as: 'materias',
        include: {
          model: Estudiante,
          as: 'estudiantes',
        },
      },
    });

    if (!profesor) {
      throw new Error('Profesor no encontrado');
    }

    return profesor.materias.map(materia => ({
      nombreMateria: materia.nombre,
      estudiantes: materia.estudiantes.map(est => ({
        nombre: est.nombre,
        pais_residencia: est.pais_residencia,
      })),
    }));
  }

  static async obtenerTodos() {
    const result = await Profesor.findAll({
      include: {
        model: Materia,
        as: 'materias',
        include: {
          model: Estudiante,
          as: 'estudiantes',
        },
      },
    });

    return result;
  }
}

module.exports = ProfesorDomain;
