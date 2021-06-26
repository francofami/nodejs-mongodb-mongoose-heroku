const Ticket = require('../models/ticket');

// ¿Quiénes tienen tickets sin resolver?

exports.clientesConTicketsSinResolver = (req, res) => {

    Ticket.aggregate([
        { $match : { estado: { $ne: "resuelto" }  } },
        { $project: { nombreCliente: 1 } }
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

// Zona con mas clientes

exports.zonaConMasClientes = (req, res) => {

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

// ¿Qué desperfectos suceden?

exports.queDesperfectosSuceden = (req, res) => {

    Ticket.aggregate([
        {$project: {tipo: '$tipo', descripcion: '$descripcion'}},
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

// Desperfectos en Avellaneda

exports.desperfectosAvellaneda = (req, res) => {

    Ticket.aggregate([
        { $match: {
          location: {
            $geoWithin: {
               $geometry: {
                  type : "Polygon" ,
                  coordinates: [ [ [
                   -58.37087631225585,
                   -34.65650993063538
                 ],
                 [
                   -58.395423889160156,
                   -34.67274685882315
                 ],
                 [
                   -58.333282470703125,
                   -34.72764644133152
                 ],
                 [
                   -58.28126907348633,
                   -34.67797023737479
                 ],
                 [
                   -58.35336685180663,
                   -34.63631522562997
                 ],
                 [
                   -58.37087631225585,
                   -34.65650993063538
                 ] ] ]
               }
            }
          }
        }
     }, { $match: { tipo: "desperfecto" } }]).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Desperfectos en Lanús

exports.desperfectosLanus = (req, res) => {

    Ticket.aggregate([
        { $match: {
          location: {
            $geoWithin: {
               $geometry: {
                  type : "Polygon" ,
                  coordinates: [ [ [
                    -58.333625793457024,
                    -34.72764644133152
                  ],
                  [
                    -58.395423889160156,
                    -34.67260568185789
                  ],
                  [
                    -58.38186264038086,
                    -34.66378164405813
                  ],
                  [
                    -58.41482162475586,
                    -34.65961637172055
                  ],
                  [
                    -58.4201431274414,
                    -34.660463562716814
                  ],
                  [
                    -58.460140228271484,
                    -34.705211167728066
                  ],
                  [
                    -58.45121383666992,
                    -34.71452466170393
                  ],
                  [
                    -58.43421936035156,
                    -34.706057892331486
                  ],
                  [
                    -58.41945648193359,
                    -34.7245425524805
                  ],
                  [
                    -58.34778785705566,
                    -34.73991976908821
                  ],
                  [
                    -58.333625793457024,
                    -34.72764644133152
                  ] ] ]
               }
            }
          }
        }
     }, { $match: { tipo: "desperfecto" } }]).then(data => {
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

exports.cadaCuantoSucedenDesperfectos = (req, res) => {

    Ticket.aggregate([
        { $match : { tipo: "desperfecto"  } },
        { $project: { fechaIncidencia: { $arrayElemAt: ["$fechasIncidencias", 0] } } }
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