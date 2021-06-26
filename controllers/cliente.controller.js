const Cliente = require('../models/cliente');

// Zona con mas clientes

exports.zonaConMasClientes = (req, res) => {

    Cliente.aggregate([
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

// ¿Quien hizo mas tickets?

exports.quienHizoMasTickets = (req, res) => {

    Cliente.aggregate([{
        $group: {
            _id: "$nombreCliente",
            total: { $sum: { $size:"$tickets" } }
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

// ¿Qué cliente es también empleado?

exports.clienteEsEmpleado = (req, res) => {

    Cliente.aggregate([
        {
           $lookup:
           {
               from: "empleados",
               let: { dni: "$dni",  nombreCliente: "$nombreCliente"},
               pipeline: [
                   {
                       $match:
                       {
                           $expr:
                           {
                               $and:
                               [
                                   {$eq: ["$dni", "$$dni"] },
                                   {$eq: ["$nombreEmpleado", "$$nombreCliente"]}
                               ]
                           }
                       }
                   },{$project: {dni: 0, _id: 0}}
               ],
               as: "data"
           }
        }
     ]).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};