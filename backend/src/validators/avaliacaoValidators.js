const { body, query, param } = require('express-validator'); 
// Validações para criar e atualizar avaliações
const validarCriacaoAvaliacao = [
    body('nota')
        .isFloat({ min: 1, max: 5 })
        .withMessage('A nota deve ser um número entre 1 e 5.'),
    body('comentario')
        .optional()
        .isString()
        .withMessage('O comentário deve ser um texto.'),
    body('eventoId')
        .isUUID()
        .withMessage('O ID do evento deve ser um UUID válido.')
];

const validarAtualizacaoAvaliacao = [
    body('nota')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('A nota deve ser um número entre 1 e 5.'),
    body('comentario')
        .optional()
        .isString()
        .withMessage('O comentário deve ser um texto.')
];

// Validação para o ID da avaliação
const validarIdAvaliacao = [
    param('id')
        .isUUID()
        .withMessage('O ID da avaliação deve ser um UUID válido.')
];

// Validação para o ID do evento
const validarIdEvento = [
    param('eventoId')
        .isUUID()
        .withMessage('O ID do evento deve ser um UUID válido.')
];

module.exports = {
    validarCriacaoAvaliacao,
    validarAtualizacaoAvaliacao,
    validarIdAvaliacao,
    validarIdEvento
};
