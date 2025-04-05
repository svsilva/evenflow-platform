const Usuario  = require('../models/Usuario');
const { Op } = require('sequelize');

//Classe usuário
class UsuarioController{
    //Assíncrono: Cadastro de usuário
    async cadastrarUsuario(req, res){
        try{
            const{ nome, email, senha, tipoDocumento, documento, dataNascimento, telefone, endereco } = req.body;

        //Verificar existência de usuário cadastrado
        const usuarioExistente = await Usuario.findOne({
            where:{
                [Op.or]: [
                    { email },
                    { documento }
                ]
            }
        });

        if(usuarioExistente){
            return res.status(400).json({ mensagem: 'Email ou documento já cadastrado'});
        }

        //Cadastrar usuário
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha,
            tipoDocumento,
            documento,
            dataNascimento,
            telefone,
            endereco
        });

        const usuarioSemSenha = await Usuario.findByPk(novoUsuario.id, {
            attributes: { exclude: ['senha'] }
        });

        res.status(201).json(usuarioSemSenha);
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', erro: error.message});
        }
    }

    //Assíncrono: Buscar usuário
    async buscarUsuario(req, res){
        try{
            const usuario = await Usuario.findByPk(req.params.id, {
                attributes: { exclude: ['senha'] }
            });

            if(!usuario){
                return res.json(404).json({ mensagem: 'Usuário não encontrado' });
            }
            
            res.json(usuario);
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao buscar usuário', erro: error.message });
        }
    }

    //Assíncrono: Buscar listar usuário
    async listarUsuario(req, res){
        try{
            const { pagina = 1, limite = 10, nome, email, papel } = req.body;
            const offset = (pagina + 1) * limite;

            const where = {};
            if(nome) where.nome = { [Op.like]: `%${nome}%`};
            if(email) where.email = { [Op.like]: `%${email}%`};
            if(papel) where.papel = papel;

            const { count, rows } = await Usuario.findAndCountAll({
                where,
                attributes: { exclude: ['senha'] },
                limit: parseInt(limite),
                offset: parseInt(offset)
            });

            res.json({
                total: count,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(count / limite),
                usuarios: rows
            });
        }catch(error){ 
            res.status(500).json({ mensagem: 'Erro ao listar usuários', erro: error.message });
        }
    }
}

module.exports = new UsuarioController();