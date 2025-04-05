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
}

module.exports = new UsuarioController();