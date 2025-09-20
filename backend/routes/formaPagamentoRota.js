import {Router} from "express"
import { listarFormaPagamento, adicionarFormaPagamento } from "../controllers/formaPagamentoController.js"

Router.get("/", listarFormaPagamento)
Router.post("/", adicionarFormaPagamento)

export default Router