import db from "../config/db.js"

export const getAllPresentesEscolhidos = async () => {
    const [rows] = await db.query("SELECT * FROM presentes_escolhidos")
    return rows
}

export const createPresentesEscolhidos = async (presenteEscolhido, id_convidado) =>{
    const {id_presente,mensagem,forma_pagamento,data_escolha} = presenteEscolhido
    await db.query("INSERT INTO presentes_escolhidos (id_convidado,id_presente,mensagem,forma_pagamento) VALUES (?,?,?,?)",
    [id_convidado,id_presente,mensagem,forma_pagamento,data_escolha]
    )
}

export const updatePresentesEscolhidos = async (id,presenteEscolhido) =>{
    const campos = [];
    const valores = [];

    if(presenteEscolhido.id_convidado){
        campos.push("id_convidado = ?")
        valores.push(presenteEscolhido.id_convidado)
    }

        if(presenteEscolhido.id_presente){
        campos.push("id_presente = ?")
        valores.push(presenteEscolhido.id_convidado)
    }

        if(presenteEscolhido.mensagem){
        campos.push("mensagem = ?")
        valores.push(presenteEscolhido.mensagem)
    }

        if(presenteEscolhido.forma_pagamento){
        campos.push("forma_pagamento = ?")
        valores.push(presenteEscolhido.forma_pagamento)
    }

        if(presenteEscolhido.data_escolha){
        campos.push("data_escolha = ?")
        valores.push(presenteEscolhido.data_escolha)
    }

    valores.push(id)

    const query = `UPDATE  presentes_escolhidos SET  ${campos.join(", ")} WHERE id = ?`
    await db.query(query, valores)
}

export const deletePresentesEscolhidos = async (id) =>{
    await db.query("DELETE FROM presentes_escolhidos WHERE id = ?", [id])
}
