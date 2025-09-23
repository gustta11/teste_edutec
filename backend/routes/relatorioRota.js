import { Router } from "express";

import { convidadosComPresentesSelecionados, categoriasMaisEscolhida, presentesNaoEscolhido, TotalPresentesEscolhido } from "../controllers/relatorioController.js";

const router = Router()

router.get("/presenteSelecionados", convidadosComPresentesSelecionados)
router.get("/categoriasMaisEscolhida", categoriasMaisEscolhida)
router.get("/presentesNaoEscolhido", presentesNaoEscolhido)
router.get("/totalPresente", TotalPresentesEscolhido)

export default router