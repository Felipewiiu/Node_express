# Node_express

## Recursos utilizados

+ NodeMon -- Comando de instalação `npm i nodemon@2.0.15 -D` (o -D indica que é uma dependência de desenvolvimento)

+ Express -- Comando de instalação `npm i express@4.17.3`

+ mongoose -- Comando de instalação `npm install mongoose@6.2.6`

+ Dotenv --  Comando de instalação `npm i dotenv@16.0.3`

+ EsLint -- Comando de instalação `npm init @eslint/config`/ uso -- `npx eslint ./src --fix`



## Links de documentações

+ Mongoose - `https://mongoosejs.com/docs/guides.html`

+ Erros Mongoose - `https://mongoosejs.com/docs/api/error.html`


## Comando para subir o servidor

+ npm rum dev

## Importação e exportação de módulo

+ Para poder usar o recurso de importação e exportação de modulos em javascript é preciso adicionar ` "type": "module" ,` no package.json 

## Passo a passo para a conexão com mongodb

1- Importe o mongoose no arquivo criado dbConection

2- Use o a função `mongoose.connect()` pasando a string de conexão

## Padrão de projeto MVC

## Associando dados entre Schemas

Para fazer a associação de dados estre Schemas basta no tipo ser referenciado como ` mongoose.Schema.Types.ObjectId`. exemplo:

```
 {
        id: { type: String },
        titulo: { type: String, required: true },
      `  autor: { type: mongoose.Schema.Types.ObjectId,ref : 'autores', required: true },`
        editora: { type: String, required: true },
        numeroPaginas: { type: Number }
    }
-------------------------------------------------------------------------------------------
     static listarLivros = (req, res) => {
            livros.find()
            .populate('autor')
            .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }
```

## Query params

Os query params, ou parâmetros de consulta, são um conjunto definido de parâmetros anexados ao final de uma URL. Os query params são aquelas extensões da URL que ficam após o '?' e ajudam a definir um conteúdo ou ações com base nos dados passados.

Para adicionar vários parâmetros, um '&' é adicionado entre cada um. Eles podem ser criados por qualquer variação de tipos ou comprimentos de objetos, como String, Arrays e Numbers. Segue um exemplo:

Vamos supor que você construa uma requisição com req.query da seguinte maneira

```
app.get('/users', (req, res) => {
     const nomeDoUsuario = req.query.nome;
     res.json({ nome: `${nomeDoUsuario} `});
});

```

## Tratamento de erro 

O mongoose possui formas de se acessar parâmetros de erros como o ` erro instanceof mongoose.CastError`, dando um console.log nesse "erro" conseguimos acessar um arrey que contém um conjunto erros que podem ser utilizados e personalisados em mensagens. 

Exemplo de utilização:

```
 else if (erro instanceof mongoose.Error.ValidationError) {// para erro de validação
    const mensagemErros = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
    console.log(Object.values);
    res.status(400).send({ message: `Os seguintes erros foram encontrados ${mensagemErros}` });

  }
```


## Middlewares do Express

Middleware é um componente intermediário que processa as requisições entre o cliente e o servidor. Ele desempenha um papel importante na manipulação das solicitações e respostas da API, permitindo que várias funcionalidades sejam adicionadas de forma modular e flexível.

O middleware atua como uma camada de software entre as partes envolvidas na comunicação da API, como o cliente que faz a requisição e o servidor que processa essa requisição. Ele pode ser responsável por uma variedade de tarefas, como autenticação, autorização, manipulação de erros, registro de logs, compressão de dados, transformação de dados, entre outras.

## Validadores nativos do mongoose

Para se definir um limite mínimo ou máximo de valores, no modelo de dados `livrosSchema` dá para se usar um recurso min e max como no exemplo:

```
  numeroPaginas: {
      type: Number,
      min: 10,
      max: 5000
    }
```


## Validação global, como implementar?

Para isso é preciso criar um arquivo chamado `index.js` na parta de `models` e importar os arquivos de `Autor.js` e
`Livro.js` para dentro do arquivo index e no final exporta-lo, para poder ser utilizado na pasta de controllers.

Depois é preciso criar um arquivo chamado `validadorGlobal`, por exemplo, dentro da pasta de models e lá importar o Mongoose
para poder definir uma propriedade para todos os campos de strings dos modelos como no exemplo abaixo:

```
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});
```

 -- O nome da propriedade que vai como parâmetro no método set é `validate`
 -- O segundo parâmetro vai ser o valor da propriedade que vai ser um objeto com a propriedade `validator` com seu valor
    recebendo uma arrow function com a condição da validação.


## Criando busca dinâmica 

Busca dinâmica aceita encontrar um ou mais valores utilizando as querys. A baixo segue um exemplo de sua estrutura.

```
static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const {editora, titulo} = req.query;

      const busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = titulo;

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
```
 -- A variável busca recebe um objeto vazio que posteriormente vai ser populado com os parâmetros que vierem da requisição
    quando passarem pela verificação de exixtência dos `ifs`, desta maneira pode se passar o valor editora ou título como
    parâmetro de busca nas requisições `GET`

## Criando uma regex case sensitive

Para criar uma busca genérica, vamos utilizar a fução construtora do javascript `RegExp` recebendo como argumento 
o titulo e a letra `i`, que tem a função de ser case sensitive.

```
 try {
      const {editora, titulo} = req.query;

      const regex = new RegExp(titulo, "i");

      const busca = {};

      if (editora) busca.editora = editora;
      if (titulo) busca.titulo = regex;

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    }
```


## Operadores de busca do mongo DB

Existem vários tipos de operedores no mongo DB, podemos destacar:

- $gte --> Corresponde a valores maiores ou iguais a um valor especificado.

- $lte --> Corresponde a valores menores ou iguais a um valor especificado.

- $eq  --> Corresponde a valores iguais a um valor especificado.

## Trabalhando com paginação

- `skip()` -->  O skip é um método que permite pular um número específico de documentos ao realizar uma consulta no banco de dados.Quando você executa uma consulta usando o método skip(), você pode pular um determinado número de documentos (especificado como argumento para o método) e começar a recuperar os documentos a partir do próximo documento na sequência.

- `limit()` --> O método limit() é usado para limitar o número de documentos que serão retornados em uma consulta ao banco de dados MongoDB. É frequentemente utilizado em conjunto com o método find() para controlar a quantidade de resultados que você deseja recuperar.

## Ordenação de resultados.

No Mongoose, o método sort() é utilizado para ordenar os resultados de uma consulta ao banco de dados MongoDB. Ele permite que você especifique a ordem na qual os documentos devem ser retornados com base em um ou mais campos. O método sort() é análogo à cláusula ORDER BY em SQL e é frequentemente usado em conjunto com o método find() para personalizar a ordenação dos resultados.

O mongoDb aceita os valores (-1 ou 1) para ordenar de forma crescente ou decrescente seus resultados de acordo com os seus campos.

Exemplo:

```
.sort({_id: -1})
```















