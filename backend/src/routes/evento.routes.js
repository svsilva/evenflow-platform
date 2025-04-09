const express = require('express');
const router = express.Router(); 

const eventoController = require('../controllers/eventoController');
const {validarCriacaoEvento, validarConsultaEventos, validarAtualizacaoEvento} = require('../validators/eventoValidators')
const {autenticar} = require('../middlewares/auth');

// Rotas públicas
router.get('/', validarConsultaEventos, eventoController.listarEventos); // Listar eventos
router.get('/:id', eventoController.buscarEventoPorId); 


// Rotas protegidas
router.post('/', validarCriacaoEvento , eventoController.criarEvento); // Criar evento
router.put('/:id', autenticar, validarAtualizacaoEvento, eventoController.atualizarEventoPeloId)
router.put('/:id', autenticar, eventoController.deletarEventoPeloId);

module.exports = router;