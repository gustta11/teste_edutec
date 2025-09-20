import {Router} from "express"
import { listarPresentes, adicionarPresente } from "../controllers/presenteController.js"

const router = Router()

router.get("/", listarPresentes)
router.post("/", adicionarPresente)

export default router