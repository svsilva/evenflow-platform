const Evento = require('../Evento');
const Local = require('../Local');
const Usuario = require('../Usuario');

const setupAssociations = () => {
    //Relacionamento entre Evento e Local
    Evento.belongs(Local, {
        as: 'local',
        foreignKey: 'localId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });

    Local.hasMany(Evento, {
        as: 'eventos',
        foreignKey: 'localId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });

    //Relacionamento entre Evento e Usuário
    Evento.belongs(Local, {
        as: 'organizador',
        foreignKey: 'organizadorId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });

    Usuario.hasMany(Evento, {
        as: 'eventos',
        foreignKey: 'organizadorId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });

};

module.exports = setupAssociations;