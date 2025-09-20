import { getAllCategorias, createCategoria, adicionarCategoria, updateCategoria, deleteCategoria } from "../models/categoriaModel.js";

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

export const mudarCategoria = async (req, res) =>{
    try{
        await updateCategoria(req.params,body)
        res.json({mensagem:"Categoria atualizada no momento"})
    } catch (errr ){
        res.status(500).json({erro:"Erro ao atualzar actegirua"})
    }
}

export const deletaCategoria = async (req, res) =>{
     try{
        await deleteCategoria(req.params.id)
        res.json({mensagem:"Categoria atualizada no momento"})
    } catch (errr ){
        res.status(500).json({erro:"Erro ao atualzar categoria"})
    }
}