const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({
    region: process.env.AWS_REGION
});
//getUrlAssinada
const uploadToS3 = async(file, key, acl, metadata = {}) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.data,
            ACL: acl,
            ContentType: file.mimetype,
            Metadata: metadata
        };

        return s3.upload(params).promise();
    };

module.exports = {
    //Upload de imagem de perfil do usuário
    uploadAvatarUsuario: async(usuarioId, file) => {
        const extensaoArquivo = file.name.split('.').pop().toLowerCase();
        const nomeArquivo = `avatar.${extensaoArquivo}`
        const key = `usuarios/${usuarioId}/${nomeArquivo}`;

        return uploadToS3(file, key, 'private', {
            uploadedBy: usuarioId.toString(),
            originalName: file.name
        });
    },

    //Upload de imagem para evento
    uploadImagemEvento: async(eventoId, file, isGaleria = false) =>{
        const extensaoArquivo = file.name.split('.').pop();
        const nomeArquivo = uuidv4() + '.' + extensaoArquivo;
        const key = isGaleria
            ? `eventos/${eventoId}/galeria/${nomeArquivo}`
            : `eventos/${eventoId}/capa.${extensaoArquivo}`;

            return uploadToS3(file, key, 'public-read', eventoId);
    },

    //Gera URL assinada para imagens privadas
    getUrlAssinada: async(key) => {
        return s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Expires: 3600 //1 hora de validade
        });
    }
}    

