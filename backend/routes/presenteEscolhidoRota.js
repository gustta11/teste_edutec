import {Router} from "express"

import { listarPresentesEscolhidos, mudarDadosPresenteEscolhido, adicionarPresenteEscolhido, deletaPresenteEscolhido } from "../controllers/presenteEscolhidoController"

const router = Router()

router.get("/", listarPresentesEscolhidos)
router.post("/", mudarDadosPresenteEscolhido)
router.put("/:id", adicionarPresenteEscolhido)
router.delete("/:id", deletaPresenteEscolhido)

export default router