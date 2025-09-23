import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename:(req,file,cb) => {
        const sufixoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extensao = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + sufixoUnico + extensao)
        
    }
})

const fileFilter = (req, file, cb) =>{
    const tiposPermitidos = /jpeg|jpg|png|gif/
    const extensaoNome = tiposPermitidos.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimeType = tiposPermitidos.test(file.mimetype)

    if(mimeType && extensaoNome){
        return cb(null, true)
    }else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize: 5 * 1024 * 1024}
})


export default upload

