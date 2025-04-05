const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { validarCadastroUsuario, validarAtualizacaoUsuario, validarConsultaUsuarios } = require('../validators/usuarioValidators');

//Rotas públicas
router.post('/', validarCadastroUsuario, UsuarioController.cadastrarUsuario);
router.get('/', validarConsultaUsuarios, UsuarioController.listarUsuario);
router.get('/:id', UsuarioController.buscarUsuario);

//Rotas protegidas
router.put('/:id', validarAtualizacaoUsuario, UsuarioController.atualizarUsuario);

module.exports = router;