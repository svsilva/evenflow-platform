const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validarCadastroUsuario } = require('../validators/usuarioValidators');
const usuarioController = require('../controllers/usuarioController');

//Rotas públicas
router.post('/', validarCadastroUsuario, usuarioController.cadastrarUsuario);

module.exports = router;