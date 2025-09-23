import { getAllPresentes, createPresente, updatePresente, deletePresente } from "../models/presenteModel.js";
import { getEventosByAdminId } from "../models/eventoModel.js";

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
        const adminId = req.admin.id
        const imagem = req.file ? req.file.filename : null
        const {id_evento} = req.body


        const eventos = await getEventosByAdminId(adminId)

        const eventoValido = eventos.some(evento => evento.id === Number(id_evento))

        if(!eventoValido){
            return res.status(403).json({erro: "Evento inválido para esse admin"})
        }

        await createPresente(req.body,imagem, id_evento)

        res.json({mensagem: "Presente registrado com sucesso"})
    } catch (err){
        console.log(err)
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