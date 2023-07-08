import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;


app.listen(port, () =>{
  console.log(`Servidor escutando na porta em http://localhost:${port}`);
});

// o server só fica com a responsabilidade de iniciar o servidor e escutar as rotas