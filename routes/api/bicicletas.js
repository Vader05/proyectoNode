var express=require('express');
var router= express.Router();
var bicicletaController= require("../../controllers/api/bicicletaControllerAPI");

router.get('/',bicicletaController.bicicleta_lis);
router.post('/create',bicicletaController.bicicleta_create);
router.delete('/delete',bicicletaController.bicicleta_delete);

module.exports=router;
