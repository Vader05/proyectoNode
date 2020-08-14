const Usuario= require('../../models/usuario');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcrypt');

module.exports={
    aunthenticate:function (req, res, next) {
        Usuario.findOne({email:req.body.email}, function (err,userInfo) {
            if (err) {
                next(err);
            }else{
                if (userInfo === null) {return res.status(401).json({status: 'error', message:'invalido email/password', data: null });};
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
                    userInfo.save(function (err, usuario) {
                        const token= jwt.sign({id: usuario._id}, req.app.get('secretKey'), {expiresIn: '7d'});
                        res.status(200).json({message: 'usuario encontrado', data:{usuario:usuario, token:token}});
                    });
                 }else{
                     res.status(401).json({status:'error', message:'invalido email/password', data:null});
                 };
            };
        });
    },
    forgotPassword: function (req, res, next) {
        Usuario.findOne({email:req.body.email}, function (err, usuario) {
           if(!usuario) return res.status(401).json({message:'no existe un usuario', data: null});
            usuario.resetPassword(function (err) {
                if (err) { return next(err);}
                res.status(200).json({message:'se envio un emain para restablecer el password',data:null});
            });
        });
    },
    authFacebookToken: function (req, res, next) {
        if (req.user) {
            req.user.save().then( ()=>{
                const token=jwt.sign({id: req.user.id}, req.app.get('secretKey'),{expiresIn:'7d'});
                res.status(200).json({message:"usuario encontrado o creado!",data:{user:req.user, token:token}});
            }).catch( (err)=>{
                console.log(err);
                res.status(500).json({message: err.message});
            })
        }else{
            res.status(401);
        }
    },
};