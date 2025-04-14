const Usuario  = require('../models/Usuario');
const { Op } = require('sequelize');
const s3Service = require('../services/s3Service');
const { formatarDocumento, formatarCEP, formatarData } = require('../utils/formatadores');

//Classe usuário
class UsuarioController{
    //Assíncrono: Cadastro de usuário
    async cadastrarUsuario(req, res){
        try{
            const{ nome, email, senha, tipoDocumento, documento, dataNascimento, telefone, endereco, nivelAcesso } = req.body;
            let foto = null;


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

        // Formatar dados
        const documentoFormatado = formatarDocumento(documento, tipoDocumento);
        const dataNascimentoFormatada = formatarData(dataNascimento);
        const cepFormatado = endereco?.cep ? formatarCEP(endereco.cep) : null;

        //Cadastrar usuário
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha,
            tipoDocumento,
            documento: documentoFormatado,
            dataNascimento: dataNascimentoFormatada?.iso,
            telefone,
            nivelAcesso,
            endereco:{
                ...endereco,
                cep: cepFormatado
            },
            foto
        });

        //Se houver arquivo, fazer upload  para S3
        if(req.file){
            if(!req.file.mimetype.startsWith('image/')){
                return res.status(400).json({ mensagem: 'o arquivo enviado não é uma imagem válida' });
            }

            const file = {
                name: req.file.originalname,
                data: req.file.buffer,
                mimetype: req.file.mimetype
            };

            const uploadResult = await s3Service.uploadAvatarUsuario(novoUsuario.id, file);
            foto = uploadResult.Location;

            //Atualizar usuário com a URL da imagem
            await novoUsuario.update({ foto });
        }

        const usuarioSemSenha = await Usuario.findByPk(novoUsuario.id, {
            attributes: { exclude: ['senha'] }
        });

        res.status(201).json(usuarioSemSenha);
        }catch(error){
            if(error.name === 'SequelizeValidationError'){
                return res.status(400).json({ mensagem: 'Dados inválidos', erros: error.errors.map(e => e.message) });
            }
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

            const camposPermitidos = ['nome', 'telefone', 'endereco', 'foto'];
            const dadosAtualizados = {};

            camposPermitidos.forEach(campo => {
                if(req.body[campo] != undefined){
                    dadosAtualizados[campo] = req.body[campo];
                }
            });

            //Verificar se há arquivo e se é uma imagem
            if(req.file){
                if(!req.file.mimetype.startsWith('image/')){
                    return res.status(400).json({ mensagem: 'O arquivo enviado não é uma imagem válida' });
                }
                dadosAtualizados.foto = req.file.location;
            }

            await usuario.update(dadosAtualizados);

            const usuarioAtualizado = await Usuario.findByPk(req.params.id, {
                attributes: { exclude: ['senha'] }
            });

            res.json(usuarioAtualizado);
        }catch(error){
            if(error.name === 'SequelizeValidationError'){
                return res.status(400).json({ mensagem: 'Dados inválidos', erros: error.errors.map(e => e.message) });
            }
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