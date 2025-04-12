const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({
    region: process.env.AWS_REGION
});
//getUrlAssinada
module.exports = {
    //Upload de imagem de perfil do usuário
    uploadAvatarUsuario: async(usuarioId, file) => {
        const extensaoArquivo = file.name.split('.').pop();
        const key = `usuarios/${usuarioId}/avatar.${extensaoArquivo}`;

        return this.uploadToS3(file, key, 'private');
    },

    //Upload de imagem para evento
    uploadImagemEvento: async(eventoId, file, isGaleria = false) =>{
        const extensaoArquivo = file.name.split('.').pop();
        const nomeArquivo = uuidv4() + '.' + extensaoArquivo;
        const key = isGaleria
            ? `eventos/${eventoId}/galeria/${nomeArquivo}`
            : `eventos/${eventoId}/capa.${extensaoArquivo}`;

            return this,uploadToS3(file, key, 'public-read');
    },

    //Upload de imagem S3
    uploadToS3: async(file, key, acl) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.data,
            ACL: acl,
            ContentType: file.mimetype,
            Metadata: {
                uploadedBy: usuarioId
            }
        };

        return s3.upload(params).promise();
    },

    //Gera URL assinada para imagens privadas
    getUrlAssinada: async(key) => {
        return s3.getSignedUrlPromise('getObject', {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Expires: 3600 //1 hora de validade
        });
    }
};
