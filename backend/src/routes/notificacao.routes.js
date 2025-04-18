const express = require('express');
const router = express.Router(); 

const notificacaoController = require('../controllers/notificacaoController');
const {validarCriacaoNotificacao, validarParamId} = require('../validators/notificacaoValidators')
const {autenticar} = require('../middlewares/auth');

// Rotas públicas
router.get('/usuario/:usuarioId', validarParamId('usuarioId'), notificacaoController.listarNotificacoesPorUsuario); // Listar notificações de um usuário

// Rotas protegidas
router.post('/', autenticar, validarCriacaoNotificacao, notificacaoController.criarNotificacao); // Criar notificação
router.put('/:id', autenticar, validarParamId('id'), notificacaoController.marcarComoLida); // Marcar notificação como lida
router.delete('/:id', autenticar, validarParamId('id'), notificacaoController.deletarNotificacao); // Deletar notificação

module.exports = router;


