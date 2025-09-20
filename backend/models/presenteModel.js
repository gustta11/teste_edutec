import db from "../config/db.js"

export const getAllPresentes = async () => {
    const [rows] = await db.query("SELECT * FROM presentes WHERE ativo = 1")
    return rows
}

export const createPresente = async (presente) =>{
    const {nome,preco,limite_maximo,imagem,data_criacao,id_evento,id_categoria,id_pagamento} = presente
    await db.query("INSERT INTO presentes (nome,preco,limite_maximo,imagem,ativo,data_criacao,id_evento,id_categoria,id_pagamento) VALUES (?,?,?,?,1,?,?,?,?)"
    [nome,preco,limite_maximo,imagem,data_criacao,id_evento,id_categoria,id_pagamento]
    )
  
}
