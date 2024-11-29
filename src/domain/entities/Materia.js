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
        model: 'Programas', // El nombre de la tabla
        key: 'id',
      },
    },
  });

  Materia.associate = (models) => {
    // Una materia pertenece a un programa
    Materia.belongsTo(models.Programa, {
      foreignKey: 'programaId',
      as: 'programa',
    });

    // Relación muchos a muchos con Estudiantes a través de EstudianteMateria (tabla intermedia)
    Materia.belongsToMany(models.Estudiante, {
      through: 'EstudianteMateria',
      foreignKey: 'materiaId',
      as: 'estudiantes',
    });

    // Relación muchos a muchos con Profesores a través de ProfesorMateria (tabla intermedia)
    Materia.belongsToMany(models.Profesor, {
      through: 'ProfesorMateria',
      foreignKey: 'materiaId',
      as: 'profesores',
    });
  };

  return Materia;
};
