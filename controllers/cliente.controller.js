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
   },
   { $sort : { total : -1 } },
   { $limit: 2 }]).then(data => {
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
    {$group: {_id: "$dni"}},
    {$lookup: {
           from: "empleados",
           localField: "_id",
           foreignField: "dni",
           as: "empleados"
         }
    },
    {$match:{empleados:{$ne:[]}}},
    {$project: {nombre:"$empleados.nombreEmpleado"}}
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

exports.clienteCercaDeResponsable = (req, res) => {

    //Cliente.createIndex({geometry:'2dsphere'});

    Cliente.aggregate([
        {
          $geoNear: {
            near: {
                "type": "Point",
                "coordinates": [-58.36805999279022, -34.66401990542436]
            }, 
            distanceField: "Distancia",
            maxDistance: 20000000000,
          }
        },
        { $project: { "Distancia": 1 } }
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