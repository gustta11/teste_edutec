import {Router} from "express"
import { listarCategoria, adicionarCategoria, mudarCategoria, deletaCategoria  } from "../controllers/categoriaController.js"

const router = Router()

router.get("/", listarCategoria)
router.post("/", adicionarCategoria)
router.put("/:id", mudarCategoria)
router.delete("/:id", deletaCategoria)

export default router