const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

class AuthController{

    //Gerar token
    static gerarToken(usuario) {
        return jwt.sign(
            { id: usuario.id, nivelAcesso: usuario.nivelAcesso },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }

    //Assíncrono: Login
    async login(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, senha } = req.body;

            const usuario = await Usuario.findOne({ where: { email } });
            if(!usuario){
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const senhaValida = await usuario.verificarSenha(senha);
            if(!senhaValida){
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const token = AuthController.gerarToken(usuario);

            return res.json({
                usuario:{
                    id: usuario.id,
                    email: usuario.email,
                    nivelAcesso: usuario.nivelAcesso
                },
                token
            });
        }catch(error){
            res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
        }
    }

    //Assíncrono: Verificação de token
    async verificarToken(req, res){
        try{
            const usuario = await Usuario.findByPk(req.usuario.id);

            if(!usuario){
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            return res.json({
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    nivelAcesso: usuario.nivelAcesso
                }
            });
        }catch(error){
            return res.status(500).json({ mensagem: 'Erro ao verificar token', erro: error.message });
        }
    }

    //Assíncrono: Recuperar senha
    async recuperarSenha(req, res){
        try{
            const { email } = req.body;

            const usuario = await Usuario.findOne({ where: { email } });
            if(!usuario){
                return res.status(404).json({ mensagem: 'Email não encontrado' });
            }
            
            //Aqui será implementado o envio de email para recuperação de senha, temporareamente apenas simula uma resposta de sucesso

            return res.json({ mensagem: 'Instruções para recuperação de senaha enviadas para seu email' });
        }catch(error){
            return res.status(500).json({ mensagem: 'Erro ao recuperar senha', erro: error.message });
        }
    }

    
}

module.exports = new AuthController();