import db from "../config/db.js";

export const getAllConvidados = async () =>{
    const [rows] = await db.query("SELECT * FROM convidados")
    return rows
}

export const getConvidadoId = async () =>{
    const [rows] = await db.query("SELECT * FROM convidados WHERE id = ?", [id])
    return rows[0]
}

export const getConvidadoEvento = async (cpf, id_evento) => {
    const [rows] = await db.query("SELECT * FROM convidados WHERE cpf = ? AND id_evento = ? LIMIT 1 ", [cpf,id_evento])
    return rows
};

export const createConvidado = async (cpf, id_evento) =>{

    const [res] = await db.query("INSERT INTO convidados (cpf,id_evento, completo) VALUES (?,?,0) ",
    [cpf,id_evento]) 

    return res.insertId
}

export const updateConvidado = async (id,convidado) =>{
    const campos = [];
    const valores = [];

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

    if(convidado.completo){
        campos.push("completo = ?")
        valores.push(convidado.completo)
    }


    valores.push(id)

    const query = `UPDATE convidados SET ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deleteConvidado = async (id) =>{
    await db.query("DELETE FROM convidados WHERE id = ? ", [id])
}