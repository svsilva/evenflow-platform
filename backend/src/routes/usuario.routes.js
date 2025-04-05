const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validarCadastroUsuario, validarConsultaUsuarios } = require('../validators/usuarioValidators');
const usuarioController = require('../controllers/usuarioController');

//Rotas públicas
router.post('/', validarCadastroUsuario, usuarioController.cadastrarUsuario);
router.get('/:id', usuarioController.buscarUsuario);

module.exports = router;