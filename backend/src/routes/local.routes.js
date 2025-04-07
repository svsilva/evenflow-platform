const express = require('express');
const router = express.Router();
const localController = require('../controllers/localController');
const { validarLocal } = require('../validators/localValidators');
const { autenticar } = require('../middlewares/auth');

//Rotas públicas


//Rotas protegidas
router.post('/', autenticar, validarLocal, localController.criarLocal);

module.exports = router;