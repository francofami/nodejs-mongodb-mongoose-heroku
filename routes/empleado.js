const express = require('express')
const router = express.Router()
const EmpleadoController = require('../controllers/empleado.controller');

router.get('/quienAtiendeMasTickets', EmpleadoController.quienAtiendeMasTickets);

module.exports = router