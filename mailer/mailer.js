const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');


let mailConfig;
if (process.env.NODE_ENV === 'production') {
   console.log('entra con sendgrid');
    const options={
        auth:{
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailConfig=sgTransport(options);
}else{
    if (process.env.NODE_ENV === 'staging') {
        console.log('xxxxxxxxxxxxx');
        const options ={
            auth:{
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailConfig=sgTransport(options);
    }else{
        
        mailConfig={
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ethereal_user, 
                pass: process.env.ethereal_pwd
            }
        };
        
    }
}

/*
const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587 ,
    auth: {
        user:'zion.reynolds21@ethereal.email' ,
        pass:'9gugvHggbYFw7G4s7v'
    }
};
*/
module.exports= nodemailer.createTransport(mailConfig);