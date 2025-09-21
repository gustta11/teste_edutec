import express from 'express';
import cors from 'cors';

import categoriaRoutes from "./routes/categoriaRota.js";
import eventoRoutes from "./routes/eventoRota.js";
import convidadoRoutes from "./routes/convidadoRota.js";
import presenteRoutes from "./routes/presenteRota.js";
import usuarioAdminRoutes from "./routes/usuarioAdminRota.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use("/categoria", categoriaRoutes)
app.use("/evento", eventoRoutes)
app.use("/convidado", convidadoRoutes)
app.use("/presente", presenteRoutes)
app.use("/usuarioAdmin", usuarioAdminRoutes)



app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})