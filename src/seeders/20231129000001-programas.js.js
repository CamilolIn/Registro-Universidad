module.exports = {
  up: async (queryInterface, Sequelize) => {
    const programas = [
      {
        nombre: "Ingeniería Informática",
        descripcion: "Desarrollo de sistemas y software.",
        creditos: 180,
      },
      {
        nombre: "Medicina",
        descripcion: "Ciencias de la salud.",
        creditos: 240,
      },
      {
        nombre: "Derecho",
        descripcion: "Estudios jurídicos y legales.",
        creditos: 180,
      },
      {
        nombre: "Psicología",
        descripcion: "Estudios de la mente humana.",
        creditos: 180,
      },
      {
        nombre: "Economía",
        descripcion: "Estudios de mercados y economía global.",
        creditos: 180,
      },
    ];

    const now = new Date();

    const programasExistentes = await queryInterface.sequelize.query(
      "SELECT nombre FROM `Programas`",
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const nombresProgramasExistentes = programasExistentes.map(
      (programa) => programa.nombre
    );

    const programasPorInsertar = programas.filter(
      (programa) => !nombresProgramasExistentes.includes(programa.nombre)
    );

    if (programasPorInsertar.length > 0) {
      const programasData = programasPorInsertar.map((programa) => ({
        nombre: programa.nombre,
        descripcion: programa.descripcion,
        creditos: programa.creditos,
        createdAt: now,
        updatedAt: now,
      }));

      await queryInterface.bulkInsert("Programas", programasData, {});
      ("Programas insertados correctamente.");
    } else {
      ("Los programas ya existen en la base de datos.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Programas", null, {});
  },
};
