import { getAllConvidados, createConvidado, updateConvidado, deleteConvidado, getConvidadoId, getConvidadoEvento,} from "../models/convidadoModel.js";
import { getBySenha } from "../models/eventoModel.js";
import jwt from "jsonwebtoken"

export const SECRET = "senha_forte"

export const loginConvidado = async (req, res) =>{
    try{
        const {cpf, senha_evento} = req.body;

        const evento = await getBySenha(senha_evento)

        if(!evento || evento.ativo!== 1){
            return res.status(401).json({erro:"Evento inválido ou inativo"})
        }

        let convidado = await getConvidadoEvento(cpf,evento.id)

        console.log(convidado)


        if(convidado){
            const token = jwt.sign({id: convidado.id, nome: convidado.nome, tipo: "convidado"},SECRET, {expiresIn:"1h"})
            return res.json({status: "Complete", convidado: convidado, token})
        }

        const id = await createConvidado (cpf, evento.id)

        const token = jwt.sign({id: id, tipo: "convidado"},SECRET, {expiresIn:"1h"})

        return res.json({status: "Cadastro não completo", convidadoId: id, token})

    } catch (err){

        console.log(err)

        return res.status(500).json({erro: "Erro no login"})
    }
} 

export const completarCadastro = async (req, res) =>{
    try{
        const id = req.convidado.id
        const {nome, telefone, email} = req.body

        await updateConvidado(id, {nome, telefone, email, completo:1})

        return res.json({ mensagem: "Cadastro completo", id})
    } catch (err){
        console.log(err)
        return res.status(500).json({erro: "Erro ao completar cadastro"})
    }
}


export const listarConvidado = async (req, res) =>{
    try{
        const convidados = await getAllConvidados();
        res.json(convidados)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar convidados", err})
    }
}

export const mudarDadosConvidado = async (req, res) =>{
    try{
        await updateConvidado(req.params.id,req.body)
        res.json({mensagem:"Atualização de dados do convidado feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados do convidado"}, err)
    }
}

export const deletaConvidado = async (req, res) =>{
    try{
        await deleteConvidado(req.params.id)
        res.json({mensagem:"Convidado apagado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar convidado"})
    }
}