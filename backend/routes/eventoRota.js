import {Router} from "express"

import { listarEventos, adicionarEvento, mudarDadosEvento, deletaEvento } from "../controllers/eventoController.js"

const router = Router()


router.get("/", listarEventos)
router.post("/", adicionarEvento)
router.put("/:id", mudarDadosEvento)
router.delete("/:id", deletaEvento)

export default router