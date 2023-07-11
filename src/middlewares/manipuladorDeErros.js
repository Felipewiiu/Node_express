import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {

  console.log(erro);

  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({ mensage: "Um ou mais dados fornecidos estão incorretos" });

  } else if (erro instanceof mongoose.Error.ValidationError) {// para erro de validação
    const mensagemErros = Object.values(erro.errors)// isso devolve um array de erros de validação
      .map(erro => erro.message)
      .join("; ");
    console.log(Object.values);
    res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagemErros}` });

  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;