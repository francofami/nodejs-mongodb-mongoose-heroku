const express = require('express')
const router = express.Router()
const TicketController = require('../controllers/ticket.controller');

router.get('/clientesConTicketsSinResolver', TicketController.clientesConTicketsSinResolver);
router.get('/zonaConMasDesperfectos', TicketController.zonaConMasDesperfectos);
router.get('/queDesperfectosSuceden', TicketController.queDesperfectosSuceden);
router.get('/desperfectosAvellaneda', TicketController.desperfectosAvellaneda);
router.get('/desperfectosLanus', TicketController.desperfectosLanus);
router.get('/cadaCuantoSucedenDesperfectos', TicketController.cadaCuantoSucedenDesperfectos);

module.exports = router