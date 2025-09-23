import { getConvidadosComPresentesSelecionados, getCategoriaMaisEscolhida, getPresentesNaoEscolhidos, getTotalPresentesEscolhido } from "../models/relatorioModel.js";

export const convidadosComPresentesSelecionados = async (req,res) => {
    try{
         const convidados = await getConvidadosComPresentesSelecionados()
         res.json(convidados)
    } catch (err){
        res.status(500).json({erro: "Erro ao listar convidados com presentes selecionados"})
    }
}

export const categoriasMaisEscolhida = async (req, res) =>{
    try{
        const categorias = await getCategoriaMaisEscolhida()
        res.json(categorias)
    } catch (err){
        console.log(err)
        res.status(500).json({erro: "Erro ao listar categorias maais escolhidas"})
    }
}

export const TotalPresentesEscolhido = async (req, res) =>{
    try{
        const presentes = await getTotalPresentesEscolhido()
        res.json(presentes)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar presentes escolhidos"})
    }
}

export const presentesNaoEscolhido = async (req, res) => {
    try{
        const presentes = await getPresentesNaoEscolhidos()
        res.json(presentes)
    } catch (err) {
        res.status(500).json({erro: "Erro ao listar presentes não escolhidos"})
    }
}