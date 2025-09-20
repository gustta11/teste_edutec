import {Router} from "express"
import { listarFormaPagamento, adicionarFormaPagamento, mudarDadosFormaPagamento, deletaFormaPagamento } from "../controllers/formaPagamentoController.js"

const router = Router()

router.get("/", listarFormaPagamento)
router.post("/", adicionarFormaPagamento)
router.put("/:id", mudarDadosFormaPagamento)
router.delete("/:id", deletaFormaPagamento)

export default router