import db from "../config/db.js";

export const getAllCategorias = async () => {
    const [rows] = await db.query("SELECT * FROM categorias")
    return rows
};

export const createCategoria = async (categoria) =>{
    const {nome} = categoria
    await db.query("INSERT INTO categorias (nome) VALUES (?) ",
    [nome]) 
}

export const updateCategoria = async (id, categoria) =>{
    const{nome} = categoria
    await db.query("UPDATE categorias SET nome = ? WHERE id = ?", [nome,id])
}

export const deleteCategoria = async (id) =>{
    console.log(id)
    await db.query("DELETE FROM categorias WHERE id = ? ",[id])
}