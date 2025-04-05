const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validarCadastroUsuario, validarAtualizacaoUsuario, validarConsultaUsuarios } = require('../validators/usuarioValidators');
const usuarioController = require('../controllers/usuarioController');

//Rotas públicas
router.post('/', validarCadastroUsuario, usuarioController.cadastrarUsuario);
router.get('/', validarConsultaUsuarios, usuarioController.listarUsuario);
router.get('/:id', usuarioController.buscarUsuario);

//Rotas protegidas
router.put('/:id', validarAtualizacaoUsuario, usuarioController.atualizarUsuario);

module.exports = router;