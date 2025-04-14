const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3 = new AWS.S3({
    region: process.env.AWS_REGION
});

//Upload da imagem
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

//Deletar pasta do usário no S3
const deletarPastaUsuario = async(usuarioId) => {
    try{
        //Listar todos os objetos na pasta do usuário
        const listParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `usuarios/${usuarioId}/`
        };

        const objects = await s3.listObjectsV2(listParams).promise();

        if(objects.Contents.length === 0){
            return; //Caso a pasta esteja vazia
        }

        //preparar array de objetos para deletar
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete:{
                Objects: objects.Contents.map(obj => ({ Key: obj.Key }))
            }
        };

        //Deletar todos os objetos
        await s3.deleteObjects(deleteParams).promise();

        //Deletar a pasta (prefixo)
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `usuarios/${usuarioId}/`
        }).promise();
    }catch(error){
        console.error('Erro ao deletar pasta do usuário no S3:', error);
        throw error;
    }
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
    },

    deletarPastaUsuario
}    

