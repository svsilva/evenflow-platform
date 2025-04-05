const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

class AuthController{
    gerarToken(usuario){
        return jwt.sign(
          { id: usuario.id, nivelAcesso: usuario.nivelAcesso },
          process.env.JWT_SECRET,
          { expiresIn: process.env. JWT_EXPIRES_IN }  
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

            const token = this.gerarToken(usuario);

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
}