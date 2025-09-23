import db from "../config/db.js"

export const getConvidadosComPresentesSelecionados = async () =>{
    const rows = await db.query(` SELECT DISTINCT c.nome FROM convidados c 
        INNER JOIN presentes_escolhidos p
        ON c.id = p.id_convidado
        `)
    
    return rows
}

export const getListaDePresentesEscolhidos = async () =>{
    const rows = await db.query(`SELECT co.nome AS 'Nome', pr.nome AS 'Presente', pe.forma_pagamento AS 'Forma de pagamento' FROM presentes_escolhidos pe
    INNER JOIN convidados co ON co.id = pe.id_convidado
    INNER JOIN presentes pr ON pr.id = pe.id_presente`)

    return rows
}

export const getTotalPresentesEscolhido = async () =>{
    const rows = await db.query( ` SELECT COUNT(*) as Total FROM presentes_escolhidos`)
    return rows
}

export const getCategoriaMaisEscolhida = async () =>{
    const rows = await db.query(` SELECT ca.nome AS 'Nome da Categoria', COUNT(*) AS Quantidade FROM categorias ca
        INNER JOIN presentes pr 
        ON ca.id = pr.id_categoria
        GROUP BY ca.nome `)
    
    return rows
}

export const getPresentesNaoEscolhidos = async () =>{
    const rows = await db.query(`SELECT DISTINCT pr.nome AS 'Nome do Produto' FROM presentes pr
        LEFT JOIN presentes_escolhidos pe
        ON pr.id = pe.id_presente
        WHERE pe.id_presente IS NULL
        `)
    
    return rows
}