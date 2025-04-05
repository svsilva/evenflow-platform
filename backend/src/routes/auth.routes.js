const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarLogin } = require('../validators/authValidators');
const { autenticar } = require('../middlewares/auth');

//Rotas de autenticação
router.post('/login', validarLogin, authController.login);

module.exports = router;