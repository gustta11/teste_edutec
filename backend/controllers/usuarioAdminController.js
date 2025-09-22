import { getAllUsuariosAdmin, getInfoUsuarioCpf, createUsuarioAdmin, updateUsuarioAdmin, deleteUsuarioAdmin } from "../models/usuarioAdminModel.js";
import jwt from 'jsonwebtoken'

const SECRET = 'chave_forte'

export const loginAdmin = async (req,res) =>{
    try{
        const {cpf, senha} = req.body

        const admin = await getInfoUsuarioCpf(cpf)

        if(!admin){
            return res.status(401).json({erro:"Usuário não cadastrado, cadastre-se"})
        }

        if(admin.senha === senha){
            const token = jwt.sign({id: admin.id, nome: admin.nome,}, SECRET, {expiresIn: "1h"})
            return res.json({status: "Seja bem vindo", nome: admin.nome, id: admin.id, token})
        }else {
            return res.status(401).json({erro: "Senha incorreta"})
        }

    } catch (err){
        console.log(err)
        return res.status(500).json({erro: "Erro no login"})
    }
}


export const listarUsuarioAdmin = async (req,res) =>{
    try{
        const usuariosAdmin = await getAllUsuariosAdmin()
        res.json(usuariosAdmin)
    }catch (err){
        res.status(500).json({erro:"Erro alistar usuários"}, err)
    }
}

export const adicionarUsuarioAdmin = async (req,res)=>{
    try{
        await createUsuarioAdmin(req.body)
        res.json({mensagem:"Usuário criado com sucesso!"})
    } catch (err){
        res.status(500).json({erro:"Erro ao criar usuário",err})
    }
}


export const mudarDadosUsuarioAdmin = async (req, res) =>{
    try{
        await updateUsuarioAdmin(req.params.id,req.body)
        res.json({mensagem:"Atualização de dados do usuário feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados do usuário"}, err)
    }
}

export const deletaUsuarioAdmin = async (req, res) =>{
    try{
        await deletePresente(req.params.id)
        res.json({mensagem:"Usuário apagado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar Usuário"})
    }
}