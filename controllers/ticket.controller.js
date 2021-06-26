const Ticket = require('../models/ticket');

// Zona con mas clientes

exports.obtenerTicketsPorLocalidad = (req, res) => {

    Ticket.aggregate([
        {$project: {"localidad.descripcion": 1}},
        {$group: {_id: "$localidad.descripcion", total: {$sum: 1}} }]).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// ¿Qué cliente es también empleado?

exports.clienteEsEmpleado = (req, res) => {

    Ticket.aggregate([{
        $lookup: {
            from: 'empleados',
            as: 'empleados',
            let: { dni: "$dni" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: {
                                $eq: ['$dni', '$$dni']
                            }
                        }
                    }
                },
                {
                    $project: {
                        nombreEmpleado: 1
                    }
                }
            ]
        }
    }]).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// ¿Quien hizo mas tickets?

// ¿Qué desperfectos suceden?

// ¿Dónde suceden los desperfectos?

exports.dondeSucedenDesperfectos = (req, res) => {

    Ticket.aggregate([
        {$project: {"localidad.descripcion": 1}},
        {$group: {_id: "$localidad.descripcion", total: {$sum: 1}} }]).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// ¿Cada cuánto suceden los desperfectos?

// ¿Quién atiende más tickets?

// ¿A qué hora hay mas trabajo?

// ¿Qué trabajo está sin resolver?