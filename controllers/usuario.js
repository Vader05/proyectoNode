var Usuario= require('../models/usuario');

module.exports={
    list: function (req, res, next) {
        Usuario.find({},(err, usuarios)=>{
            res.render('usuarios/index', {usuarios:usuarios});
        });
    },
    update_get: function (req, res ,next) {
        Usuario.findById(req.params.id, function (err, usuario) {
            res.render('usuarios/update',{errors:{}, usuario:usuario}); 
        });
    },
    update: function (req, res, next) {
        var update_value={nombre:req.body.nombre};
        Usuario.findByIdAndUpdate(req.params.id, update_value, function (err, usuario) {
          if (err) {
             console.log(err);
             res.render('usuarios/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email:req.body.email})});    
          }else{
             res.redirect('/usuarios');
             return;
            }
        });
    },
    create_get: function (err, res, next) {
        res.render('usuarios/create',{errors:{}, usuario: Usuario()});
    },
    create: function (req, res, next) {
        console.log(req.body.password );
        console.log(req.body.confirm_password );
        console.log(req.body.nombre);
        if (req.body.password != req.body.confirm_password) {
          res.render('usuarios/create', {errors: {confirm_password: {message:'no coincide con el password ingresado'}}, usuario: new Usuario({nombre: req.body.nombre, email:req.body.email,password:req.body.password })});
          return;
        }
        var nuevou= new Usuario();
        nuevou= {nombre: req.body.nombre, email:req.body.email, password:req.body.password}

        Usuario.create( {nombre: nuevou.nombre, email:nuevou.email, password:nuevou.password}, function (err, nuevoUsuario) { 
            console.log(nuevoUsuario);
            if (err) {
                console.log(err);

                res.render('usuarios/create', {errors: {}, usuario: new Usuario({nombre:req.body.nombre,email:req.body.email})});
            }else{
                nuevoUsuario.enviar_email_bienvenida();
                res.redirect('/usuarios');
            }
        });       
    },
    delete: function (req, res, next) {
        console.log(req.body.id); 
        Usuario.findByIdAndDelete(req.body.id, function (err) {
            if(err)
              next(err);
            else
              res.redirect('/usuarios');
        });
    }
}