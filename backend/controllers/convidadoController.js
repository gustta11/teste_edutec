import { getAllConvidados, createConvidado, updateConvidado, deleteConvidado, getConvidadoId, getConvidadoEvento,} from "../models/convidadoModel.js";
import { getBySenha } from "../models/eventoModel.js";

export const loginConvidado = async (req, res) =>{
    try{
        const {cpf, senha_evento} = req.body;

        const evento = await getBySenha(senha_evento)

        if(!evento || evento.ativo!== 1){
            return res.status(401).json({erro:"Evento inválido ou inativo"})
        }

        let convidado = await getConvidadoEvento(cpf,evento.id)

        if(convidado.length > 0){
            return res.json({status: "complete", convidado})
        }

        const id = await createConvidado (cpf, evento.id)

        return res.json({status: "Cadastro não completo", convidadoId: id})

    } catch (err){

        console.log(err)

        return res.status(500).json({erro: "Erro no login"})
    }
} 

export const completarCadastro = async (req, res) =>{
    try{
        const {id} = req.params
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