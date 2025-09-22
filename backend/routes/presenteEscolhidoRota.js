import {Router} from "express"

import { listarPresentesEscolhidos, mudarDadosPresenteEscolhido, adicionarPresenteEscolhido, deletaPresenteEscolhido } from "../controllers/presenteEscolhidoController.js"
import { autenticarTokenConvidado } from "../middleware/autenticarTokenConvidado.js"

const router = Router()

router.get("/", listarPresentesEscolhidos)
router.post("/", autenticarTokenConvidado, adicionarPresenteEscolhido)
router.put("/:id", mudarDadosPresenteEscolhido)
router.delete("/:id", deletaPresenteEscolhido)

export default router