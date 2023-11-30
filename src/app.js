import express from "express";
import db from "./config/dbConect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
var cors = require('cors')

db.on("error", console.log.bind(console, "Erro de conexão")); // aiso de erro de conexão
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso!");
});

const app = express();

app.use(express.json()); // isso transforma o que é recebido em json
app.use(cors())

// eslint-disable-next-line no-unused-vars
app.get("/livros", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /livros");
  next();
});

app.get("/autores", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /autores");
  next();
});

routes(app);

app.use(manipulador404);

// aqui fica a construção do Middlewares do Express

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;
