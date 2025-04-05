const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarLogin, validarRecuperacaoSenha } = require('../validators/authValidators');
const { autenticar } = require('../middlewares/auth');

//Rotas de autenticação
router.post('/login', validarLogin, authController.login);
router.post('/recuperar-senha', validarRecuperacaoSenha, authController.recuperarSenha);

//Rotas protegidas
router.get('/verificar', autenticar, authController.verificarToken);

module.exports = router;