const Empleado = require('../models/empleado');

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