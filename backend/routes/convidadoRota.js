import {Router} from "express"

import { listarConvidado,mudarDadosConvidado, deletaConvidado, completarCadastro, loginConvidado } from "../controllers/convidadoController.js"

const router = Router()

router.get("/", listarConvidado)
router.post("/login",loginConvidado )
router.put("/completar/:id", completarCadastro)
router.put("/:id",mudarDadosConvidado)
router.delete("/:id", deletaConvidado)

export default router