module.exports = (sequelize, DataTypes) => {
  const EstudianteMateria = sequelize.define(
    'EstudianteMateria',
    {
      estudianteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Estudiantes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      materiaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Materias',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: false,
    }
  );

  return EstudianteMateria;
};
