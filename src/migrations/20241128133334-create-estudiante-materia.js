module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EstudianteMateria', {
      estudianteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Estudiantes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      materiaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Materias',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EstudianteMateria');
  },
};
