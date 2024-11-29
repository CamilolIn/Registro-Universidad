module.exports = {
  up: async (queryInterface, Sequelize) => {
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
          model: "Programas",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
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

    await queryInterface.addConstraint("Profesores", {
      fields: ["programaId"],
      type: "foreign key",
      name: "fk_profesor_programa",
      references: {
        table: "Programas",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Profesores", "fk_profesor_programa");
    await queryInterface.dropTable("Profesores");
  },
};
