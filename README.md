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

## Middlewares do Express

Middleware é um componente intermediário que processa as requisições entre o cliente e o servidor. Ele desempenha um papel importante na manipulação das solicitações e respostas da API, permitindo que várias funcionalidades sejam adicionadas de forma modular e flexível.

O middleware atua como uma camada de software entre as partes envolvidas na comunicação da API, como o cliente que faz a requisição e o servidor que processa essa requisição. Ele pode ser responsável por uma variedade de tarefas, como autenticação, autorização, manipulação de erros, registro de logs, compressão de dados, transformação de dados, entre outras.







