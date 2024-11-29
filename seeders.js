// migrate.js
require('dotenv').config(); // Cargar las variables de entorno desde .env

const { execSync } = require('child_process');

try {
  console.log('Ejecutando migraciones...');
  execSync('cd src && npx sequelize-cli db:seed:all --config config/sequelize-cli.config.js', { stdio: 'inherit' });
  console.log('Migraciones ejecutadas correctamente');
} catch (error) {
  console.error('Error al ejecutar las migraciones:', error);
}
