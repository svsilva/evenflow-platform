const { body } = require('express-validator');

const validarLogin = [
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').notEmpty().withMessage('Senha é obrigatória')
];

const validarRecuperacaoSenha = [
    body('email').isEmail().withMessage('Email inválido')
];

module.exports = {
    validarLogin,
    validarRecuperacaoSenha
}