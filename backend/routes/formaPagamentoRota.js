import {Router} from "express"
import { listarFormaPagamento, adicionarFormaPagamento } from "../controllers/formaPagamentoController.js"

const router = Router()

router.get("/", listarFormaPagamento)
router.post("/", adicionarFormaPagamento)

export default router