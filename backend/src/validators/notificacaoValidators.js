const { body, param } = require('express-validator');

// Validação para criar uma notificação
const validarCriacaoNotificacao = [
    body('nome')
        .notEmpty()
        .withMessage('O nome da notificação é obrigatório.')
        .isString()
        .withMessage('O nome da notificação deve ser um texto.'),
    body('icone')
        .optional()
        .isString()
        .withMessage('O ícone deve ser um texto.'),
    body('texto')
        .notEmpty()
        .withMessage('O texto da notificação é obrigatório.')
        .isString()
        .withMessage('O texto da notificação deve ser um texto.'),
    body('usuarioId')
        .notEmpty()
        .withMessage('O ID do usuário é obrigatório.')
        .isUUID()
        .withMessage('O ID do usuário deve ser um UUID válido.')
];

// Função genérica para validar IDs nos parametros
const validarParamId = (paramName) => [
    param(paramName)
        .isUUID()
        .withMessage(`O ID '${paramName}' deve ser um UUID válido.`)
];

module.exports = {
    validarCriacaoNotificacao,
    validarParamId
};