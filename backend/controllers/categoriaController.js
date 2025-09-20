import { getAllCategorias, createCategoria } from "../models/categoriaModel.js";

export const listarCategoria = async(req, res) =>{
    try{
        const categorias = await getAllCategorias()
        res.json(categorias)
    }catch (err) {
        res.status(500).json({erro: "Erro ao listar categorias",err})
    }
}

export const adicionarCategoria = async (req, res) =>{
    try{
        await createCategoria(req.body)
        res.json({mensagem: "Categoria registrada com sucesso"})
    }catch (err){
        res.status(500).json({erro: "Erro ao registrar categoria", err})
    }
}