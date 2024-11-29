const db = require("../../shared/config/database");
const Estudiante = db.Estudiante;
const Programa = db.Programa;
const Materia = db.Materia;
const Profesor = db.Profesor;

class MateriaDomain {
  constructor() {}

  async obtenerMateriaYEstudiantes(nombreMateria) {
    try {
      const materia = await Materia.findOne({
        where: {
          nombre: nombreMateria,
        },
        include: [
          {
            model: Estudiante,
            as: "estudiantes",
            attributes: ["id", "nombre"],
          },
        ],
      });

      if (!materia) {
        ("Materia no encontrada");
        return;
      }

      return {
        id: materia.id,
        nombre: materia.nombre,
        programaId: materia.programaId,
        estudiantes: materia.estudiantes,
      };
    } catch (error) {
      console.error("Error al obtener la materia y los estudiantes:", error);
    }
  }
}

module.exports = new MateriaDomain();
