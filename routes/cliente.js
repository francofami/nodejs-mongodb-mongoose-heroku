const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente.controller');

router.get('/quienHizoMasTickets', ClienteController.quienHizoMasTickets);
router.get('/clienteEsEmpleado', ClienteController.clienteEsEmpleado);
router.get('/zonaConMasClientes', ClienteController.zonaConMasClientes);

module.exports = router