const Local = require('../models/Local');
const { Op } = require('sequelize');

// Classe LocalController
class LocalController {
    //Assíncrono para cadastro de local
    async criarLocal(req, res) {
        try {
            //Validando se o usuário está autenticado e autorizado
            if (!req.usuario || !['admin', 'organizador'].includes(req.usuario.nivelAcesso)) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para realizar esta ação' });
            }

            const { nome, email, telefone, tipoDocumento, documento, endereco, capacidade, descricao, criadoPor } = req.body;

            // Verifica se o local já existe pelo email ou documento
            const localExistente = await Local.findOne({
                where: {
                    [Op.or]: [{ email }, { documento }]
                }
            });

            if (localExistente) {
                return res.status(400).json({ mensagem: 'Email ou documento já cadastrado' });
            }

            // Cria o novo local sem vinculação com usuário
            const novoLocal = await Local.create({
                nome,
                email,
                telefone,
                tipoDocumento,
                documento,
                endereco,
                capacidade,
                descricao,
                criadoPor
            });

            res.status(201).json(novoLocal);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar local', erro: error.message });
        }
    }
}

module.exports = new LocalController();