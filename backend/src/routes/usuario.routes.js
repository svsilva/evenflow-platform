const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/auth');
const { validarCadastroUsuario, validarAtualizacaoUsuario, validarConsultaUsuarios, validarArquivoImagem } = require('../validators/usuarioValidators');
const { upload, processarUpload } = require('../middlewares/upload');

//Rotas públicas
router.post('/', validarCadastroUsuario, upload.single('foto'), validarArquivoImagem, processarUpload, usuarioController.cadastrarUsuario);
router.get('/', validarConsultaUsuarios, usuarioController.listarUsuario);
router.get('/:id', usuarioController.buscarUsuario);

//Rotas protegidas
router.put('/:id', autenticar, validarAtualizacaoUsuario, usuarioController.atualizarUsuario);
router.delete('/:id', autenticar, usuarioController.deletarUsuario);

module.exports = router;