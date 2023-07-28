import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {

  constructor(erro) {

    const mensagemErros = Object.values(erro.errors)// isso devolve um array de erros de validação
      .map(erro => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagemErros}`);

  }

}

export default ErroValidacao;