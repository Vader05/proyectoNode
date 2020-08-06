var express = require('express');
var router = express.Router();
var reservaController = require('../../controllers/api/reservaControllerAPI');

router.get('/', reservaController.reserva_list);

module.exports = router;