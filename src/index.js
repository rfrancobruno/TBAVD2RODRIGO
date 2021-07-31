//Teste de publicação GitHub
//Teste commit GitHub 20210730 11:15 PM
/* 
  Trabalho AVD2 08/06/2021 -  Rodrigo Franco Bruno 20201417
  
   1- yarn init -y        -> Criação do package.json
   2- yarn add express    -> Instalação node_modulos, yarn.lock (cooks) 
   3- yarn add nodemon -D -> Licença de desenvolvedor
   4- yarn add uuid       -> Gerador de identificação única automatica
   5- Criar pasta "src" e "arquivo index.js"
   6- Criar script em package.json abaixo de "licence": "MIT" -> "scripts": {"dev": "nodemon src/index.js"}
   7- Criar código de inicialização do servidor em index.js
      - const { request, response } = require("express")
      - const express = require("express") 
      - const app = express() 
      - app.use(express.json())
      - const uuid = require("uuid")
      - CÓDIGO DO PROJETO -> get, post, put, delete, middleware.
      - app.listen(3333, () => { console.log (" Servidor trabalho AVD2 Rodrigo rodando! ") })
*/

const { request, response } = require("express")
const express = require("express") // Carrega o express e o armazena na variável express
const app = express() // Executa a função do express e o armazena na variável app
app.use(express.json()) // Método embutido no express para reconhecer o objeto de solicitação recebido como um objeto JSON
const uuid = require("uuid") // Cria uma identificação única para cada objeto no array

// Array para cadastro de funcionarios
let funcionarios = [
    {
        id:uuid.v4(),
        Nome:"Rodrigo Franco",
        Funcao:"Dev",
        Departamento:"Projetos",
        E_mail: "rodrigo.dev.com",
        Telefone:"+5524999999999"
    }
]

// Verifica a existencia de um id de funcionario.
const verificaExistenciaId = (request, response, next) => {
    const { id } = request.params
    const idFunc = funcionarios.filter(funcionario => funcionario.id === id)
    if (idFunc.length === 0 ) {
        return response
        .status(400)
        .json({error: " ID de funcionário inexistente! "})  
    }
    return next()
}

// Verifica se todos os dados do funcionario foram preenchidos.
const verificaDadosFuncionario = (request, response, next) => {
    const {Nome,Funcao,Departamento,E_mail,Telefone} = request.body
    if(!Nome || !Funcao || !Departamento || !E_mail || !Telefone) {
        return response
          .status(400)
          .json({error: " Por favor, preencher todos os dados do funcionario! "})
    }
    return next()
}

// Listar todos funcionários cadastrados.
// Rota - http://localhost:3333/funcionarios - GET
app.get("/funcionarios", (request, response) => {
    return response 
        .status(200)
        .json(funcionarios) 
})

// Listar funcionários cadastrados pelo id.
// Rota - http://localhost:3333/funcionarios/id - GET
app.get("/funcionarios/:id", verificaExistenciaId, (request, response) => {
    const {id,Nome,Funcao,Departamento,E_mail,Telefone} = request.params
    const idFunc = funcionarios.filter(funcionario => funcionario.id === id )
    response
        .status(200)
        .json(idFunc)
})  

// Excluir funcionários cadastrados pelo id
// Rota - http://localhost:3333/funcionarios/id - DELETE
app.delete("/funcionarios/:id", verificaExistenciaId, (request, response) => { 
    const { id } = request.params
    const indice = funcionarios.findIndex(funcionario => funcionario.id === id)
    funcionarios.splice(indice, 1)
    return response
      .status(200)
      .json({mensage: " Dados do funcionário excluido com sucesso! "})
})

// Alterar funcionários cadastrados pelo id
// Rota - http://localhost:3333/funcionarios/id - PUT
app.put("/funcionarios/:id", verificaExistenciaId, verificaDadosFuncionario, (request, response) => {
    const {Nome,Funcao,Departamento,E_mail,Telefone} = request.body
    const { id } = request.params
    const indice = funcionarios.findIndex(funcionario => funcionario.id === id)
    const funcionarioAlterado = {
        id,
        Nome,
        Funcao,
        Departamento,
        E_mail,
        Telefone
    }
    funcionarios.splice(indice, 1, funcionarioAlterado)
    return response
        .status(200)
        .json(funcionarioAlterado)
})

// Inserir Funcionarios no sistema
// Rota - http://localhost:3333/funcionarios - POST
app.post("/funcinarios", verificaDadosFuncionario, (request, response) => {
    const {Nome,Funcao,Departamento,E_mail,Telefone} = request.body
    const dadosFuncionario = {
        id: uuid.v4(),
        Nome,
        Funcao,
        Departamento,
        E_mail,
        Telefone
    }
    funcionarios = [...funcionarios, dadosFuncionario]
    return response
    .status(200)
    .json(dadosFuncionario)
})

// Comunicação com servidor na porta 3333, LocalHost
app.listen(3333, () => {
    console.log(" Servidor trabalho AVD2 Rodrigo rodando! ")
})