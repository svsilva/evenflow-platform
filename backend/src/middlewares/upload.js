const multer = require('multer');
const s3Service = require('../services/s3Service');

class UploadMiddleware{
    constructor(){
        //Configuração do multer, processamento de aquivo em memória e limitar para 5MB para upload
        this.storage = multer.memoryStorage();
        this.upload = multer({
            storage: this.storage,
            fileFilter: this.filtrarArquivo.bind(this),
            limits:{
                fileSize: 5 * 1024 * 1024
            }
        });
    }

    //Assincrono: Filtro para aceitar apenas imagens
    async filtrarArquivo(req, file, cb){
        if(file.mimetype.startsWith('image/')){
            cb(null, true);
        }else{
            cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
        }
    }

    //Assincrono: Processar o upload da imagem
    async processarUpload(req, res, next){
        try{
            if(!req.file){
                return next();
            }

            const file = {
                name: req.file.originalname,
                data: req.file.buffer,
                mimetype: req.file.mimetype
            };

            let uploadResult;

            if(req.baseUrl.includes('usuario')){
                uploadResult = await s3Service.uploadAvatarUsuario(req.usuario?.id || 'temp', file);
            }else if(req.baseUrl.includes('evento')){
                uploadResult = await s3Service.uploadImagemEvento(req.params.id || 'temp', file);
            }

            req.file.location = uploadResult.Location;
            next();
        }catch(error){
            next(error);
        }
    }
    
}

const uploadMiddleware = new UploadMiddleware();

module.exports = {
    upload: uploadMiddleware.upload,
    processarUpload: uploadMiddleware.processarUpload.bind(uploadMiddleware)
};