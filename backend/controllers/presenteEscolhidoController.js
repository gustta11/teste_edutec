import { createPresentesEscolhidos, getAllPresentesEscolhidos, updatePresentesEscolhidos, deletePresentesEscolhidos } from "../models/presenteEscolhidoModel.js";

export const listarPresentesEscolhidos = async(req, res) =>{
    try{
        const presentesEscolhidos = await getAllPresentesEscolhidos()
        res.json(presentesEscolhidos)
    } catch (err){
        res.status(500).json({erro: "Erro ao listar presentes",err})

    }
}

export const adicionarPresenteEscolhido = async(req,res) =>{
    try{
        await createPresentesEscolhidos(req.body)
        res.json({mensagem: "Presente registrado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao registrar presente", err})
    }
} 

export const mudarDadosPresenteEscolhido = async (req, res) =>{
    try{
        await updatePresentesEscolhidos(req.params.id,req.body)
        res.json({mensagem:"Atualização de dados do presente feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados do presente"}, err)
    }
}

export const deletaPresenteEscolhido = async (req, res) =>{
    try{
        await deletePresentesEscolhidos(req.params.id)
        res.json({mensagem:"Presente apagado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar Presente"})
    }
}