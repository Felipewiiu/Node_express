import livros from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {

      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livrosResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livrosResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});

      }else{
        next(new NaoEncontrado("ID do livro não localizadoo"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null){
        res.status(200).send(livroResultados);

      }else{
        next(new NaoEncontrado("Livro não localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivros = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      }else{
        next(new NaoEncontrado("O livro que você deseja deletar não existe"));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({"editora": editora});

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
}


export default LivroController;