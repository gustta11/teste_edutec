import { getAllPresentes, createPresente } from "../models/presenteModel.js";

export const listarPresentes = async(req, res) =>{
    try{
        const presentes = await getAllPresentes()
        res.json(presentes)
    } catch (err){
        res.status(500).json({erro: "Erro ao listar presentes"})

    }
}

export const adicionarPresente = async(req,res) =>{
    try{
        await createPresente(req.body)
        res.json({mensagem: "Presente registrado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao registrar presente"})
    }
} 