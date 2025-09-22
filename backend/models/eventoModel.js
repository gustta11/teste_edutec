
import db from "../config/db.js";

export const getAllEventos = async () => {
    const [rows] = await db.query("SELECT * FROM eventos WHERE ativo = 1")
    return rows
};

export const getBySenha = async (senha) =>{
    const [rows] = await db.query("SELECT * FROM eventos WHERE senha_evento = ? LIMIT 1", [senha])
    return rows[0]
}

export const createEvento = async (evento) =>{
    const {nome,data_evento,localizacao,anfitriao,senha_evento,data_criacao,id_admin} = evento
    await db.query("INSERT INTO eventos (nome,data_evento,localizacao,anfitriao,senha_evento,ativo,data_criacao,id_admin) VALUES (?,?,?,?,?,1,?,?) ",
    [nome,data_evento,localizacao,anfitriao,senha_evento,data_criacao,id_admin]) 
}

export const updateEvento = async (id,evento) =>{
    const campos = [];
    const valores = [];

    console.log("recebeu",id)
    console.log("recebeu", evento)

    if(evento.nome){
        campos.push("nome = ?")
        valores.push(evento.nome)
    }

     if(evento.data_evento){
        campos.push("data_evento = ?")
        valores.push(evento.data_evento)
    }

     if(evento.localizacao){
        campos.push("localizacao = ?")
        valores.push(evento.localizacao)
    }

     if(evento.anfitriao){
        campos.push("anfitriao = ?")
        valores.push(evento.anfitriao)
    }

     if(evento.senha_evento){
        campos.push("senha_evento = ?")
        valores.push(evento.senha_evento)
    }

      if(evento.data_criacao){
        campos.push("data_criacao = ?")
        valores.push(evento.data_criacao)
    }

      if(evento.id_admin){
        campos.push("id_admin = ?")
        valores.push(evento.id_admin)
    }

    valores.push(id)
    console.log(valores)

    const query = `UPDATE  eventos SET  ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deleteEvento = async (id) =>{
    await db.query("DELETE FROM eventos WHERE id = ? ", [id])
}


