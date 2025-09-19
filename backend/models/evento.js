
import db from "../config/db";

export const getAllEventos = async () => {
    const [rows] = await db.query("SELECT * FROM eventos WHERE ativo = 1")
    return rows
};

export const createEvento = async (evento) =>{
    const {nome,data_evento,localizacao,anfitriao,senha_evento} = evento
    const [result] = await db.query("ISERT INTO eventos (nome,data_evento,localizacao,afintriao,senha_evento,ativo) VALUES (?,?,?,?,?,1) ",
     [nome, data_evento, localizacao, anfitriao, senha_evento])
     
     return result.insertId
}



