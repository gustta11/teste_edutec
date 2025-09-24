import { getAllEventos, createEvento, updateEvento, deleteEvento, getEventosByAdminId } from "../models/eventoModel.js";

export const listarEventos = async (req, res) =>{
    try{
        const eventos = await getAllEventos();
        res.json(eventos)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar eventos",err})
    }
}

export const getEventosDoAdmin = async (req, res) => {
  try {
    const adminId = req.admin.id; 
    console.log(adminId)
    const eventos = await getEventosByAdminId(adminId); 

    return res.json(eventos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao buscar eventos" });
  }
}


export const adicionarEvento = async (req, res) =>{
    try{
        await createEvento(req.body, req.admin.id)
        res.status(201).json({mensagem: "Evento criado com sucesso"})
    } catch (err) {
        console.log(err)
        res.status(500).json({erro: "Erro ao criar evento", err})
    }
}

export const mudarDadosEvento = async (req, res) =>{
    try{
        await updateEvento(req.params.id,req.body)
        res.json({mensagem:"Atualização de dados do evento feita com sucesso"})
    } catch (err) {
        res.status(500).json({erro:"Erro ao atualizar dados do evento"}, err)
    }
}

export const deletaEvento = async (req, res) =>{
    try{
        await deleteEvento(req.params.id)
        res.json({mensagem:"Evento apagado com sucesso"})
    } catch (err){
        console.log(err)
        res.status(500).json({erro: "Erro ao apagar evento"})
    }
}