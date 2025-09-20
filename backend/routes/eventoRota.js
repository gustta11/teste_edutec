import {Router} from "express"

import { listarEventos, adicionarEvento } from "../controllers/eventoController.js"

Router.get("/", listarEventos)
Router.post("/", adicionarEvento)

export default Router