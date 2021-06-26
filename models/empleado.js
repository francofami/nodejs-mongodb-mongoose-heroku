/**
 * User
 *
 * @module      :: Model
 * @description :: Represent data model for the User
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Empleado = new Schema({

    nombreEmpleado: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    tickets: {
        type: Array,
        required: true
    },
    dni: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Empleado', Empleado);