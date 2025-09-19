import {Router} from "express"

import { listarEventos, adicionarEvento } from "../controllers/eventoController"

Router.get("/", listarEventos)
Router.post("/", adicionarEvento)

export default Router