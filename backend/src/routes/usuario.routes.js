const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/auth');
const { validarCadastroUsuario, validarAtualizacaoUsuario, validarConsultaUsuarios } = require('../validators/usuarioValidators');
const { upload } = require('../middlewares/upload');

//Rotas públicas
router.post('/', validarCadastroUsuario, upload, usuarioController.cadastrarUsuario);
router.get('/', validarConsultaUsuarios, usuarioController.listarUsuario);
router.get('/:id', usuarioController.buscarUsuario);

//Rotas protegidas
router.put('/:id', autenticar, validarAtualizacaoUsuario, upload, usuarioController.atualizarUsuario);
router.delete('/:id', autenticar, usuarioController.deletarUsuario);

module.exports = router;