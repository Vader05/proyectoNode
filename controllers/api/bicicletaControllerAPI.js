var Bicicleta= require("../../models/bicicleta")
/*
exports.bicicleta_lis= function(req,res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}
*/
exports.bicicleta_list = function (req,res){
    Bicicleta.allBicis(function(err,bicis){
        res.status(200).json({Bicicletas:bicis});
    });
}

exports.bicicleta_create = function(req,res){
    
    var bici= new Bicicleta({code:req.body.code, color: req.body.color,modelo: req.body.modelo, ubicacion:[req.body.lat, req.body.long]});
    console.log('bicicleta',bici);
    Bicicleta.add(bici, function(err){
        if (err) console.log(err);
    });
    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete=function(req, res){
    Bicicleta.removeById(req.body.id);
    res.status("204").send();
}