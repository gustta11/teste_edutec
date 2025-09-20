import {Router} from "express"

import { listarConvidado, adicionarConvidado, mudarDadosConvidado, deletaConvidado } from "../controllers/convidadoController.js"

const router = Router()

router.get("/", listarConvidado)
router.post("/", adicionarConvidado)
router.put("/:id", mudarDadosConvidado)
router.delete("/:id", deletaConvidado)

export default router