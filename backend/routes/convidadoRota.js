import {Router} from "express"

import { listarConvidado, adicionarConvidado } from "../controllers/convidadoController.js"

Router.get("/", listarConvidado)
Router.post("/", adicionarConvidado)

export default Router