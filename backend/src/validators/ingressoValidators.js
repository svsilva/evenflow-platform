const { body, query } = require('express-validator');

//Validação de ingresso
const validarIngresso = [
    body('preco').isFloat({ min: 0 }).withMessage('Preço inválido'),
    body('tipo').isIn(['inteira', 'meia', 'promocional']).withMessage('Tipo de ingresso inválido'),
    body('eventoId').isUUID().withMessage('ID do evento inválido')
];

//Validação de compra
const validarCompraIngresso = [
    body('tipo').isIn(['inteira', 'meia', 'promocional']).withMessage('Tipó de ingresso inválido'),
    body('quantidade').isInt({ min: 1 }).withMessage('Quantidade inválida')
];

//Validação de consulta
const validarConsultaIngresso = [
    query('status').optional().isIn(['disponivel', 'reservado', 'vendido', 'utilizado', 'cancelado']).withMessage('Status inválido'),
    query('tipo').optional().isIn(['inteira', 'meia', 'promocional']).withMessage('Tipo de ingressp inválido')
];


module.exports = {
    validarIngresso,
    validarCompraIngresso,
    validarConsultaIngresso
};