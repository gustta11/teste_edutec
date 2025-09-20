import {Router} from "express"
import { listarPresentes, adicionarPresente, mudarDadosPresente, deletaPresente } from "../controllers/presenteController.js"

const router = Router()

router.get("/", listarPresentes)
router.post("/", adicionarPresente)
router.put("/:id", mudarDadosPresente)
router.delete("/:id", deletaPresente)

export default router