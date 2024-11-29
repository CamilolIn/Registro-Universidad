module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define('Materias', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    programaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Programas',
        key: 'id',
      },
    },
  });

  Materia.associate = (models) => {
    Materia.belongsTo(models.Programa, {
      foreignKey: 'programaId',
      as: 'programa',
    });

    Materia.belongsToMany(models.Estudiante, {
      through: 'EstudianteMateria',
      foreignKey: 'materiaId',
      as: 'estudiantes',
    });

    Materia.belongsToMany(models.Profesor, {
      through: 'ProfesorMateria',
      foreignKey: 'materiaId',
      as: 'profesores',
    });
  };

  return Materia;
};
