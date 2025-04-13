const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./Usuario');
const Evento = require('./Evento');

const Avaliacao = sequelize.define('Avaliacao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nota: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    eventoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Evento,
            key: 'id'
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['usuarioId', 'eventoId'] // Um usuário avalia cada evento apenas uma vez
        }
    ]
});

module.exports = Avaliacao;