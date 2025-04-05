const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.autenticar = async(req, res, next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({ mensagem: 'Não autorizado - Token não fornecido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);

        if(!usuario){
            return res.status(401).json({ mensagem: 'Não autorizado - Usuário não encontrado' });
        }

        req.usuario = usuario;
        next();
    }catch(error){
        return res.status(401).json({ mensagem: 'Não autorizado - Token inválido'});
    }
};

exports.restringirPara = (...nivelAcesso) => {
    return(req, res, next) => {
        if(!nivelAcesso.includes(req.usuario.nivelAcesso)){
            return res.status(403).json({ mensagem: 'Você não tem permissão para realizar esta ação' });
        }
    }
};