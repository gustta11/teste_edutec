import { listarUsuarioAdmin,adicionarUsuarioAdmin,mudarDadosUsuarioAdmin,deletaUsuarioAdmin } from "../controllers/usuarioAdminController.js";

import { Router } from "express";

const router = Router()

router.get("/", listarUsuarioAdmin)
router.post("/", adicionarUsuarioAdmin)
router.put("/",mudarDadosUsuarioAdmin)
router.delete("/", deletaUsuarioAdmin)

export default router