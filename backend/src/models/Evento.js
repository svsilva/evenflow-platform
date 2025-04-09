const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Evento = sequelize.define('Evento', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    precoIngresso:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ingressosDisponiveis:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipoEvento:{
        type: DataTypes.ENUM('presencial, online'),
        allowNull: false,
    },
    categoria:{
        type: DataTypes.ENUM('comedia', 'infantil', 'familia', 'musical', 'teatro', 'esporte', 'outros'),
        allowNull: false,
        defaultValue: 'outros'
    },
    classificacaoEtaria:{
        type: DataTypes.ENUM('L', '14', '16', '18'),
        allowNull: false,
        defaultValue: 'L'
    },
    status:{
        type: DataTypes.ENUM('em cartaz', 'cancelado', 'encerrado'),
        allowNull: false,
        defaultValue: 'em cartaz'
    },
    localId:{
        type: DataTypes.UUID,
        allowNull: true,
    },
    organizadorId:{
        type: DataTypes.UUID,
        allowNull: true,
    },

}, {
    hooks:{
        beforeValidate: async(evento) => {
            //Se o evento for online, não precisa de local
            if(evento.tipoEvento === 'online'){
                evento.localId = null;
            }
        }
    }
});


module.exports = Evento;