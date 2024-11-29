// src/routes/profesorRoutes.js
const express = require('express');
const ProfesorController = require('../controllers/profesorController');

const router = express.Router();

// Definir las rutas para listar los profesores y sus estudiantes
router.get('/profesores-estudiantes', ProfesorController.listarProfesoresYEstudiantes);

module.exports = router;
