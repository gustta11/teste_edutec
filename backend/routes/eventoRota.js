import {Router} from "express"

import { listarEventos, adicionarEvento } from "../controllers/eventoController.js"

const router = Router()


router.get("/", listarEventos)
router.post("/", adicionarEvento)

export default router