import {Router} from "Exress"
import { listarCategoria, adicionarCategoria } from "../controllers/categoriaController.js"

Router.get("/", listarCategoria)
Router.post("/", adicionarCategoria)

export default Router