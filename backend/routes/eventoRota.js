import {Router} from "express"

import { listarEventos, adicionarEvento, mudarDadosEvento, deletaEvento, getEventosDoAdmin } from "../controllers/eventoController.js"
import { autenticarToken } from "../middleware/autenticarToken.js"

const router = Router()


router.get("/", listarEventos)
router.get("/admin", autenticarToken, getEventosDoAdmin )
router.post("/", autenticarToken, adicionarEvento)
router.put("/:id", mudarDadosEvento)
router.delete("/:id", deletaEvento)

export default router