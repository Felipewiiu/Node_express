
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

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
        next(new NaoEncontrado("id do autor não localizado"));
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

      const autorresultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorresultado !== null) {
        res.status(200).send({mensage: "O autor foi atualizado com sucesso"});

      }else{
        next(new NaoEncontrado("ID do autor não encontrado"));
      }

    }catch(err){
      next(err);
    }

  };

  static excluirAutorPorId = async (req, res, next) =>{
    
    try{

      const id = req.params.id;
      const altorResultado = await autores.findByIdAndDelete(id);

      if (altorResultado !== null) {
        res.status(200).send({mensage: "Autor deletado com sucesso"});

      }else{
        next(new NaoEncontrado("ID do autor não localizado"));
      }

    }catch(err){

      next(err);
      
    }

  };
}

export default AutoresController;