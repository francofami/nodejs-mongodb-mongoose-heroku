/**
 * User
 *
 * @module      :: Model
 * @description :: Represent data model for the User
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Ticket = new Schema({

    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    numeroCliente: {
        type: Number,
        required: true
    },
    domicilio: {
        type: Object,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    localidad: {
        type: Object,
        required: true
    },
    fechasIncidencias: {
        type: Array,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    nombreCliente: {
        type: String,
        required: true
    },
    empleadosAsignados: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Ticket', Ticket);