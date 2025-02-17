const Sequelize = require('sequelize');
const config = require('../../config/database');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

db.Estudiante = require('../../domain/entities/Estudiante')(sequelize, Sequelize.DataTypes);
db.Programa = require('../../domain/entities/Programa')(sequelize, Sequelize.DataTypes);
db.Materia = require('../../domain/entities/Materia')(sequelize, Sequelize.DataTypes);
db.Profesor = require('../../domain/entities/Profesor')(sequelize, Sequelize.DataTypes);

db.Estudiante.associate(db);
db.Materia.associate(db);
db.Programa.associate(db);
db.Profesor.associate(db);

testConnection();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
