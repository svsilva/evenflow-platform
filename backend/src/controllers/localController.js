const Local = require('../models/Local');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');


//Classe local
class LocalController{
    //Assíncrono: Cadastro de local
    async criarLocal(req, res){
        try{
            const { nome, endereco, capacidade, descricao } = req.body;

            const local = await Local.create({
                nome,
                endereco,
                capacidade,
                descricao,
                organizadorId: req.usuario.id
            });

            const localCompleto = await Local.findByPk(local.id, {
                include: [
                    { model: Usuario, as: 'oganizador', or: 'admin', attributes: ['id', 'nome', 'email'] }
                ] 
            });

            res.status(201).json(localCompleto);
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao criar local', erro: error.message });
        }
    }
}

module.exports = new LocalController();