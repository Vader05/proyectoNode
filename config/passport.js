const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const Usuario = require ('../models/usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
        Usuario.findOne({email: email}, function (err, usuario) {
            console.log(usuario);
            if (err) return done(err);
            if (!usuario) return done(null, false, {message : "Email no encontrado"});
            if (!usuario.validPassword(password)) return done (null, false, {message : "Password Incorrecto"});
            return done(null, usuario);
        });
    }
));

passport.serializeUser(function(user, cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    Usuario.findById(id, function(err, usuario){
        cb(err, usuario);
    });
});

module.exports= passport;
