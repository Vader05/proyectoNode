const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587 ,
    auth: {
        user:'zion.reynolds21@ethereal.email' ,
        pass:'9gugvHggbYFw7G4s7v'
    }
};
module.exports= nodemailer.createTransport(mailConfig);