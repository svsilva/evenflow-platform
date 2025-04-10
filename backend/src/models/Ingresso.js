const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evento = require('./Evento');
const Usuario = require('./Usuario');

const Ingresso = sequelize.define('Ingresso', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    codigo:{
        type: DataTypes. STRING,
        allowNull: false,
        unique: true
    },
    preco:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('disponivel', 'reservado', 'vendido', 'utilizado', 'cancelado'),
        defaultValue: 'disponivel',
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('inteira', 'meia', 'promocional'),
        defaultValue: 'inteira',
        allowNull: false
    },
    dataCompra:{
        type: DataTypes.DATE,
        allowNull: true
    },
    dataUtilização:{
        type: DataTypes.DATE,
        allowNull: true
    },
    eventoId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Evento,
            key: 'id'
        }
    },
    compradorId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id'
        }
    }
});

module.exports = Ingresso;