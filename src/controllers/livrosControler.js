import livros from '../models/Livro.js';

class LivroController {
    static listarLivros = (req, res) => {
            livros.find((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static cadastrarLivro = (req, res) =>{
        let livro = new livros(req.body)

        // comando que perciste o dado
        livro.save((err) =>{
            if(err){
                res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`})
            }else{
                res.status(201).send(livro.toJSON())// toJSON -- comando que converte para json
            }
        })
    }

    static atualizarLivro = (req, res) =>{
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err){
                res.status(200).send({message: "O livro foi atualizado com sucesso"})
            }else{
                res.status(500).send({message: err.message})
            }
        })
    }

    static listarLivrosPorId = (req, res)=>{
        const id = req.params.id;

        livros.findById(id, (err, livro) =>{
            if(err){
                res.status(400).send({message: `${err.message} id do livro não localizado`})
            }else{
                res.status(200).json(livro)
            }
        })
    }

    static excluirLivros = (req, res) =>{
        let id = req.params.id;
        livros.findByIdAndDelete(id, (err) =>{
            if(!err){
                res.status(200).send({mensage: "Livro deletado com sucesso"})
            }else{
                res.status(500).send({mensage: `${err.mensage} Ocorreu um problema ao deletar o livro`})
            }
        })
    }
}


export default LivroController;