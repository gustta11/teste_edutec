import db from "../config/db.js";

export const getAllFormaPagamentos = async () =>{
    const [rows] = await db.query("SELECT * FROM formas_pagamento")
    return rows
}

export const createFormaPagamento = async (formaPagamento) =>{
    const {nome} = formaPagamento
    await db.query("INSERT INTO formas_pagamento (nome) VALUES (?)",[nome])
}

export const updateFormaPagamento = async (id, formaPagamento) =>{
    const {nome} = formaPagamento
    await db.query("UPDATE formas_pagamento SET nome = ? WHERE id = ?", [id,nome])
}

export const deleteFormaPagamento = async (id) =>{
    await db.query("DELETE FROM formas_pagamento WHERE id = ?", [id])
}