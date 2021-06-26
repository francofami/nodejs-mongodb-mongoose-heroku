const express = require('express')
const router = express.Router()
const TicketController = require('../controllers/ticket.controller');

router.get('/obtenerTicketsPorLocalidad', TicketController.obtenerTicketsPorLocalidad);
router.get('/clienteEsEmpleado', TicketController.clienteEsEmpleado);

module.exports = router