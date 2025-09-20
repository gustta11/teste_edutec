import { getAllConvidados, createConvidado } from "../models/convidadoModel.js";

export const listarConvidado = async (req, res) =>{
    try{
        const convidados = await getAllConvidados();
        res.json(convidados)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar convidados", err})
    }
}

export const adicionarConvidado = async (req, res) =>{
    try{
        await createConvidado(req.body)
        res.json({mensagem: "Convidado registrado com sucesso"})
    } catch (err) {
        res.status(500).json({erro: "Erro ao registrar convidado", err})
    }
}