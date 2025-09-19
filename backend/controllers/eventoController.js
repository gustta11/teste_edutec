import { getAllEventos, createEvento } from "../models/evento";

export const listarEventos = async (req, res) =>{
    try{
        const eventos = await getAllEventos();
        res.json(eventos)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar eventos"})
    }
}

export const adicionarEvento = async (req, res) =>{
    try{
        const id = await createEvento(req.body)
        res.json({mensagem: "Evento criado com sucesso", id})
    } catch (err) {
        res.status(500).json({erro: "Erro ao criar evento"})
    }
}