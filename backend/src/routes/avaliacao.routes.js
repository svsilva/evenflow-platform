const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');
const { autenticar } = require('../middlewares/auth');
const {validarAvaliacao, validarIdAvaliacao, validarIdEvento } = require('../validators/avaliacaoValidators')

// Rotas protegidas
router.post('/', autenticar, validarAvaliacao, avaliacaoController.criarAvaliacao); // Criar avaliação
router.get('/evento/:eventoId', validarIdEvento, avaliacaoController.listarAvaliacoesPorEvento); // Listar avaliações de um evento
router.put('/:id', autenticar, validarIdAvaliacao.concat(validarAvaliacao), avaliacaoController.atualizarAvaliacao); // Atualizar avaliação
router.delete('/:id', autenticar, validarIdAvaliacao, avaliacaoController.deletarAvaliacao); // Deletar avaliação

module.exports = router;