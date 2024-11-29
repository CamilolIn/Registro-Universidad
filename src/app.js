
const express = require('express');
const morgan = require('morgan')
const { sequelize } = require('./shared/config/database');
const estudianteRoutes = require('./infrastructure/routes/EstudianteRoutes');
const profesorRoutes = require('./infrastructure/routes/profesorRoutes');

const app = express();
app.use(morgan());
app.use(express.json());

app.use('/estudiantes', estudianteRoutes);
app.use('/profesores', profesorRoutes);


// Iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Base de datos conectada');
    console.log('Servidor corriendo en el puerto 3000');
  });
});
