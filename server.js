const http = require("http");
const port = 3000;

const rotas = {
    '/': 'Curso de node',
    '/livros': 'Entrei na página de livros',
    '/autores': 'Listagem de autores'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end(rotas[req.url])// precisa finalizar a resposta
})

server.listen(port, () =>{
    console.log(`Servidor escutando na porta em http://localhost:${port}`)
})