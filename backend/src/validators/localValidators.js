const { body, query } = require('express-validator');

const validarLocal = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('endereco').optional().isObject().withMessage('CEP deve ter 8 caracteres'),
    body('endereco.cep').custom((value) => {
        const cepRegex = /^\d{2}\.?\{3}-?\d{3}$/;
        if(!cepRegex.test(value)){
            throw new Error('O CEP deve estar no formato XXXXX-XXX, XXXXXXXX ou XX.XXX-XXX');
        }
        return true;
    }),
    body('endereco.rua').if(body('endereco').exists()).trim().notEmpty().withMessage('Rua é obrigatória'),
    body('endereco.bairro').if(body('endereco').exists()).trim().notEmpty().withMessage('Bairro é obrigatório'),
    body('endereco.numero').if(body('endereco').exists()).trim().notEmpty().withMessage('Número é obrigatório'),
    body('endereco.complemento').optional().trim(),
    body('endereco.cidade').if(body('endereco').exists()).trim().notEmpty().withMessage('Cidade é obrigatória'),
    body('endero.estado').if(body('endereco').exists()).isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres'),
    body('capacidade').isInt({ min: 1 }).withMessage('Capacidade deve ser maior que zero'),
    body('status').optional().isIn(['ativo', 'inativo']).withMessage('Status inválido')
];

module.exports = {
    validarLocal
};