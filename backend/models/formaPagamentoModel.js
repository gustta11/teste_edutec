import db from "../config/db.js";

export const getAllFormaPagamentos = async () =>{
    const [rows] = await db.query("SELECT * FROM formas_pagamento")
    return rows
}

export const createFormaPagamento = async (formaPagamento) =>{
    const {nome} = formaPagamento
    await db.query("INSERT INTO formas_pagamento (nome) VALUES (?)",[nome])
}

