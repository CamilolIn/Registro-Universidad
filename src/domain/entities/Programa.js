module.exports = (sequelize, DataTypes) => {
    const Programa = sequelize.define('Programas', {
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
    });
  
    Programa.associate = (models) => {
      Programa.hasMany(models.Materia, {
        foreignKey: 'programaId',
        as: 'materias',
      });
    };
  
    return Programa;
  };
  