const { body, query } = require('express-validator');
const moment = require('moment');

const validarCadastroUsuario = [
    body('nome').trim().notEmpty().withMessage('Nome não pode estar vazio'),
    body('email').isEmail().withMessage('Email, inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
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
    body('dataNascimento').custom((value) => {
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(value)){
            throw new Error('Data de nascimento deve estar no formato dd/mm/yyyy');
        }
        const dataValida = moment(value, 'DD/MM/YYYY', true).isValid();
        if(!dataValida){
            throw new Error('Data de nascimento inválida');
        }
        return true
    }),
    body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
    body('endereco').optional().isObject().withMessage('Endereço de ser um objeto'),
    body('endereco.rua').if(body('endereco').exists()).trim().notEmpty().withMessage('Rua é obrigatória'),
    body('endereco.bairro').if(body('endereco').exists()).trim().notEmpty().withMessage('Bairro é obrigatório'),
    body('endereco.numero').if(body('endereco').exists()).trim().notEmpty().withMessage('Número é obrigatório'),
    body('endereco.complemento').optional().trim(),
    body('endereco.cidade').if(body('endereco').exists()).trim().notEmpty().withMessage('Cidade é obrigatória'),
    body('endero.estado').if(body('endereco').exists()).isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres')
];

//Validação de consulta
const validarConsultaUsuarios = [
    query('pagina').optional().isInt({ min: 1 }).withMessage('Página deve ser um número inteiro positivo'),
    query('limite').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser um número entre 1 e 100'),
    query('nome').optional().trim(),
    query('email').optional().trim(),
    query('nivelAcesso').optional().isIn(['admin', 'organizador', 'usuario']).withMessage('Nível de acesso inválido')
];


module.exports = {
    validarCadastroUsuario,
    validarConsultaUsuarios
}