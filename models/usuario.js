var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Reserva= require('./reserva');
var Schema= mongoose.Schema;
const Token = require('../models/token');

const crypto = require('crypto');
const mailer = require ('../mailer/mailer');
const bcrypt = require('bcrypt');
const { callbackPromise } = require('nodemailer/lib/shared');
const saltRounds = 10;


const validateEmail = function(email){
    const re= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        timr: true,
        required: [true, 'El nombre es obligatorio']

    },
    email:{
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese email valido'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
    },
    password: {
        type: String,
        required: [true, ' El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado:{
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String
});
usuarioSchema.plugin(uniqueValidator, {message: 'el {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(done){
    if(this.isModified('password')){
        this.password= bcrypt.hashSync(this.password, saltRounds);
    }
    done();
});

usuarioSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta,cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde:desde, hasta:hasta});
    console.log(reserva);
    reserva.save(cb);
    return reserva;
}

usuarioSchema.methods.enviar_email_bienvenida=function (cb) {
    console.log(this.id);
    const token = new Token({_userId:this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination=this.email;
    
    token.save(function (err) {
        if (err){return console.log(err.message);}
        
        const mailOptions ={
            from:'kevin.cueva2@unmsm.edu.pe',
            to: email_destination,
            subject:'verificacion de cuenta',                                   //LOCAL 'http://localhost:3000'  
            text:'Hola,\n\n'+'por favor verificar su cuenta haga click en el este link:\n'+process.env.HOST+'\/token/confirmation\/'+ token.token + '\n'
            }       
        mailer.sendMail(mailOptions, function (err) {
            if(err){ return console.log(err.message);}

            console.log('Se a enviado un mensaje de bienvenida a: '+ email_destination+'.');
        });
    });
}

usuarioSchema.methods.resetPassword = function (cb) {
    const token = new Token({_userId:this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination=this.email;
    token.save(function (err) {
        if (err){return cb(err);}

        const mailOptions={
            from:'kevin.cueva2@unmsm.edu.pe',
            to: email_destination,
            subject:'Reseteo de password de cuenta',
            text:'Hola,\n\n'+'por favor, para resetear el password de su cuenta haga click en el este link:\n'+process.env.HOST+'\/resetPassword\/'+ token.token + '\n'        
        };
        mailer.sendMail(mailOptions, function (err) {
            if(err){ return cb(err);}

            console.log('se envio un email para resetear el password a: '+ email_destination+'.');
        });
        cb(null);
    });
}

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback){
    const self= this;
    console.log(condition);
    self.findOne({
        $or: [
            {'googleId': condition.id }, {'email': condition.emails[0].value}
        ]},(err,result)=>{
            if(result){
                callback(err, result)
            }else{
                console.log('_________CONDITION_______');
                console.log(condition);
                let values = {};
                values.googleId= condition.id;
                values.email= condition.emails[0].value;
                values.nombre = condition.displayName || 'SIN NOMBRE';
                values.verificado= true;
                values.password= crypto.randomBytes(16).toString('hex');
                console.log('_______VALUES______');
                console.log(values);
                self.create(values, (err, result)=>{
                    if (err) {console.log(err);}
                    return callback(err, result);
                });
            }
        }
    );
}


usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(condition, callback){
    const self= this;
    console.log(condition);
    self.findOne({
        $or: [
            {'facebookId': condition.id }, {'email': condition.emails[0].value}
        ]},(err,result)=>{
            if(result){
                callback(err, result)
            }else{
                console.log('_________CONDITION_______');
                console.log(condition);
                let values = {};
                values.facebookId= condition.id;
                values.email= condition.emails[0].value;
                values.nombre = condition.displayName || 'SIN NOMBRE';
                values.verificado= true;
                values.password= crypto.randomBytes(16).toString('hex');
                console.log('_______VALUES______');
                console.log(values);
                self.create(values, (err, result)=>{
                    if (err) {console.log(err);}
                    return callback(err, result);
                });
            }
        }
    );
}

module.exports= mongoose.model('Usuario', usuarioSchema);