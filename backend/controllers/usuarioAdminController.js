import { getAllUsuariosAdmin, createUsuarioAdmin, updateUsuarioAdmin, deleteUsuarioAdmin } from "../models/usuarioAdminModel.js";

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