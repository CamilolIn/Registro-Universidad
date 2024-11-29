module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla Profesores
    await queryInterface.createTable("Profesores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      especialidad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      programaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Programas", // Tabla relacionada
          key: "id", // Columna en la tabla Programas
        },
        allowNull: false,
        onDelete: "CASCADE", // Opcional: Si se elimina un programa, se eliminan los profesores asociados
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Crear la relación entre Profesores y Programas
    await queryInterface.addConstraint("Profesores", {
      fields: ["programaId"],
      type: "foreign key",
      name: "fk_profesor_programa", // Nombre opcional de la clave foránea
      references: {
        table: "Programas",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la relación de la clave foránea
    await queryInterface.removeConstraint("Profesores", "fk_profesor_programa");

    // Eliminar la tabla Profesores
    await queryInterface.dropTable("Profesores");
  },
};
