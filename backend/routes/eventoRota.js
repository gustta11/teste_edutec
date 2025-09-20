import {Router} from "express"

import { listarEventos, adicionarEvento, mudarDadosEvento, deletaEvento } from "../controllers/eventoController.js"

const router = Router()


router.get("/", listarEventos)
router.post("/", adicionarEvento)
router.put("/", mudarDadosEvento)
router.delete("/", deletaEvento)

export default router