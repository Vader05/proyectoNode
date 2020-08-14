const express= require('express');
const router= express.Router();
const authController= require('../../controllers/api/authControllerAPI');


router.post('/authenticate', authController.aunthenticate);
router.post('/forgotPassword', authController.forgotPassword);

module.exports= router;