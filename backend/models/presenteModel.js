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

export const updatePresente = async (id,presente) =>{
    const campos = [];
    const valores = [];

    if(presente.nome){
        campos.push("nome = ?")
        valores.push(presente.nome)
    }

     if(presente.preco){
        campos.push("preco = ?")
        valores.push(presente.preco)
    }

     if(presente.limite_maximo){
        campos.push("limite_maximo = ?")
        valores.push(presente.limite_maximo)
    }

     if(presente.imagem){
        campos.push("imagem = ?")
        valores.push(presente.imagem)
    }

     if(presente.data_criacao){
        campos.push("data_criacao = ?")
        valores.push(presente.data_criacao)
    }

      if(presente.id_evento){
        campos.push("id_evento = ?")
        valores.push(presente.id_evento)
    }

      if(presente.id_categoria){
        campos.push("id_categoria = ?")
        valores.push(presente.id_categoria)
    }

      if(presente.id_pagamento){
        campos.push("id_pagamento = ?")
        valores.push(presente.id_pagamento)
      }

    valores.push(id)

    const query = `UPDATE  eventos SET  ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deletePresente = async (id) =>{
    await db.query("DELETE * FROM presentes WHERE id = ?", [id])
}
