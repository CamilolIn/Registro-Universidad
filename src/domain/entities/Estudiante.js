// src/domain/entities/Estudiante.js
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiantes', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
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
