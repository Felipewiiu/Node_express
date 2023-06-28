import express from "express";

const app = express();

app.use(express.json()) // isso transforma o que é recebido em json

const livros = [
    {
        id: 1,
        "titulo": "Senhor dos anéis"
    },
    {
        id: 2,
        "titulo": "A casa de papel"
    }
]

app.get('/', (req, res) =>{
    res.status(200).send('Curso de node')
})

app.get('/livros', (req, res) =>{
    res.status(200).json(livros)
})

app.post('/livros', (req, res) =>{
    livros.push(req.body); // Isso é o que vem no corpo da requisição
    res.status(201).send('O livro foi cadastrado com sucesso!')
})

export default app