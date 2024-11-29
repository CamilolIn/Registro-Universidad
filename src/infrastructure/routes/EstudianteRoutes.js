const express = require('express');
const router = express.Router();
const EstudianteController = require('../controllers/EstudianteController');

router.post('/registrar', EstudianteController.registrarEstudiante);
router.get('/estudiante-programa/:id', EstudianteController.obtenerEstudiante);
router.post('/inscribir-materia/', EstudianteController.incribirMaterias);
router.get("/:estudianteId/companeros", EstudianteController.obtenerCompaneros);

module.exports = router;
