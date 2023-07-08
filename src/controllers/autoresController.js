
import autores from "../models/Autor.js";

class AutoresController {
  static listarAutor = async (req, res, next) =>{
    try{
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    
    }catch (erro){
      next(erro);
    }
    
  };

  static listarAutorPorId = async (req, res, next) =>{
    
    try{
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if(autorResultado !== null){
        res.status(200).send(autorResultado);

      } else {
        res.status(404).send({mensage: "id do autor não localizado"});
      }
      
    }catch (err){
      next(err);

    }

       
  };

  static cadastraAutor = async (req, res, next) =>{
    let autor = new autores(req.body);

    try{
      const autorCadastrado = await autor.save();
      res.status(201).send(autorCadastrado.toJSON());

    }catch (err){
      next(err);
    }

  };

  static atualizarAutorPorID = async (req, res, next) =>{
    
    try{
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({mensage: "O autor foi atualizado com sucesso"});

    }catch(err){
      next(err);
    }

  };

  static excluirAutorPorId = async (req, res, next) =>{
    
    try{

      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({mensage: "Autor deletado com sucesso"});

    }catch(err){

      next(err);
      
    }

  };
}

export default AutoresController;