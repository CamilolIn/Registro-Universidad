module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiantes', {
    nombre: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'El nombre ya está en uso, elige otro.',
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El nombre no puede estar vacío.',
        },
        len: {
          args: [3, 255],
          msg: 'El nombre debe tener entre 3 y 255 caracteres.',
        },
      },
    },
    pais_residencia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Estudiante.associate = (models) => {
    Estudiante.belongsToMany(models.Programa, {
      through: 'EstudiantePrograma',
      foreignKey: 'estudianteId',
      as: 'programas',
    });
    Estudiante.belongsToMany(models.Materia, {
      through: 'EstudianteMateria',
      foreignKey: 'estudianteId',
      as: 'materias',
    });
  };

  return Estudiante;
};
