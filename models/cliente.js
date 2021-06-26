/**
 * User
 *
 * @module      :: Model
 * @description :: Represent data model for the User
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Cliente = new Schema({

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
    packs: {
        type: Array,
        required: true
    },
    nombreCliente: {
        type: String,
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

module.exports = mongoose.model('Cliente', Cliente);