const db = require("../../shared/config/database");
const axios = require("axios");
const Estudiante = db.Estudiante;
const Programa = db.Programa;
const Materia = db.Materia;
const Profesor = db.Profesor;

class EstudianteService {
  async registerEstudianteAndAssignToPrograma(
    nombre,
    pais_residencia,
    programId
  ) {
    if (pais_residencia !== "Estados Unidos")
      throw new Error("No eres residente de los Estados Unidos");
    ("Service INIT");
    (Estudiante);
    const estudiante = await Estudiante.create({ nombre, pais_residencia });

    const programa = await Programa.findByPk(programId);
    if (!programa) throw new Error("El programa de créditos no existe.");

    await estudiante.addPrograma(programa);

    return estudiante;
  }

  async obtenerTasaDeCambio() {
    try {
      const response = await axios.get("https://api.frankfurter.app/latest", {
        params: {
          to: "USD,EUR",
        },
      });

      const { rates } = response.data;
      ("rates ", rates);
      return {
        usdToUsd: rates.USD,
        usdToEur: rates.USD,
      };
    } catch (error) {
      throw new Error("Error al obtener la tasa de cambio: " + error.message);
    }
  }
  async getEstudianteWithPrograma(estudianteId) {
    ("getEstudianteWithPrograma ", estudianteId);
    try {
      const estudianteMaterias = await Estudiante.findByPk(estudianteId, {
        include: {
          model: Materia,
          as: "materias",
          attributes: ["id", "nombre"],
        },
      });

      const estudiantePrograma = await Estudiante.findByPk(estudianteId, {
        include: {
          model: Programa,
          as: "programas",
        },
      });

      if (!estudianteMaterias || !estudiantePrograma) {
        throw new Error("Estudiante no encontrado");
      }

      const { usdToEur } = await this.obtenerTasaDeCambio();

      const precioUsd = 150;
      const precioEur = precioUsd / usdToEur;
      const response = {
        estudiante: {
          nombre: estudianteMaterias.nombre,
          programa:
            estudiantePrograma.programas.length > 0
              ? estudiantePrograma.programas[0].nombre
              : null,
          total_matricula_usd: ((estudianteMaterias.materias.length)*3) * precioUsd,
          total_matricula_eur: Number(
            (
                ((estudianteMaterias.materias.length)*3) * Number(precioEur.toFixed(2))
            ).toFixed(2)
          ),
          materias: estudianteMaterias.materias.map((materia) => {
            return {
              nombre: materia.nombre,
              precioUSD: precioUsd*3,
              precioEUR: Number((Number(precioEur.toFixed(2))*3).toFixed(2)),
            };
          }),
        },
      };

      return response;
    } catch (error) {
      throw new Error(`Error al obtener el estudiante: ${error.message}`);
    }
  }

  async inscribirMateria(estudianteId, materiaId) {
    const estudianteMaterias = await Estudiante.findByPk(estudianteId, {
      include: {
        model: Materia,
        as: "materias",
      },
    });

    (
      "estudianteMaterias ",
      JSON.stringify(estudianteMaterias, null, 2)
    );

    const estudianteProgramas = await Estudiante.findByPk(estudianteId, {
      include: {
        model: Programa,
        as: "programas",
      },
    });

    const materiasInscritas = estudianteMaterias.materias || [];

    if (materiasInscritas.length >= 3) {
      throw new Error("El estudiante ya está inscrito en 3 materias.");
    }

    const materia = await Materia.findByPk(materiaId, {
      include: {
        model: Programa,
        as: "programa",
      },
    });

    if (!materia) {
      throw new Error("La materia no existe.");
    }

    const programaEstudiante = estudianteProgramas.programas[0];
    if (materia.programaId !== programaEstudiante.id) {
      throw new Error(
        "La materia no pertenece al programa al que estás inscrito."
      );
    }

    await estudianteMaterias.addMateria(materia);
    ("estudiante, ", JSON.stringify(estudianteMaterias.materias));
    return {
      id: estudianteMaterias.id,
      nombre: estudianteMaterias.nombre,
      pais_residencia: estudianteMaterias.pais_residencia,
      materia: materia.nombre,
      programa: programaEstudiante.nombre,
    };
  }

  async obtenerCompanerosDeClase(estudianteId) {
    try {
      const estudiante = await Estudiante.findByPk(estudianteId, {
        include: [
          {
            model: Materia,
            as: "materias",
            attributes: ["id", "nombre"],
            through: { attributes: [] },
          },
        ],
      });

      if (!estudiante) {
        throw new Error("Estudiante no encontrado");
      }

      const resultados = [];

      for (const materia of estudiante.materias) {
        const estudiantesMateria = await Materia.findByPk(materia.id, {
          include: [
            {
              model: Estudiante,
              as: "estudiantes",
              attributes: ["id", "nombre"],
              through: { attributes: [] },
              where: { id: { [db.Sequelize.Op.ne]: estudianteId } },
            },
          ],
        });

        if (estudiantesMateria && estudiantesMateria.estudiantes) {
          const companeros = estudiantesMateria.estudiantes.map(
            (compañero) => ({
              id: compañero.id,
              nombre: compañero.nombre,
            })
          );

          resultados.push({
            materia: materia.nombre,
            compañeros: companeros ?? [],
          });
        }
      }

      return resultados.length === 0 ? "Aun no tienes compañeros en ninguna clase": resultados;
    } catch (error) {
      throw new Error(
        "Error al obtener los compañeros de clase: " + error.message
      );
    }
  }
}

module.exports = new EstudianteService();
