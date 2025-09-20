import db from "../config/db.js";

export const getAllConvidados = async () => {
    const [rows] = await db.query("SELECT * FROM convidados WHERE ativo = 1")
    return rows
};

export const createConvidado = async (convidado) =>{
    const {cpf,nome,telefone,email,id_evento} = convidado
    await db.query("ISERT INTO eventos (cpf,nome,telefone,email,id_evento) VALUES (?,?,?,?,?) ",
    [cpf,nome,telefone,email,id_evento]) 
}
