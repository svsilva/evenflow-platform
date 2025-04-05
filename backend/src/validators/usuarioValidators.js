const { body, query } = require('express-validator');

const validarCadastroUsuario = [
    body('nome').trim().notEmpty().withMessage('Nome não pode estar vazio'),
    body('email').isEmail().withMessage('Email, inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('tipoDocumento').isIn([ 'cpf', 'cnpj']).withMessage('Tipo de documento inválido'),
    body('documento').custom((value, { req }) => {
        if(req.body.tipoDocumento === 'cpf'){
            if(!/^\d{11}$/.test(value)){
                throw new Error('CPF inválido');
            }
        }else if(req.body.tipoDocumento === 'cnpj'){
            if(!/^\d{14}$/.test(value)){
                throw new Error('CNPJ inválido');
            }
        }
        return true;
    }),
    body('dataNascimento').isDate().withMessage('Data de nascimento inválida'),
    body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
    body('endereco').optional().isObject().withMessage('Endereço de ser um objeto'),
    body('endereco.rua').if(body('endereco').exists()).trim().notEmpty().withMessage('Rua é obrigatória'),
    body('endereco.bairro').if(body('endereco').exists()).trim().notEmpty().withMessage('Bairro é obrigatório'),
    body('endereco.numero').if(body('endereco').exists()).trim().notEmpty().withMessage('Número é obrigatório'),
    body('endereco.complemento').optional().trim(),
    body('endereco.cidade').if(body('endereco').exists()).trim().notEmpty().withMessage('Cidade é obrigatória'),
    body('endero.estado').if(body('endereco').exists()).isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres')
];

module.exports = {
    validarCadastroUsuario,
}