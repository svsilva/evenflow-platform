const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');
const { validarIngresso } = require('../validators/ingressoValidators');
const { autenticar } = require('../middlewares/auth');

//Rotas públicas


//Rotas protegidas
router.post('/', autenticar, ingressoController.criarIngresso);

module.exports = router;