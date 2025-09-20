import { getAllEventos, createEvento } from "../models/eventoModel.js";

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
        await createEvento(req.body)
        res.json({mensagem: "Evento criado com sucesso"})
    } catch (err) {
        res.status(500).json({erro: "Erro ao criar evento"})
    }
}