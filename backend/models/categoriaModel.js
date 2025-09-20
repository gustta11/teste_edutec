import db from "../config/db.js";

export const getAllCategorias = async () => {
    const [rows] = await db.query("SELECT * FROM categorias WHERE ativo = 1")
    return rows
};

export const createCategoria = async (categoria) =>{
    const {nome} = categoria
    await db.query("ISERT INTO categorias (nome) VALUES (?) ",
    [nome]) 
}

export const updateCategoria = async (id, categoria) =>{
    const{nome} = categoria
    await db.query("UPDATE SET NOME = ? WHERE id = ?", [nome,id])
}

export const deleteCategoria = async (id) =>{
    await db.query("DELETE FORM categorias WHERE id = ? ",[id])
}