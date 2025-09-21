import db from "../config/db.js";

export const getAllUsuariosAdmin = async () => {
    const [rows] = await db.query("SELECT * FROM usuarios_admin")
    return rows
};

export const createUsuarioAdmin = async (usuario_admin) =>{
    const {cpf,nome,senha} = usuario_admin
    await db.query("INSERT INTO usuarios_admin (cpf,nome,senha) VALUES (?,?,?) ",
    [cpf,nome,senha]) 
}

export const updateUsuarioAdmin = async (id,usuario_admin) =>{
    const campos = [];
    const valores = [];

    if(usuario_admin.cpf){
        campos.push("cpf = ?")
        valores.push(usuario_admin.cpf)
    }

     if(usuario_admin.nome){
        campos.push("nome = ?")
        valores.push(usuario_admin.nome)
    }

     if(usuario_admin.senha){
        campos.push("senha = ?")
        valores.push(usuario_admin.senha)
    }

    valores.push(id)

    const query = `UPDATE convidados SET ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deleteUsuarioAdmin = async (id) =>{
    await db.query("DELETE FROM usuarios_admin WHERE id = ?", [id])
}