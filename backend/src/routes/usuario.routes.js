const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/auth');
const { validarCadastroUsuario, validarAtualizacaoUsuario, validarConsultaUsuarios } = require('../validators/usuarioValidators');

//Rotas públicas
router.post('/', validarCadastroUsuario, usuarioController.cadastrarUsuario);
router.get('/', validarConsultaUsuarios, usuarioController.listarUsuario);
router.get('/:id', usuarioController.buscarUsuario);

//Rotas protegidas
router.put('/:id', autenticar, validarAtualizacaoUsuario, usuarioController.atualizarUsuario);

module.exports = router;