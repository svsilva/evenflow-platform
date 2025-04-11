const { sequelize } = require('../../config/database');
const setupAssociations = require('./associations');

//Importar todos os modelos
const Evento = require('../Evento');
const Local = require('../Local');
const Usuario = require('../Usuario');
const Ingresso = require('../Ingresso');

//Configurar os relacionamentos
setupAssociations();

module.exports = {
    sequelize,
    Evento,
    Local,
    Usuario
}