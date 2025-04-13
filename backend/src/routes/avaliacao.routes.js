const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const { autenticar } = require('../middlewares/auth');
const {validarCriacaoAvaliacao, validarAtualizacaoAvaliacao, validarIdAvaliacao, validarIdEvento } = require('../validators/avaliacaoValidators')

// Rotas publicas:
router.get('/evento/:eventoId', validarIdEvento, avaliacaoController.listarAvaliacoesPorEvento); // Listar avaliações de um evento
// Rotas protegidas
router.post('/', autenticar, validarCriacaoAvaliacao, avaliacaoController.criarAvaliacao); // Criar avaliação
router.put('/:id', autenticar, validarIdAvaliacao.concat(validarAtualizacaoAvaliacao), avaliacaoController.atualizarAvaliacao); // Atualizar avaliação
router.delete('/:id', autenticar, validarIdAvaliacao, avaliacaoController.deletarAvaliacao); // Deletar avaliação

module.exports = router;