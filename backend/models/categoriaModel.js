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