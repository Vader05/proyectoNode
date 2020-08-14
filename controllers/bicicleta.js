var Bicicleta=require('../models/bicicleta');

exports.bicicleta_list= function (req, res) { 
    Bicicleta.allBicis((err,bicicletasAll)=>{ 
        res.render('bicicletas/index',{bicis:bicicletasAll});
    }) 
}
exports.bicicleta_create_get=function (req, res) {
    res.render('bicicletas/create')
}
exports.bicicleta_create_post=function (req, res) {
   var bici= Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo);
   bici.ubicacion=[req.body.lat,req.body.long];
   Bicicleta.add(bici);
   res.redirect('/bicicletas');
}

exports.bicicleta_update_get=function (req, res) {
    Bicicleta.findByCode(req.params.id, function (err, bici) {
        res.render('bicicletas/update', {bici:bici})
    })
}
exports.bicicleta_update_post=function (req, res) {
    
        var update_value={code:req.body.code,color:req.body.color, modelo:req.body.modelo, ubicacion:[req.body.lat, req.body.lng]};
     
        Bicicleta.findByIdAndUpdate(req.params.id, update_value, function (err, bicicleta) {
            if (err) {
                console.log(err);
                res.render('bicicletas/update', {errors: err.errors, bici: new Bicicleta({code:req.body.code, color:req.body.color, modelo:req.body.modelo, ubicacion:[req.body.lat, req.body.lng]})});    
            }else{
                res.redirect('/bicicletas');
                return;
            }
        });
}

exports.bicicleta_delete_post= function (req, res) {
    console.log(req.body.code);
    
    Bicicleta.removeByCode(req.body.code,function (err,res) {
        if(err)console.log(err);
        
    })
        
        res.redirect('/bicicletas')
    
}