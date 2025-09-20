import { getAllConvidados, createConvidado, updateConvidado, deleteConvidado} from "../models/convidadoModel.js";

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
        await deletaConvidado(req.params.id)
        res.json({mensagem:"Convidado apagado com sucesso"})
    } catch (err){
        res.status(500).json({erro: "Erro ao apagar convidado"})
    }
}