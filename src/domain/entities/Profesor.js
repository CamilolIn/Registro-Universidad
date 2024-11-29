module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesores', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    programaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Programas',
        key: 'id'
      },
      allowNull: false,
    },
  });

  Profesor.associate = (models) => {
    Profesor.belongsTo(models.Programa, {
      foreignKey: 'programaId',
      as: 'programa',
    });

    Profesor.belongsToMany(models.Materia, {
      through: 'ProfesorMateria',
      foreignKey: 'profesorId',
      as: 'materias',
    });
  };

  return Profesor;
};
