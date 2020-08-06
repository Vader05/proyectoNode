var  Reserva = require('../../models/reserva');

exports.reserva_list= function(req, res){
    Reserva.find({}, function(err, reservas){
        res.status(200).json({reservas:reservas});
    })
}
