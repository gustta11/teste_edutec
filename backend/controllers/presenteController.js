import { getAllPresentes, createPresente, updatePresente, deletePresente } from "../models/presenteModel.js";

export const listarPresentes = async(req, res) =>{
    try{
        const presentes = await getAllPresentes()
        res.json(presentes)
    } catch (err){
        res.status(500).json({erro: "Erro ao listar presentes",err})

    }
}

export const adicionarPresente = async(req,res) =>{
    try{
        await createPresente(req.body)
        res.json({mensagem: "Presente registrado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao registrar presente", err})
    }
} 

export const mudarDadosPresente = async (req, res) =>{
    try{
        await updatePresente(req.params.id,req.body)
        res.json({mensagem:"Atualização de dados do presente feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados do presente"}, err)
    }
}

export const deletaPresente = async (req, res) =>{
    try{
        await deletePresente(req.params.id)
        res.json({mensagem:"Presente apagado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar Presente"})
    }
}