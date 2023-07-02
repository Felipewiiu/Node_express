import express from "express";
import livros from './livrosRoutes.js'
import autores from './autoresRoutes.js'

const routes = (app) => {// o parâmetro app está recebendo o express() do arquivo app.js
    app.route('/').get((req, res) =>{
        res.status(200).send({titulo: "curso de node"})
    })

    app.use(
        express.json(),
        livros,
        autores
    )
}

export default routes


