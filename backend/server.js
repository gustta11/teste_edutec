import express from 'express';
import cors from 'cors';

import categoriaRoutes from "./routes/categoriaRota.js";
import eventoRoutes from "./routes/eventoRota.js";
import convidadoRoutes from "./routes/convidadoRota.js";
import presenteRoutes from "./routes/presenteRota.js";
import usuarioAdminRoutes from "./routes/usuarioAdminRota.js";
import pagamentoRoutes from "./routes/formaPagamentoRota.js"
import presenteEscolhidoRoutes from "./routes/presenteEscolhidoRota.js"
import relatorio from "./routes/relatorioRota.js"

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors())

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/categoria", categoriaRoutes)
app.use("/evento", eventoRoutes)
app.use("/convidado", convidadoRoutes)
app.use("/presente", presenteRoutes)
app.use("/formaPagamento", pagamentoRoutes)
app.use("/usuarioAdmin", usuarioAdminRoutes)
app.use("/presenteEscolhido", presenteEscolhidoRoutes)
app.use("/relatorios",relatorio)
app.use('/uploads', express.static('uploads'))



app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})