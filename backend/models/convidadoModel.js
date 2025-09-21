import db from "../config/db.js";

export const getAllConvidados = async () => {
    const [rows] = await db.query("SELECT * FROM convidados")
    return rows
};

export const createConvidado = async (convidado) =>{
    const {cpf,nome,telefone,email,id_evento} = convidado
    await db.query("INSERT INTO convidados (cpf,nome,telefone,email,id_evento) VALUES (?,?,?,?,?) ",
    [cpf,nome,telefone,email,id_evento]) 
}

export const updateConvidado = async (id,convidado) =>{
    const campos = [];
    const valores = [];

    if(convidado.cpf){
        campos.push("cpf = ?")
        valores.push(convidado.cpf)
    }

     if(convidado.nome){
        campos.push("nome = ?")
        valores.push(convidado.nome)
    }

     if(convidado.telefone){
        campos.push("telefone = ?")
        valores.push(convidado.telefone)
    }

     if(convidado.email){
        campos.push("email = ?")
        valores.push(convidado.email)
    }

     if(convidado.id_evento){
        campos.push("id_evento = ?")
        valores.push(convidado.id_evento)
    }

    valores.push(id)

    const query = `UPDATE convidados SET ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deleteConvidado = async (id) =>{
    await db.query("DELETE FROM convidados WHERE id = ? ", [id])
}