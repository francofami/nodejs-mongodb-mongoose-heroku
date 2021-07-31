const express = require('express')
const router = express.Router()
const EmpleadoController = require('../controllers/empleado.controller');

router.get('/quienAtiendeMasTickets', EmpleadoController.quienAtiendeMasTickets);
router.get('/trabajoAntesDeLas12', EmpleadoController.trabajoAntesDeLas12);
router.get('/trabajoDespuesDeLas12', EmpleadoController.trabajoDespuesDeLas12);
router.get('/queTanLejosDesperfecto', EmpleadoController.queTanLejosDesperfecto);

module.exports = router