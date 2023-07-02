import express from "express";
import db from './config/dbConect.js'
import routes from "./routes/index.js";



db.on("error", console.log.bind(console, 'Erro de conexão')); // aiso de erro de conexão
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso!')
})

const app = express();

app.use(express.json()) // isso transforma o que é recebido em json

routes(app)

export default app