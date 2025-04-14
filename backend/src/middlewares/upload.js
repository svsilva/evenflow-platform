const multer = require('multer');

const storage = multer.memoryStorage();

async function filtrarArquivo(req, file, cb) {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filtrarArquivo,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('foto');

module.exports = { upload };