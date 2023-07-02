import express from "express";
import db from './config/dbConect.js'
import livros from './models/Livro.js'



db.on("error", console.log.bind(console, 'Erro de conexão')); // aiso de erro de conexão
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso!')
})

const app = express();

app.use(express.json()) // isso transforma o que é recebido em json



app.get('/', (req, res) => {
    res.status(200).send('Curso de node')
})

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros)
    })

})

app.get('/livros/:id', (req, res) => {// parâmetos dinâmicos /:id
    let index = buscaLivro(req.params.id);
    res.json(livros[index]);
})

app.post('/livros', (req, res) => {
    livros.push(req.body); // Isso é o que vem no corpo da requisição
    res.status(201).send('O livro foi cadastrado com sucesso!')
})

app.put('/livros/:id', (req, res) => {
    let { id } = req.params.id
    let index = buscaLivro(id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

app.delete('/livros/:id', (req, res) => {
    let { id } = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1)// comando para apagar o livro de qualquer posição
    res.send(`Livro ${id} Excluído com sucesso`)
})

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id)
}

export default app