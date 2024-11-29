// Ejemplo de migración para ProfesorMateria
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProfesorMateria', {
      profesorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profesores',
          key: 'id'
        }
      },
      materiaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materias',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProfesorMateria');
  }
};
