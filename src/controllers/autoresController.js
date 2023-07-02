import autores from "../models/Autor.js";

class AutoresController {
    static listarAutor = (req, res) =>{
        autores.find((err, autor) =>{
            res.status(200).json(autor)
        })
    }

    static listarAutorPorId = (req, res) =>{
        const id = req.params.id;

        autores.findById(id, (err, autor) =>{
            if(!err){
                res.status(200).json(autor)
            }else{
                res.status(500).send({mensage: `${err.mensage} id do autor não localizado`})
            }
        })
    }

    static cadastraAutor = (req, res) =>{
        let autor = new autores(req.body)

        autor.save((err) =>{
            if(err){
                res.status(500).send({mensage: `${err.mensage} Falaha ao cadastrar o autor`})
            }else{
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizarAutorPorID = (req, res) =>{
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err){
                res.status(200).send({mensage: "O autor foi atualizado com sucesso"})
            }else{
                res.status(500).send({mensage: err.mensage})
            }
        })
    }

    static excluirAutorPorId = (req, res) =>{
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) =>{
            if(!err){
                res.status(200).send({mensage: "Autor deletado com sucesso"})
            }else{
                res.status(500).send({mensage: `${err.mensage} Ocorreu um problema ao deletar o autor`})
            }
        })
    }
}

export default AutoresController;