import { listarUsuarioAdmin,adicionarUsuarioAdmin,mudarDadosUsuarioAdmin,deletaUsuarioAdmin, loginAdmin } from "../controllers/usuarioAdminController.js";

import { Router } from "express";

const router = Router()

router.get("/", listarUsuarioAdmin)
router.post("/", adicionarUsuarioAdmin)
router.post("/login", loginAdmin)
router.put("/",mudarDadosUsuarioAdmin)
router.delete("/", deletaUsuarioAdmin)

export default router