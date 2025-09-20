import { getAllFormaPagamentos, createFormaPagamento, updateFormaPagamento, deleteFormaPagamento } from "../models/formaPagamentoModel.js";

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

export const mudarDadosFormaPagamento = async (req, res) =>{
    try{
        await updateFormaPagamento(req.params.id,req.body.nome)
        res.json({mensagem:"Atualização de dados do pagamento feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados da forma de pagamento"}, err)
    }
}

export const deletaFormaPagamento = async (req, res) =>{
    try{
        await deleteFormaPagamento(req.params.id)
        res.json({mensagem:"Forma de pagamento apagada com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar forma de pagamento"})
    }
}