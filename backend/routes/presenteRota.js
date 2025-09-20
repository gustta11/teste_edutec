import {Router} from "express"
import { listarPresentes, adicionarPresente } from "../controllers/presenteController.js"

Router.get("/", listarPresentes)
Router.post("/", adicionarPresente)

export default Router