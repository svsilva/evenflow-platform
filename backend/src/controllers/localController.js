const Local = require('../models/Local');
const { Op, json } = require('sequelize');

// Classe LocalController
class LocalController {
    //Assíncrono para cadastro de local
    async criarLocal(req, res){
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
                criadoPor: req.usuario.id
            });

            res.status(201).json(novoLocal);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar local', erro: error.message });
        }
    }

    //Assíncrono para listar locais
    async listarLocais(req, res){
        try{    
            const { pagina= 1, limite = 10, nome, email, capacidade } = req.query;
            const offset = (pagina - 1) * limite;

            const where = {};
            if(nome) where.nome = { [Op.like]: `%${nome}`};
            if(email) where.email = { [Op.like]: `%${email}`}
            if(capacidade) where.capacidade = capacidade;

            const { count, rows } = await Local.findAndCountAll({
                where,
                attributes: { exclude: ['cnpj'] },
                limit: parseInt(limite),
                offset: parseInt(offset),
                order: [['nome', 'ASC']]
            });

            res.json({
                total: count,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(count / limite),
                locais: rows
            })
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao listar locais', erro: error.message });
        }
    }

    //Assíncrono para buscar local [ID]
    async buscarLocal(req, res){
        try{
            const local = await Local.findByPk(req.params.id);

            if(!local){
                return res.json(404).json({ mensagem: 'Local não encontrado' });
            }

            res.json(local);
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao buscar local', erro: error.message });
        }
    }

}

module.exports = new LocalController();