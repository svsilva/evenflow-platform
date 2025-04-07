const { body, query } = require('express-validator');

const validarLocal = [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email, inválido'),
    body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
    body('tipoDocumento').isIn([ 'cpf', 'cnpj']).withMessage('Tipo de documento inválido'),
    body('documento').custom((value, { req }) => {
        if (req.body.tipoDocumento === 'cpf') {
            // Remoção de caracteres não numéricos
            const cpfLimpo = value.replace(/\D/g, '');
            if (!/^\d{11}$/.test(cpfLimpo)) {
                throw new Error('CPF inválido');
            }
        } else if (req.body.tipoDocumento === 'cnpj') {
            // Remoção de caracteres não numéricos
            const cnpjLimpo = value.replace(/\D/g, '');
            if (!/^\d{14}$/.test(cnpjLimpo)) {
                throw new Error('CNPJ inválido');
            }
        }
        return true;
    }),
    body('endereco').optional().isObject().withMessage('Endereço de ser um objeto'),
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
    body('endereco.estado').if(body('endereco').exists()).isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres'),
    body('capacidade').isInt({ min: 1 }).withMessage('Capacidade deve ser maior que zero'),
    body('status').optional().isIn(['ativo', 'inativo']).withMessage('Status inválido')
];

//Validação de listagem
const validarConsultaLocais = [
    query('pagina').optional().isInt({ min: 1 }).withMessage('Página deve ser um número inteiro positivo'),
    query('limite').optional().isInt({ min: 1, max: 10 }).withMessage('Página deve ser um número inteiro positivo'),
    query('nome').optional().trim(),
    query('email').optional().trim(),
    query('capacidade').optional().isInt({ min: 1 }).withMessage('Capacidade deve ser maior que zero')
];

module.exports = {
    validarLocal,
    validarConsultaLocais
};