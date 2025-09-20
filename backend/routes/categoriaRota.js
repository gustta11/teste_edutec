import {Router} from "Exress"
import { listarCategoria, adicionarCategoria, deleteCategoria, updateCategoria  } from "../controllers/categoriaController.js"

Router.get("/", listarCategoria)
Router.post("/", adicionarCategoria)
Router.put("/", deleteCategoria)
Router.delete("/", updateCategoria)

export default Router