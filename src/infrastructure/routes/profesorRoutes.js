const express = require("express");
const ProfesorController = require("../controllers/profesorController");

const router = express.Router();

router.get(
  "/profesores-estudiantes",
  ProfesorController.listarProfesoresYEstudiantes
);

module.exports = router;
