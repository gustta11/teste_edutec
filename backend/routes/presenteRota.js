import {Router} from "express"
import { listarPresentes, adicionarPresente, mudarDadosPresente, deletaPresente } from "../controllers/presenteController.js"
import  upload  from "../config/uploadConfig.js"
import { autenticarToken } from "../middleware/autenticarToken.js"

const router = Router()

router.get("/", listarPresentes)
router.post("/", autenticarToken, upload.single('imagem'), adicionarPresente)
router.put("/:id", mudarDadosPresente)
router.delete("/:id", deletaPresente)

export default router