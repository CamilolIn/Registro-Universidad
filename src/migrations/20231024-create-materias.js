module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Materias', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nombre: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        descripcion: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        creditos: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        programaId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Programas',
            key: 'id',
          },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Materias');
    },
  };
  