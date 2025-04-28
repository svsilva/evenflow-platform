const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const crypto = require('crypto');

const TokenRecuperacao = sequelize.define('TokenRecuperacao', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false
    },
    expiracao:{
        type: DataTypes.DATE,
        allowNull: false
    },
    usado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    usuarioId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'Usarios',
            key: 'id'
        }
    }
}, { 
    hooks:{
        beforeCreate:(token) => {
            //Gerar token aleatório
            token.token = crypto.randomBytes(32).toString('hex');

            //Expiração em 1 hora
            token.expiracao = new Date(DataTypes.now() + 3600000);
        }
    }
});

module.exports = TokenRecuperacao;