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

    //Assíncrono: Atualizar dados do usuário
    async atualizarUsuario(req, res){
        try{
            const usuario = await Usuario.findByPk(req.params.id);

            if(!usuario){
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
            
            if(usuario.id != req.usuario.id && req.usuario.nivelAcesso != 'admin'){
                return res.status(403).json({ mensagem: 'Sem permissão para atualizar este usuário' });
            }

            const camposPermitidos = ['nome', 'telefone', 'endereco'];
            const dadosAtualizados = {};

            camposPermitidos.forEach(campo => {
                if(req.body[campo] != undefined){
                    dadosAtualizados[campo] = req.body[campo];
                }
            });

            await usuario.update(dadosAtualizados);

            const usuarioAtualizado = await Usuario.findByPk(req.params.id, {
                attributes: { exclude: ['senha'] }
            });

            res.json(usuarioAtualizado);
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
        }
    }

    //Assíncrono: Buscar usuário [ID]
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
            const { pagina = 1, limite = 10, nome, email, nivelAcesso } = req.query;
            const offset = (pagina - 1) * limite;

            const where = {};
            if(nome) where.nome = { [Op.like]: `%${nome}%`};
            if(email) where.email = { [Op.like]: `%${email}%`};
            if(nivelAcesso) where.nivelAcesso = nivelAcesso;

            const { count, rows } = await Usuario.findAndCountAll({
                where,
                attributes: { exclude: ['senha'] },
                limit: parseInt(limite),
                offset: parseInt(offset),
                order: [['nome', 'ASC']]
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

    //Assíncrono: Deletar usuário
    async deletarUsuario(req, res){
        try{
            const usuario = await Usuario.findByPk(req.params.id);

            if(!usuario){
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            if(usuario.id != req.params.id && req.usuario.nivelAcesso != 'admin'){
                return res.status(403).json({ mensagem: 'Sem permissão para deletar este usuário' });
            }

            await usuario.destroy();
            res.json({ mensagem: 'Usuário deletado com sucesso' });
        }catch(error){  
            res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error.message });
        }
    }
}

module.exports = new UsuarioController();