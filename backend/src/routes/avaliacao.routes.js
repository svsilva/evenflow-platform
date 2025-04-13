const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const { autenticar } = require('../middlewares/auth');
const {validarCriacaoAvaliacao, validarAtualizacaoAvaliacao, validarId } = require('../validators/avaliacaoValidators')

// Rotas publicas:
router.get('/evento/:eventoId', validarId('eventoId'), avaliacaoController.listarAvaliacoesPorEvento); // Listar avaliações de um evento
router.get('/usuario/:usuarioId', validarId('usuarioId'), avaliacaoController.listarAvaliacoesPorUsuario); // Listar avaliações de um usuario

// Rotas protegidas
router.post('/', autenticar, validarCriacaoAvaliacao, avaliacaoController.criarAvaliacao); // Criar avaliação
router.put('/:id', autenticar, validarId('id').concat(validarAtualizacaoAvaliacao), avaliacaoController.atualizarAvaliacao); // Atualizar avaliação
router.delete('/:id', autenticar, validarId('id'), avaliacaoController.deletarAvaliacao); // Deletar avaliação

module.exports = router;