import jwt from 'jsonwebtoken'

const SECRET = "chave_forte"

export const autenticarToken = async (req, res, next) =>{
    const autHeader = req.headers['authorization']

    if(!autHeader){
        return res.status(401).json({erro: "Token não fornecido"})
    }

    const token = autHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({erro: "Token mal formatado"})
    }

    try{
        const credenciais = jwt.verify(token, SECRET)
        req.admin = credenciais
        next()
    } catch (err){
        return res.status(500).json({erro: "Token inválido ou expirado"})
    }
}