import { getAllFormaPagamentos, createFormaPagamento } from "../models/formaPagamentoModel.js";

export const listarFormaPagamento = async (req, res) =>{
    try{
        const formasPagamento = await getAllFormaPagamentos()
        res.json(formasPagamento)
    }catch (err){
        res.status(500).json({erro:"Erro ao listar formas de pagamento",err})
    }
}

export const adicionarFormaPagamento = async (req,res) =>{
    try{
        await createFormaPagamento (req.body)
        res.json({mensagem: "Forma de pagamento registrada com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao registrar forma de pagamento"}, err)
    }
}