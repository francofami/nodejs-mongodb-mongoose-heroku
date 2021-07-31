const Empleado = require('../models/empleado');
const Cliente = require('../models/cliente');
const Ticket = require('../models/ticket');

// ¿Quién atiende más tickets?

exports.quienAtiendeMasTickets = (req, res) => {

    Empleado.aggregate([
        {
             $group: {
                 _id: "$nombreEmpleado",
                 total: { $sum: { $size:"$tickets" } }
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

// ¿A qué hora hay mas trabajo? (Antes de las 12)

exports.trabajoAntesDeLas12 = (req, res) => {

    Ticket.aggregate([
        { $match : { tipo: "desperfecto"  } },
        { $project: 
            { tipo: "$tipo", 
                  fechaIncidencia:  { $arrayElemAt: ["$fechasIncidencias", 0] },
              lt: { $lt: [ { $hour: { $arrayElemAt: ["$fechasIncidencias", 0] } }, 12 ] }, } },
        { $match : { lt: true  } },
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


// ¿A qué hora hay mas trabajo? (Despues de las 12)

exports.trabajoDespuesDeLas12 = (req, res) => {

    Ticket.aggregate([
        { $match : { tipo: "desperfecto"  } },
	    { $project: 
		    {   tipo: "$tipo", 
		        fechaIncidencia:   { $arrayElemAt: ["$fechasIncidencias", 0]  } ,
		        gt: { $gte: [ { $hour: { $arrayElemAt: ["$fechasIncidencias", 0] } }, 12 ] }
	        } 
        },
        { $match : { gt: true  } },
        
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

// Que tan lejos está el empleado del cliente con desperfecto

exports.queTanLejosDesperfecto = (req, res) => {

    Cliente.aggregate([
        { $unwind: "$nombreCliente" },
        { $project: {"location": 1 } }
        ]).then( locationCliente => {

            dataArray = [];

            locationCliente.forEach(loc => {

                Empleado.aggregate([
        
                    {
                        $geoNear: {
                           near: loc.location,
                       maxDistance: 99999,
                       distanceField: "calcDistance",        
                           spherical: true
                        }
                      },
                      { $project: { "nombreEmpleado": 1, "nombreCliente" :"$tickets.nombreCliente", "calcDistance": 1 } }
                    
                 ]).then( data => {
                    dataArray.push(data);
                    console.log(dataArray);
                    
                }).catch( err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                });
                
            });
            
            
        }).then( res.send(dataArray) ).catch( err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

